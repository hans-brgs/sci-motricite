import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  CircleCheck,
  CircleX,
  Copy,
  Download,
  ImagePlus,
  Lock,
  RotateCcw,
} from "lucide-react";

import winter from "@site/src/data/winter.json";
import {
  PTS,
  STICK,
  SAMPLE_H,
  SAMPLE_SRC,
  SAMPLE_W,
  computeCoM,
  polyInfo,
  samplePoints,
  segmentsDepuis,
  verdict as calculerVerdict,
} from "./modele";
import styles from "./styles.module.css";

/**
 * Atelier centre de masse — défis d'équilibre.
 *
 * L'étudiant charge une photo de profil, pointe neuf repères anatomiques et les
 * deux bords du polygone de sustentation, puis recopie les coordonnées dans son
 * tableur. La page ne calcule rien à sa place : il saisit le x qu'il a obtenu,
 * et elle trace la projection et le verdict. Le calcul complet n'apparaît qu'en
 * mode enseignant.
 *
 * Le modèle ne porte que le corps humain : un objet tenu ou porté est ignoré.
 *
 * Le panneau est un accordéon : chaque étape se replie, et l'étape suivante
 * s'ouvre d'elle-même quand la précédente est terminée. Sur téléphone, on ne
 * voit ainsi que ce qu'il y a à faire maintenant.
 *
 * Rendu côté serveur : rien ici ne touche `window`, le canevas ou WebCrypto
 * pendant le rendu. Tout passe par des effets ou des gestionnaires
 * d'événements, qui ne s'exécutent que dans le navigateur.
 */

const SEG = segmentsDepuis(winter);
const SOMME_PARTS = SEG.reduce((s, x) => s + x.m, 0);
const CORPS = PTS.filter((p) => p.group === "body");
const BORDS = PTS.filter((p) => p.group === "poly");

const fmt = (v, d = 1) =>
  Number(v).toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });

/** Lit un nombre saisi avec une virgule ou un point ; null si le champ est vide ou invalide. */
function num(s) {
  const v = parseFloat(String(s ?? "").replace(",", "."));
  return Number.isFinite(v) ? v : null;
}

async function sha256(t) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t));
  return Array.from(new Uint8Array(b))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

/* ===========================================================================
   Dessin sur la photo — fonctions pures sur un contexte 2D
   Les couleurs sont fixes : elles doivent rester lisibles sur n'importe quelle
   photo, pas sur le fond de la page.
   ======================================================================== */

const FONT_TAG = '"IBM Plex Mono", ui-monospace, monospace';
const JAUNE = "#FFD23F";
const VERT = "#2E9E6B";

function comSymbol(c, x, y, r, u) {
  c.save();
  c.lineWidth = 1.5 * u;
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2);
  c.fillStyle = "#fff";
  c.fill();
  c.fillStyle = "#111";
  c.beginPath();
  c.moveTo(x, y);
  c.arc(x, y, r, -Math.PI / 2, 0);
  c.closePath();
  c.fill();
  c.beginPath();
  c.moveTo(x, y);
  c.arc(x, y, r, Math.PI / 2, Math.PI);
  c.closePath();
  c.fill();
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2);
  c.strokeStyle = "#111";
  c.stroke();
  c.restore();
}

function tag(c, text, x, y, u, bg, fg) {
  c.save();
  c.font = `600 ${12 * u}px ${FONT_TAG}`;
  const w = c.measureText(text).width + 8 * u;
  const h = 17 * u;
  c.fillStyle = bg;
  c.beginPath();
  if (c.roundRect) c.roundRect(x, y - h / 2, w, h, 4 * u);
  else c.rect(x, y - h / 2, w, h);
  c.fill();
  c.fillStyle = fg;
  c.textBaseline = "middle";
  c.fillText(text, x + 4 * u, y + 0.5 * u);
  c.restore();
}

function drawProjection(c, u, H, x, yUp, colLight, label, top, gy, small) {
  const yPix = yUp != null ? H - yUp : null;
  c.save();
  c.setLineDash(small ? [3 * u, 4 * u] : [9 * u, 6 * u]);
  c.beginPath();
  c.moveTo(x, yPix != null ? yPix : top);
  c.lineTo(x, gy);
  c.strokeStyle = "rgba(0,0,0,.55)";
  c.lineWidth = 5 * u;
  c.stroke();
  c.strokeStyle = colLight;
  c.lineWidth = 2.5 * u;
  c.stroke();
  c.restore();
  if (yPix != null) {
    comSymbol(c, x, yPix, (small ? 8 : 11) * u, u);
    c.save();
    c.beginPath();
    c.arc(x, gy, 4 * u, 0, Math.PI * 2);
    c.fillStyle = colLight;
    c.fill();
    c.restore();
  } else comSymbol(c, x, gy, (small ? 7 : 10) * u, u);
  tag(
    c,
    label,
    x + 12 * u,
    (yPix != null ? yPix : top + 10 * u) + (small ? 20 * u : -16 * u),
    u,
    small ? "#6B45C9" : "rgba(17,17,17,.85)",
    "#fff"
  );
}

/**
 * Dessine la scène complète : photo, silhouette, polygone, projections, repères.
 * `u` est la taille d'un « pixel d'interface » dans le repère de l'image : les
 * traits gardent la même épaisseur à l'écran quelle que soit la taille de la photo.
 */
function drawScene(c, u, interactive, scene) {
  const { img, W, H, pts, active, xs, ys, teacherPt } = scene;
  const px = (id) => (pts[id] ? { x: pts[id].x, y: H - pts[id].y } : null);

  c.clearRect(0, 0, W, H);
  c.drawImage(img, 0, 0, W, H);

  c.save();
  c.lineCap = "round";
  for (const [a, b] of STICK) {
    const A = px(a);
    const B = px(b);
    if (A && B) {
      c.beginPath();
      c.moveTo(A.x, A.y);
      c.lineTo(B.x, B.y);
      c.strokeStyle = "rgba(0,0,0,.5)";
      c.lineWidth = 5 * u;
      c.stroke();
      c.strokeStyle = "rgba(255,255,255,.9)";
      c.lineWidth = 2.5 * u;
      c.stroke();
    }
  }
  c.restore();

  let top = Infinity;
  for (const p of CORPS) if (pts[p.id]) top = Math.min(top, H - pts[p.id].y);
  top = Number.isFinite(top) ? Math.max(0, top - 30) : 0;

  const poly = polyInfo(pts);
  if (poly) {
    const gy = H - poly.yUp;
    c.save();
    c.fillStyle = "rgba(46,158,107,.85)";
    c.fillRect(poly.lo, gy - 5 * u, poly.hi - poly.lo, 10 * u);
    c.strokeStyle = "rgba(46,158,107,.9)";
    c.setLineDash([6 * u, 5 * u]);
    c.lineWidth = 2 * u;
    for (const x of [poly.lo, poly.hi]) {
      c.beginPath();
      c.moveTo(x, gy);
      c.lineTo(x, gy - 70 * u);
      c.stroke();
    }
    c.restore();
    tag(c, "polygone", poly.lo, gy + 18 * u, u, "rgba(46,158,107,.95)", "#fff");

    if (xs != null) {
      const inside = xs >= poly.lo && xs <= poly.hi;
      drawProjection(c, u, H, xs, ys, inside ? "#7CF0B4" : "#FF9A86", "votre calcul", top, gy, false);
    }
    if (teacherPt) drawProjection(c, u, H, teacherPt.x, teacherPt.y, "#B79BFF", "page", top, gy, true);
  }

  for (const p of PTS) {
    const q = px(p.id);
    if (!q) continue;
    c.save();
    if (interactive && active === p.id) {
      c.beginPath();
      c.arc(q.x, q.y, 12 * u, 0, Math.PI * 2);
      c.strokeStyle = "#fff";
      c.lineWidth = 2.5 * u;
      c.stroke();
    }
    c.beginPath();
    c.arc(q.x, q.y, 6 * u, 0, Math.PI * 2);
    c.fillStyle = p.group === "poly" ? VERT : JAUNE;
    c.fill();
    c.lineWidth = 2 * u;
    c.strokeStyle = "#111";
    c.stroke();
    c.restore();
    tag(c, p.mark, q.x + 9 * u, q.y - 10 * u, u, "rgba(17,17,17,.8)", "#fff");
  }
}

/* ===========================================================================
   Une étape repliable du panneau
   ======================================================================== */

function Etape({ n, titre, statut, fait, ouvert, onBascule, children }) {
  const id = `cdm-etape-${n}`;
  return (
    <section className={`${styles.step} ${ouvert ? styles.stepOpen : ""}`}>
      <h2 className={styles.stepHead}>
        <button type="button" aria-expanded={ouvert} aria-controls={id} onClick={onBascule}>
          <span className={`${styles.badge} ${fait ? styles.badgeDone : ""}`} aria-hidden="true">
            {fait ? <Check size={14} strokeWidth={2.5} /> : n}
          </span>
          <span className={styles.stepTitle}>{titre}</span>
          {statut && <span className={styles.stepStatus}>{statut}</span>}
          <ChevronDown className={styles.chevron} size={18} aria-hidden="true" />
        </button>
      </h2>
      <div id={id} className={styles.stepBody} hidden={!ouvert}>
        {children}
      </div>
    </section>
  );
}

/* ===========================================================================
   Composant
   ======================================================================== */

export default function AtelierCentreDeMasse() {
  const { siteConfig } = useDocusaurusContext();
  const teacherHash = siteConfig.customFields?.cdmTeacherHash || null;
  const exempleSrc = useBaseUrl(SAMPLE_SRC);

  const cvRef = useRef(null);
  const loupeRef = useRef(null);
  const wrapRef = useRef(null);
  const dragging = useRef(false);
  const objectUrl = useRef(null);

  const [img, setImg] = useState(null); // { el, W, H }
  const [scale, setScale] = useState(1);
  const [pts, setPts] = useState({});
  const [active, setActive] = useState("oreille");
  const [champs, setChamps] = useState({ xs: "", ys: "", ref: "" });
  const [sep, setSep] = useState(",");
  const [exemple, setExemple] = useState(true); // repères et calcul de démonstration affichés
  const [photoPerso, setPhotoPerso] = useState(false); // l'étudiant a chargé sa propre photo
  const [erreurPhoto, setErreurPhoto] = useState(false);
  const [code, setCode] = useState("");
  const [teacher, setTeacher] = useState(false);
  const [copie, setCopie] = useState({ pts: { msg: "", area: null }, table: { msg: "", area: null } });
  const [exportUrl, setExportUrl] = useState(null);
  const [exportErr, setExportErr] = useState(false);
  // Sur l'exemple, on montre d'où l'on part (la photo) et où l'on arrive (le verdict).
  const [ouverts, setOuverts] = useState(() => new Set([1, 5]));

  const xs = num(champs.xs);
  const ys = num(champs.ys);
  const body = useMemo(() => computeCoM(pts, SEG), [pts]);
  const teacherPt = teacher && body.x != null ? { x: body.x, y: body.y } : null;
  const poly = polyInfo(pts);

  const nbCorps = CORPS.filter((p) => pts[p.id]).length;
  const nbBords = BORDS.filter((p) => pts[p.id]).length;
  const v = poly && xs != null ? calculerVerdict(poly, xs, num(champs.ref)) : null;

  const basculer = (n) =>
    setOuverts((o) => {
      const s = new Set(o);
      if (s.has(n)) s.delete(n);
      else s.add(n);
      return s;
    });

  /* Quand une étape vient d'être terminée, elle se replie et la suivante s'ouvre.
     Seule la transition compte : corriger un repère après coup ne referme rien. */
  const aVerdict = v != null;
  const avant = useRef({ nbCorps, nbBords, aVerdict });
  useEffect(() => {
    const p = avant.current;
    if (!exemple) {
      if (p.nbCorps < CORPS.length && nbCorps === CORPS.length) {
        setOuverts((o) => new Set([...o].filter((n) => n !== 2)).add(3));
      }
      if (p.nbBords < BORDS.length && nbBords === BORDS.length) {
        setOuverts((o) => new Set([...o].filter((n) => n !== 3)).add(4));
      }
      // Le verdict s'ouvre dès qu'il existe ; l'étape 4 reste ouverte, on y tape encore.
      if (!p.aVerdict && aVerdict) setOuverts((o) => new Set(o).add(5));
    }
    avant.current = { nbCorps, nbBords, aVerdict };
  }, [nbCorps, nbBords, aVerdict, exemple]);

  /* ---------- exemple intégré, au premier affichage ---------- */
  useEffect(() => {
    const im = new Image();
    im.onload = () => {
      const p = samplePoints();
      const c = computeCoM(p, SEG);
      setImg({ el: im, W: SAMPLE_W, H: SAMPLE_H });
      setPts(p);
      setActive(null);
      setChamps((f) => ({ ...f, xs: String(Math.round(c.x)), ys: String(Math.round(c.y)) }));
    };
    im.src = exempleSrc;
    return () => {
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    };
  }, []);

  /* ---------- taille du canevas : largeur disponible, 74 % de la hauteur d'écran ---------- */
  useEffect(() => {
    if (!img) return undefined;
    const mesurer = () => {
      const w = wrapRef.current?.clientWidth || 600;
      const maxH = Math.max(320, window.innerHeight * 0.74);
      setScale(Math.min(w / img.W, maxH / img.H));
    };
    mesurer();
    let timer;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(mesurer, 80);
    };
    window.addEventListener("resize", onResize);
    let ro;
    if (window.ResizeObserver && wrapRef.current) {
      let last = 0;
      ro = new ResizeObserver(() => {
        const w = wrapRef.current?.clientWidth || 0;
        if (Math.abs(w - last) > 2) {
          last = w;
          mesurer();
        }
      });
      ro.observe(wrapRef.current);
    }
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [img]);

  /* ---------- dessin ---------- */
  useEffect(() => {
    const cv = cvRef.current;
    if (!cv || !img) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const cw = Math.round(img.W * scale);
    const ch = Math.round(img.H * scale);
    cv.style.width = `${cw}px`;
    cv.style.height = `${ch}px`;
    cv.width = Math.round(cw * dpr);
    cv.height = Math.round(ch * dpr);
    const ctx = cv.getContext("2d");
    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
    drawScene(ctx, 1 / scale, true, { img: img.el, W: img.W, H: img.H, pts, active, xs, ys, teacherPt });
  }, [img, scale, pts, active, xs, ys, teacherPt?.x, teacherPt?.y]);

  /* ---------- pointage et loupe ---------- */
  function toImg(e) {
    const r = cvRef.current.getBoundingClientRect();
    const x = Math.min(img.W, Math.max(0, (e.clientX - r.left) / scale));
    const yPix = Math.min(img.H, Math.max(0, (e.clientY - r.top) / scale));
    return { x, y: img.H - yPix, cx: e.clientX - r.left, cy: e.clientY - r.top };
  }

  function showLoupe(e) {
    const loupe = loupeRef.current;
    const cv = cvRef.current;
    if (!loupe || !cv) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const q = toImg(e);
    const wr = wrapRef.current.getBoundingClientRect();
    const cr = cv.getBoundingClientRect();
    const size = 128;
    const zoom = 3;
    loupe.hidden = false;
    if (loupe.width !== size * dpr) {
      loupe.width = size * dpr;
      loupe.height = size * dpr;
    }
    let left = cr.left - wr.left + q.cx - size / 2;
    let top = cr.top - wr.top + q.cy - size - 44;
    if (top < 4) top = cr.top - wr.top + q.cy + 44;
    left = Math.max(4, Math.min(wr.width - size - 4, left));
    loupe.style.left = `${left}px`;
    loupe.style.top = `${top}px`;
    const lctx = loupe.getContext("2d");
    const src = size / zoom;
    lctx.setTransform(1, 0, 0, 1, 0, 0);
    lctx.fillStyle = "#000";
    lctx.fillRect(0, 0, loupe.width, loupe.height);
    lctx.drawImage(cv, (q.cx - src / 2) * dpr, (q.cy - src / 2) * dpr, src * dpr, src * dpr, 0, 0, loupe.width, loupe.height);
    const m = loupe.width / 2;
    const k = dpr;
    lctx.strokeStyle = "#FF3B30";
    lctx.lineWidth = 1.5 * k;
    lctx.beginPath();
    lctx.moveTo(m, m - 18 * k);
    lctx.lineTo(m, m - 4 * k);
    lctx.moveTo(m, m + 4 * k);
    lctx.lineTo(m, m + 18 * k);
    lctx.moveTo(m - 18 * k, m);
    lctx.lineTo(m - 4 * k, m);
    lctx.moveTo(m + 4 * k, m);
    lctx.lineTo(m + 18 * k, m);
    lctx.stroke();
  }

  function hideLoupe() {
    if (loupeRef.current) loupeRef.current.hidden = true;
  }

  function onPointerDown(e) {
    if (!img || !active) return;
    e.preventDefault();
    try {
      cvRef.current.setPointerCapture(e.pointerId);
    } catch {
      // certains navigateurs refusent la capture : le pointage reste possible
    }
    dragging.current = true;
    showLoupe(e);
  }

  function onPointerMove(e) {
    if (dragging.current) showLoupe(e);
  }

  function onPointerUp(e) {
    if (!dragging.current) return;
    dragging.current = false;
    hideLoupe();
    const q = toImg(e);
    placer(q.x, q.y);
  }

  function onPointerCancel() {
    dragging.current = false;
    hideLoupe();
  }

  /** Place le repère actif, puis passe au premier repère encore manquant. */
  function placer(x, y) {
    const next = { ...pts, [active]: { x: Math.round(x), y: Math.round(y) } };
    setPts(next);
    const i = PTS.findIndex((p) => p.id === active);
    let suivant = null;
    for (let k = 1; k <= PTS.length; k += 1) {
      const p = PTS[(i + k) % PTS.length];
      if (!next[p.id]) {
        suivant = p.id;
        break;
      }
    }
    setActive(suivant);
  }

  function choisir(id) {
    setActive(id);
    cvRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  /* ---------- photo, champs ---------- */
  function chargerPhoto(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    const im = new Image();
    im.onload = () => {
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
      objectUrl.current = url;
      setImg({ el: im, W: im.naturalWidth, H: im.naturalHeight });
      setPts({});
      setActive("oreille");
      setChamps((c) => ({ ...c, xs: "", ys: "", ref: "" }));
      setExportUrl(null);
      setExportErr(false);
      setExemple(false);
      setPhotoPerso(true);
      setErreurPhoto(false);
      setOuverts(new Set([2]));
    };
    im.onerror = () => {
      URL.revokeObjectURL(url);
      setErreurPhoto(true);
    };
    im.src = url;
    e.target.value = "";
  }

  function toutEffacer() {
    // Sur l'exemple, le x saisi est celui de la démonstration : il part avec elle.
    // Sur sa propre photo, l'étudiant garde ce qu'il a tapé.
    if (exemple) setChamps((c) => ({ ...c, xs: "", ys: "" }));
    setExemple(false);
    setPts({});
    setActive("oreille");
    setExportUrl(null);
    setOuverts(new Set([2]));
  }

  const champ = (id) => (e) => setChamps((c) => ({ ...c, [id]: e.target.value }));

  async function saisirCode(e) {
    const val = e.target.value;
    setCode(val);
    if (!teacherHash) return;
    let ok = false;
    try {
      ok = (await sha256(val.trim().toLowerCase())) === teacherHash;
    } catch {
      ok = false;
    }
    setTeacher(ok);
  }

  /* ---------- copies vers le tableur ---------- */
  function copier(cle, texte, okMsg) {
    const repli = () =>
      setCopie((c) => ({
        ...c,
        [cle]: { msg: "Copie automatique refusée : le texte est sélectionné ci-dessous, copiez-le.", area: texte },
      }));
    try {
      navigator.clipboard.writeText(texte).then(() => setCopie((c) => ({ ...c, [cle]: { msg: okMsg, area: null } })), repli);
    } catch {
      repli();
    }
  }

  const dec = (val) => (val == null ? "" : String(val).replace(".", sep));
  const pname = (id) => (id ? PTS.find((p) => p.id === id).short : "C7 (non pointé)");

  function copierPoints() {
    const lignes = ["Point\tx (px)\ty (px)"].concat(
      PTS.map((p) => {
        const q = pts[p.id];
        return `${p.label}\t${q ? q.x : ""}\t${q ? q.y : ""}`;
      })
    );
    copier("pts", lignes.join("\n"), "Coordonnées copiées : collez-les dans votre tableur.");
  }

  function copierTableau() {
    const head = ["Segment", "m_i", "f_i", "Proximal", "x_P", "y_P", "Distal", "x_D", "y_D", "x_i", "y_i", "m_i·x_i", "m_i·y_i"];
    const lignes = [head.join("\t")];
    for (const s of SEG) {
      const pp = s.p ? pts[s.p] : null;
      const pd = pts[s.d];
      lignes.push(
        [s.name, dec(s.m.toFixed(3)), dec(s.f.toFixed(3)), pname(s.p), pp ? pp.x : "", pp ? pp.y : "", pname(s.d), pd ? pd.x : "", pd ? pd.y : "", "", "", "", ""].join("\t")
      );
    }
    lignes.push(["Total", dec("1.000"), "", "", "", "", "", "", "", "", "", "", ""].join("\t"));
    const pa = pts.bordA;
    const pb = pts.bordB;
    lignes.push("");
    lignes.push(["Bord A du polygone", "", "", "", "", "", "", pa ? pa.x : "", pa ? pa.y : ""].join("\t"));
    lignes.push(["Bord B du polygone", "", "", "", "", "", "", pb ? pb.x : "", pb ? pb.y : ""].join("\t"));
    copier(
      "table",
      lignes.join("\n"),
      "Tableau copié : collez-le dans la cellule A1 de votre tableur. Les colonnes x_i à m_i·y_i sont à calculer."
    );
  }

  /* ---------- image annotée ---------- */
  function genererImage() {
    setExportErr(false);
    try {
      const k = Math.min(1, 1600 / Math.max(img.W, img.H));
      const c = document.createElement("canvas");
      c.width = Math.round(img.W * k);
      c.height = Math.round(img.H * k);
      const x = c.getContext("2d");
      x.setTransform(k, 0, 0, k, 0, 0);
      drawScene(x, Math.max(img.W, img.H) / 700, false, { img: img.el, W: img.W, H: img.H, pts, active: null, xs, ys, teacherPt });
      setExportUrl(c.toDataURL("image/jpeg", 0.9));
    } catch {
      setExportErr(true);
    }
  }

  /* ---------- rendu ---------- */
  const actif = active ? PTS.find((p) => p.id === active) : null;

  function liste(points) {
    return (
      <ol className={styles.lm}>
        {points.map((p) => {
          const q = pts[p.id];
          const cls = [q && styles.placed, active === p.id && styles.active, p.group === "poly" && styles.edge]
            .filter(Boolean)
            .join(" ");
          return (
            <li key={p.id} className={cls}>
              <button type="button" onClick={() => choisir(p.id)} aria-current={active === p.id ? "step" : undefined}>
                <span className={styles.num}>{p.mark}</span>
                <span className={styles.lmLabel}>{p.label}</span>
                <span className={styles.val}>{q ? `${q.x} · ${q.y}` : "à placer"}</span>
              </button>
            </li>
          );
        })}
      </ol>
    );
  }

  function verdictJsx() {
    if (!poly) return <p className={styles.empty}>Placez d'abord les deux bords du polygone (étape 3).</p>;
    if (xs == null) return <p className={styles.empty}>Saisissez à l'étape 4 le x du centre de masse que vous avez calculé.</p>;
    const cm = (d) => (v.k ? ` (≈ ${fmt(d * v.k)} cm)` : "");
    const pct = v.pct != null ? `, soit ${fmt(v.pct, 0)} % de la longueur du polygone` : "";
    const bord = v.cote === "lo" ? (poly.loIsA ? "du bord A" : "du bord B") : poly.loIsA ? "du bord B" : "du bord A";
    const fine =
      v.k && v.d * v.k < 2
        ? "À moins de 2 cm du bord, l'écart est de l'ordre de l'erreur de la table et du pointage : on ne peut pas trancher."
        : !v.k
          ? "Une marge de l'ordre du centimètre n'est pas tranchable : c'est l'ordre de l'erreur de la table et du pointage."
          : null;
    const Icone = v.inside ? CircleCheck : CircleX;
    return (
      <div className={`${styles.verdict} ${v.inside ? styles.in : styles.out}`}>
        <Icone className={styles.verdictIcon} size={22} aria-hidden="true" />
        <div>
          <strong>{v.inside ? "La projection tombe dans le polygone" : "La projection sort du polygone"}</strong>
          <p>
            {v.inside
              ? `Marge : ${fmt(v.d, 0)} px${cm(v.d)} jusqu'au bord le plus proche, celui ${bord}${pct}.`
              : `Elle tombe à ${fmt(v.d, 0)} px${cm(v.d)} au-delà ${bord}${pct}. Sur ces appuis, l'équilibre ne peut pas être maintenu dans cette posture.`}
          </p>
          {fine && <p className={styles.fine}>{fine}</p>}
        </div>
      </div>
    );
  }

  const cellule = (val) =>
    val == null ? <td className={`${styles.nb} ${styles.vide}`}>—</td> : <td className={styles.nb}>{val}</td>;

  return (
    <div className={styles.app}>
      <header className={styles.top}>
        <Link to="/outils" className={styles.back}>
          <ArrowLeft size={15} aria-hidden="true" /> Tous les outils
        </Link>
        <h1>Atelier centre de masse</h1>
        <p className={styles.sub}>
          Pointez une photo de profil, calculez le centre de masse avec la table de Winter, puis vérifiez sa projection
          dans le polygone de sustentation.
        </p>
      </header>

      <div className={styles.layout}>
        <section className={styles.stage} aria-label="Photo et repères">
          {exemple && (
            <p className={styles.note}>
              Exemple déjà rempli sur une photo de démonstration. Chargez votre photo pour commencer.
            </p>
          )}
          <div className={styles.canvasWrap} ref={wrapRef}>
            <canvas
              ref={cvRef}
              className={styles.canvas}
              aria-label="Photo : appuyez pour placer le repère actif"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerCancel}
            />
            <canvas ref={loupeRef} className={styles.loupe} hidden />
            <p className={styles.hint} aria-live="polite">
              {erreurPhoto ? (
                "Image illisible : essayez une photo JPEG ou PNG."
              ) : actif ? (
                <>
                  <span className={`${styles.hintMark} ${actif.group === "poly" ? styles.hintMarkPoly : ""}`}>
                    {actif.mark}
                  </span>
                  {actif.label}
                </>
              ) : (
                <>
                  <Check size={15} aria-hidden="true" /> Tous les repères sont placés
                </>
              )}
            </p>
          </div>
          <p className={styles.caption}>
            Appuyez, ajustez avec la loupe, relâchez pour placer. Origine en bas à gauche, x vers la droite, y vers le
            haut. La photo reste sur votre appareil : rien n'est envoyé.
          </p>
        </section>

        <aside className={styles.panel}>
          <Etape
            n={1}
            titre="Photo"
            statut={photoPerso ? "chargée" : "exemple"}
            fait={photoPerso}
            ouvert={ouverts.has(1)}
            onBascule={() => basculer(1)}
          >
            <label className={styles.drop}>
              <ImagePlus size={22} aria-hidden="true" />
              <span>
                <strong>Choisir une photo</strong>
                <small>ou la prendre avec le téléphone</small>
              </span>
              <input type="file" accept="image/*" onChange={chargerPhoto} />
            </label>
            <ul className={styles.tips}>
              <li>de profil, perpendiculaire au plan du mouvement ;</li>
              <li>téléphone à niveau (grille activée), à hauteur du bassin ;</li>
              <li>pris à 3 m ou plus ;</li>
              <li>sans objet tenu ou porté : le modèle ne compte que le corps.</li>
            </ul>
          </Etape>

          <Etape
            n={2}
            titre="Repères anatomiques"
            statut={`${nbCorps} / ${CORPS.length}`}
            fait={nbCorps === CORPS.length}
            ouvert={ouverts.has(2)}
            onBascule={() => basculer(2)}
          >
            <p className={styles.small}>Touchez un repère pour le placer ou le corriger sur la photo.</p>
            {liste(CORPS)}
            <div className={styles.row}>
              <button type="button" className={`${styles.button} ${styles.ghost}`} onClick={copierPoints}>
                <Copy size={16} aria-hidden="true" /> Copier les coordonnées
              </button>
              <button type="button" className={styles.linkButton} onClick={toutEffacer}>
                <RotateCcw size={14} aria-hidden="true" /> Tout effacer
              </button>
            </div>
            {copie.pts.msg && (
              <p className={styles.small} aria-live="polite">
                {copie.pts.msg}
              </p>
            )}
            {copie.pts.area != null && (
              <textarea className={styles.copyArea} readOnly value={copie.pts.area} aria-label="Coordonnées à copier" onFocus={(e) => e.target.select()} autoFocus />
            )}
          </Etape>

          <Etape
            n={3}
            titre="Polygone de sustentation"
            statut={`${nbBords} / ${BORDS.length}`}
            fait={nbBords === BORDS.length}
            ouvert={ouverts.has(3)}
            onBascule={() => basculer(3)}
          >
            <p className={styles.small}>
              Vu de profil, le polygone se réduit au segment entre ses deux bords au sol : talon et pointe du pied, ou
              genoux et orteils quand le sujet est à genoux.
            </p>
            {liste(BORDS)}
          </Etape>

          <Etape
            n={4}
            titre="Votre calcul"
            statut={xs != null ? `x = ${fmt(xs, 0)} px` : "à saisir"}
            fait={xs != null}
            ouvert={ouverts.has(4)}
            onBascule={() => basculer(4)}
          >
            <p className={styles.small}>
              Copiez le tableau dans votre tableur, calculez le centre de masse, puis saisissez votre résultat.
            </p>
            <div className={styles.row}>
              <button type="button" className={styles.button} onClick={copierTableau}>
                <Copy size={16} aria-hidden="true" /> Copier le tableau
              </button>
              <label className={styles.inline}>
                Décimales
                <select className={styles.select} value={sep} onChange={(e) => setSep(e.target.value)}>
                  <option value=",">virgule</option>
                  <option value=".">point</option>
                </select>
              </label>
            </div>
            {copie.table.msg && (
              <p className={styles.small} aria-live="polite">
                {copie.table.msg}
              </p>
            )}
            {copie.table.area != null && (
              <textarea className={styles.copyArea} readOnly value={copie.table.area} aria-label="Tableau à copier" onFocus={(e) => e.target.select()} autoFocus />
            )}

            <div className={styles.two}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="cdm-xs">
                  x calculé <span>px</span>
                </label>
                <input id="cdm-xs" className={styles.input} type="number" inputMode="decimal" step="0.1" value={champs.xs} onChange={champ("xs")} />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="cdm-ys">
                  y calculé <span>px, facultatif</span>
                </label>
                <input id="cdm-ys" className={styles.input} type="number" inputMode="decimal" step="0.1" value={champs.ys} onChange={champ("ys")} />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="cdm-ref">
                Distance réelle entre A et B <span>cm, facultatif</span>
              </label>
              <input id="cdm-ref" className={styles.input} type="number" inputMode="decimal" min="0" step="0.1" value={champs.ref} onChange={champ("ref")} />
              <p className={styles.small}>
                Par exemple la longueur du pied, talon–pointe, mesurée au décamètre : elle donne la marge en centimètres.
              </p>
            </div>

            <details className={styles.method}>
              <summary>La méthode et le tableau des segments</summary>
              <p className={styles.formula}>
                xᵢ = x_proximal + fᵢ × (x_distal − x_proximal)
                <br />x du centre de masse = Σ (mᵢ × xᵢ)
                <br />
                même formule pour y
              </p>
              <p className={styles.small}>
                Les parts de masse somment à 1 : pas de division. Posture symétrique vue de profil : chaque segment de
                membre compte deux fois (part doublée).
              </p>
              <div className={styles.tablewrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Segment</th>
                      <th>mᵢ</th>
                      <th>fᵢ</th>
                      <th>Proximal</th>
                      <th>x</th>
                      <th>y</th>
                      <th>Distal</th>
                      <th>x</th>
                      <th>y</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SEG.map((s) => {
                      const pp = s.p ? pts[s.p] : null;
                      const pd = pts[s.d];
                      return (
                        <tr key={s.id}>
                          <td>{s.name}</td>
                          <td className={styles.nb}>{fmt(s.m, 3)}</td>
                          <td className={styles.nb}>{fmt(s.f, 3)}</td>
                          <td>{pname(s.p)}</td>
                          {s.p ? cellule(pp && pp.x) : <td className={`${styles.nb} ${styles.vide}`} />}
                          {s.p ? cellule(pp && pp.y) : <td className={`${styles.nb} ${styles.vide}`} />}
                          <td>{pname(s.d)}</td>
                          {cellule(pd && pd.x)}
                          {cellule(pd && pd.y)}
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>Total</td>
                      <td className={styles.nb}>{fmt(SOMME_PARTS, 3)}</td>
                      <td colSpan={7} />
                    </tr>
                  </tfoot>
                </table>
              </div>
              <p className={styles.small}>
                Tête + cou : fᵢ = 1,000, son centre de masse est au conduit auditif ; C7 n'est pas pointé (une case vide
                vaut 0 dans le tableur, et le résultat reste juste). Tronc : du grand trochanter à l'épaule. « Jambe » :
                du genou à la malléole.
              </p>
            </details>
          </Etape>

          <Etape
            n={5}
            titre="Verdict"
            statut={v ? (v.inside ? `dedans · ${fmt(v.d, 0)} px` : `dehors · ${fmt(v.d, 0)} px`) : "—"}
            fait={!!v}
            ouvert={ouverts.has(5)}
            onBascule={() => basculer(5)}
          >
            {verdictJsx()}
            {v && (
              <div className={styles.row}>
                <button type="button" className={`${styles.button} ${styles.ghost}`} onClick={genererImage} disabled={!img}>
                  Générer l'image annotée
                </button>
              </div>
            )}
            {exportErr && (
              <p className={styles.err}>L'image annotée n'a pas pu être générée ici. Faites une capture d'écran de la photo.</p>
            )}
            {exportUrl && (
              <figure className={styles.figure}>
                <img src={exportUrl} alt="Photo annotée : repères, polygone et centre de masse" />
                <a className={styles.button} href={exportUrl} download="centre-de-masse-annote.jpg">
                  <Download size={16} aria-hidden="true" /> Télécharger l'image
                </a>
              </figure>
            )}
          </Etape>

          <details className={styles.teacher}>
            <summary>
              <Lock size={14} aria-hidden="true" /> Vérification enseignant
            </summary>
            {teacherHash ? (
              <div className={styles.field}>
                <label className={styles.label} htmlFor="cdm-code">
                  Code
                </label>
                <input id="cdm-code" className={styles.input} type="password" autoComplete="off" value={code} onChange={saisirCode} />
              </div>
            ) : (
              <p className={styles.small}>Le mode enseignant n'est pas configuré sur cette version du site.</p>
            )}
            {teacher && <Enseignant body={body} xs={xs} ys={ys} />}
          </details>
        </aside>
      </div>
    </div>
  );
}

/** Calcul complet par la page, et écart avec la saisie du groupe. */
function Enseignant({ body, xs, ys }) {
  const c = (val) => (val == null ? "—" : fmt(val));
  return (
    <>
      <div className={styles.tablewrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Segment</th>
              <th>mᵢ</th>
              <th>xᵢ</th>
              <th>yᵢ</th>
              <th>mᵢ·xᵢ</th>
              <th>mᵢ·yᵢ</th>
            </tr>
          </thead>
          <tbody>
            {body.rows.map((r) => (
              <tr key={r.s.id}>
                <td>{r.s.name}</td>
                <td className={styles.nb}>{fmt(r.s.m, 3)}</td>
                <td className={styles.nb}>{r.xi == null ? "—" : fmt(r.xi)}</td>
                <td className={styles.nb}>{r.yi == null ? "—" : fmt(r.yi)}</td>
                <td className={styles.nb}>{r.xi == null ? "—" : fmt(r.s.m * r.xi, 2)}</td>
                <td className={styles.nb}>{r.yi == null ? "—" : fmt(r.s.m * r.yi, 2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Σ</td>
              <td className={styles.nb}>{fmt(SOMME_PARTS, 3)}</td>
              <td />
              <td />
              <td className={styles.nb}>{c(body.x)}</td>
              <td className={styles.nb}>{c(body.y)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      {body.x != null ? (
        <>
          <p className={styles.teacherLine}>
            Centre de masse calculé par la page :{" "}
            <span className={styles.tv}>
              x {fmt(body.x)} · y {fmt(body.y)} px
            </span>
          </p>
          {xs != null && (
            <p className={styles.teacherLine}>
              Saisie du groupe : x {fmt(xs)}
              {ys != null && ` · y ${fmt(ys)}`} · écart{" "}
              <b>
                x {fmt(Math.abs(xs - body.x))}
                {ys != null && ` · y ${fmt(Math.abs(ys - body.y))}`} px
              </b>
            </p>
          )}
        </>
      ) : (
        <p className={styles.small}>Placer tous les repères du corps pour obtenir le calcul.</p>
      )}
      <p className={styles.small}>Tracé violet en pointillés sur la photo.</p>
    </>
  );
}
