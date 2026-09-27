import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import {
  Ban,
  Camera,
  Check,
  ChevronDown,
  Clock,
  ExternalLink,
  KeyRound,
  Lock,
  Play,
  ShieldAlert,
  Unlock,
  Users,
} from "lucide-react";

import { ChapterHeader } from "../content/ChapterHeader";
import { Badge } from "../core/Badge";
import styles from "./styles.module.css";

/**
 * Composants d'une fiche de TD.
 *
 * Ils sont écrits pour être la cible de la conversion vault → site : une fiche
 * `contenu/td/<id>.md` rédigée selon `outils/format-fiche-td.md` deviendra une
 * page MDX qui n'utilise que ces composants. La fiche d'exemple
 * (`docs/…/td/exemple-defis-equilibre.mdx`) les écrit à la main, en attendant.
 *
 * Le lecteur est l'étudiant, sur son téléphone, pendant la séance : chaque bloc
 * doit se lire d'un coup d'œil, et ce qui est interdit doit être aussi visible
 * que ce qui est demandé.
 */

/* ===========================================================================
   En-tête, mission, matériel, sécurité, questions clés
   ======================================================================== */

export function EnTeteTD({ titre, seance, duree, activites = [], groupes, exemple = false, children }) {
  const meta = (
    <>
      {exemple && <Badge tone="warning">Fiche d'exemple</Badge>}
      {seance && <Badge tone="violet">{seance}</Badge>}
      {activites.map((a) => (
        <Badge key={a} tone="neutral">
          {a}
        </Badge>
      ))}
      {duree && (
        <span className={styles.metaInfo}>
          <Clock size={13} aria-hidden="true" /> {duree}
        </span>
      )}
      {groupes && (
        <span className={styles.metaInfo}>
          <Users size={13} aria-hidden="true" /> {groupes}
        </span>
      )}
    </>
  );
  return (
    <ChapterHeader title={titre} meta={meta} objectivesLabel="Votre mission">
      {children}
    </ChapterHeader>
  );
}

/**
 * Le matériel, en liste à cocher. Les cases cochées sont retenues par le
 * navigateur de l'étudiant (et par lui seul) : il peut préparer sa table,
 * fermer la page et la retrouver cochée.
 */
export function Materiel({ fiche, groupes = [] }) {
  const cle = `td:${fiche}:materiel`;
  const [coches, setCoches] = useState({});

  useEffect(() => {
    try {
      setCoches(JSON.parse(window.localStorage.getItem(cle) || "{}"));
    } catch {
      // stockage indisponible (navigation privée) : la liste marche sans mémoire
    }
  }, [cle]);

  const basculer = (id) =>
    setCoches((c) => {
      const n = { ...c, [id]: !c[id] };
      try {
        window.localStorage.setItem(cle, JSON.stringify(n));
      } catch {
        // idem
      }
      return n;
    });

  return (
    <div className={styles.materiel}>
      {groupes.map((g) => (
        <div key={g.titre} className={styles.materielGroupe}>
          <h3 className={styles.sousTitre}>{g.titre}</h3>
          <ul className={styles.cases}>
            {g.elements.map((e) => {
              const id = `${g.titre}:${e}`;
              return (
                <li key={id}>
                  <label className={coches[id] ? styles.coche : undefined}>
                    <input type="checkbox" checked={!!coches[id]} onChange={() => basculer(id)} />
                    <span className={styles.caseVisuelle} aria-hidden="true">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span>{e}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Securite({ children }) {
  return (
    <aside className={`${styles.alerte} sm-block`} aria-label="Sécurité">
      <p className={styles.alerteTitre}>
        <ShieldAlert size={18} aria-hidden="true" /> Sécurité
      </p>
      {children}
    </aside>
  );
}

export function QuestionsCles({ children }) {
  return <div className={styles.questionsCles}>{children}</div>;
}

/* ===========================================================================
   Déroulement
   ======================================================================== */

export function Etape({ numero, titre, duree, children }) {
  return (
    <section className={`${styles.etape} sm-block`}>
      <header className={styles.etapeTete}>
        <span className={styles.etapeNumero}>{numero}</span>
        <h3 className={styles.etapeTitre}>{titre}</h3>
        {duree != null && (
          <span className={styles.duree}>
            <Clock size={13} aria-hidden="true" /> {duree} min
          </span>
        )}
      </header>
      <div className={styles.etapeCorps}>{children}</div>
    </section>
  );
}

export function Interdit({ children }) {
  return (
    <p className={styles.interdit}>
      <Ban size={17} aria-hidden="true" />
      <span>
        <strong>Interdit</strong> — {children}
      </span>
    </p>
  );
}

/* ===========================================================================
   Les défis
   ======================================================================== */

/** Accès direct à son défi : sur téléphone, on ne fait pas défiler les trois autres. */
export function ChoixDefi({ defis = [] }) {
  return (
    <nav className={styles.choix} aria-label="Aller à votre défi">
      <span className={styles.choixLabel}>Votre défi :</span>
      {defis.map((d) => (
        <a key={d.numero} href={`#defi-${d.numero}`} className={styles.choixPuce}>
          <span className={styles.choixNumero}>{d.numero}</span> {d.nom}
        </a>
      ))}
    </nav>
  );
}

/**
 * Un défi, en carte repliable. Replié par défaut : chaque groupe n'en suit
 * qu'un. Il s'ouvre seul quand on y arrive par son ancre (#defi-n).
 */
/**
 * Place la rubrique « Matériel » juste après l'illustration du défi, ou en
 * tête de carte s'il n'y en a pas : on lit ce qu'il faut avant les consignes.
 */
function avecMateriel(children, materiel) {
  if (!materiel) return children;
  const rubrique = (
    <Rubrique key="materiel" intitule="Matériel">
      <p>{materiel}</p>
    </Rubrique>
  );
  const liste = React.Children.toArray(children);
  const i = liste.findIndex((e) => React.isValidElement(e) && e.type === Illustration);
  if (i < 0) return [rubrique, ...liste];
  return [...liste.slice(0, i + 1), rubrique, ...liste.slice(i + 1)];
}

export function Defi({ numero, nom, origines, groupe, materiel, children }) {
  const id = `defi-${numero}`;
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    const suivre = () => {
      if (window.location.hash === `#${id}`) setOuvert(true);
    };
    suivre();
    window.addEventListener("hashchange", suivre);
    return () => window.removeEventListener("hashchange", suivre);
  }, [id]);

  return (
    <section id={id} className={`${styles.defi} ${ouvert ? styles.defiOuvert : ""} sm-block`}>
      <h3 className={styles.defiTete}>
        <button type="button" aria-expanded={ouvert} aria-controls={`${id}-corps`} onClick={() => setOuvert((o) => !o)}>
          <span className={styles.defiNumero}>{numero}</span>
          <span className={styles.defiNoms}>
            <span className={styles.defiNom}>{nom}</span>
            {origines && <span className={styles.defiOrigines}>{origines}</span>}
          </span>
          {groupe && <span className={styles.defiGroupe}>Groupe {groupe}</span>}
          <ChevronDown className={styles.chevron} size={20} aria-hidden="true" />
        </button>
      </h3>
      <div id={`${id}-corps`} className={styles.defiCorps} hidden={!ouvert}>
        {avecMateriel(children, materiel)}
      </div>
    </section>
  );
}

/**
 * Une vidéo TikTok, derrière une façade.
 *
 * Rien n'est demandé à TikTok tant que l'étudiant n'a pas cliqué : ni lecteur,
 * ni vignette, ni cookie. Au clic seulement, le lecteur officiel de TikTok
 * (`/player/v1/<id>`) est monté — TikTok peut alors afficher son propre bandeau
 * de cookies, ce que la façade annonce. Le lien « Ouvrir sur TikTok » reste
 * disponible pour qui préfère l'application.
 *
 * Les vidéos TikTok sont verticales (9:16) : le cadre est borné en largeur
 * pour ne pas occuper tout l'écran d'un ordinateur.
 */
export function VideoTikTok({ id, auteur, legende }) {
  const [lecture, setLecture] = useState(false);
  const url = `https://www.tiktok.com/@${auteur}/video/${id}`;
  return (
    <figure className={styles.tiktok}>
      <div className={styles.tiktokCadre}>
        {lecture ? (
          <iframe
            src={`https://www.tiktok.com/player/v1/${id}?autoplay=1&rel=0&description=1`}
            title={`Vidéo TikTok de @${auteur}${legende ? ` : ${legende}` : ""}`}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            className={styles.tiktokLecteur}
          />
        ) : (
          <button type="button" className={styles.tiktokFacade} onClick={() => setLecture(true)}>
            <span className={styles.tiktokAuteur}>@{auteur}</span>
            <span className={styles.tiktokLire} aria-hidden="true">
              <Play size={30} fill="currentColor" />
            </span>
            <span className={styles.tiktokAction}>Lire la vidéo</span>
            <span className={styles.tiktokNote}>Servie par TikTok, qui peut vous demander d'accepter ses cookies.</span>
          </button>
        )}
      </div>
      <figcaption className={styles.tiktokLegende}>
        {legende && <span>{legende} · </span>}
        <a href={url} target="_blank" rel="noopener noreferrer">
          Ouvrir sur TikTok <ExternalLink size={12} aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  );
}

/**
 * Emplacement de l'illustration d'un défi : une vidéo TikTok, un média du
 * cours, ou rien. Sans média, il le dit plutôt que de laisser un trou.
 */
export function Illustration({ tiktok, children }) {
  if (tiktok) return <VideoTikTok {...tiktok} />;
  if (children) return <div className={styles.illustration}>{children}</div>;
  return (
    <div className={`${styles.illustration} ${styles.illustrationVide}`}>
      <Camera size={22} aria-hidden="true" />
      <span>illustration à produire</span>
    </div>
  );
}

/*
 * L'intérieur d'un défi n'a qu'une forme : la rubrique. Un intitulé court à
 * gauche, le contenu à droite, un filet fin entre deux rubriques ; sur
 * téléphone, l'intitulé passe au-dessus. Pas d'encadré, pas de fond, pas
 * d'icône : c'est l'intitulé qui dit ce qu'on lit.
 *
 * Deux exceptions seulement, pour que l'essentiel ressorte :
 *  - la règle d'or, dont l'intitulé est en rouge : c'est l'interdit ;
 *  - la réponse protégée, seule rubrique encadrée : c'est la seule chose à
 *    faire dans la carte.
 */
function Rubrique({ intitule, accent = false, children }) {
  return (
    <div className={styles.rubrique}>
      <p className={`${styles.rubriqueIntitule} ${accent ? styles.rubriqueAccent : ""}`}>{intitule}</p>
      <div className={styles.rubriqueCorps}>{children}</div>
    </div>
  );
}

export function CommentJouer({ children }) {
  return <Rubrique intitule="Comment jouer">{children}</Rubrique>;
}

export function RegleOr({ children }) {
  return (
    <Rubrique intitule="Règle d'or" accent>
      <p className={styles.regleOr}>{children}</p>
    </Rubrique>
  );
}

export function InstantPhoto({ children }) {
  return (
    <Rubrique intitule="À photographier">
      <p>{children}</p>
    </Rubrique>
  );
}

export function IdeeRecue({ source, question, children }) {
  return (
    <Rubrique intitule="Sur les réseaux">
      <blockquote className={styles.ideeCitation}>{children}</blockquote>
      {source && (
        <p className={styles.ideeSource}>
          <a href={source.url} target="_blank" rel="noopener noreferrer">
            {source.titre} <ExternalLink size={12} aria-hidden="true" />
          </a>
        </p>
      )}
      {question && <p className={styles.ideeQuestion}>{question}</p>}
    </Rubrique>
  );
}

export function QuestionsDefi({ children }) {
  return <Rubrique intitule="Vos questions">{children}</Rubrique>;
}

/* ===========================================================================
   Réponse protégée : déchiffrée dans le navigateur
   ======================================================================== */

/*
 * Le texte de la réponse n'est pas dans la page : seul son chiffré y est, en
 * AES-256-GCM, avec une clé dérivée du mot de passe par PBKDF2-SHA-256. Le sel
 * est dérivé de l'identifiant de la fiche ; le vecteur d'initialisation est en
 * tête du chiffré. Un mauvais mot de passe échoue à la vérification d'intégrité
 * de GCM : on le sait sans rien révéler.
 *
 * Un mot de passe juste ouvre toutes les réponses de la fiche d'un coup, et
 * reste mémorisé le temps de l'onglet (sessionStorage).
 */
const ITERATIONS = 600000;
const cles = new Map(); // fiche|motDePasse -> Promise<CryptoKey>

function base64(b64) {
  const s = atob(b64);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i += 1) out[i] = s.charCodeAt(i);
  return out;
}

function deriver(fiche, motDePasse) {
  const k = `${fiche}|${motDePasse}`;
  if (!cles.has(k)) {
    cles.set(
      k,
      (async () => {
        const enc = new TextEncoder();
        const sel = new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(`sci-motricite:td:${fiche}`))).slice(0, 16);
        const base = await crypto.subtle.importKey("raw", enc.encode(motDePasse), "PBKDF2", false, ["deriveKey"]);
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: sel, iterations: ITERATIONS, hash: "SHA-256" },
          base,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
      })()
    );
  }
  return cles.get(k);
}

async function dechiffrer(fiche, motDePasse, chiffre) {
  const donnees = base64(chiffre);
  const cle = await deriver(fiche, motDePasse);
  const clair = await crypto.subtle.decrypt({ name: "AES-GCM", iv: donnees.slice(0, 12) }, cle, donnees.slice(12));
  return new TextDecoder().decode(clair);
}

const normaliser = (m) => m.trim().toLowerCase().replace(/\s+/g, " ");

export function ReponseProtegee({ fiche, chiffre, titre = "Explication et verdict" }) {
  const [html, setHtml] = useState(null);
  const [saisie, setSaisie] = useState("");
  const [etat, setEtat] = useState("ferme"); // ferme | calcul | faux
  // Lu par l'écouteur d'événement : un état React y serait figé à sa valeur
  // du premier rendu, et chaque réponse ouverte se rouvrirait en boucle.
  const ouverte = useRef(false);

  async function essayer(motDePasse, silencieux = false) {
    if (!motDePasse) return;
    setEtat("calcul");
    try {
      const h = await dechiffrer(fiche, motDePasse, chiffre);
      ouverte.current = true;
      setHtml(h);
      try {
        window.sessionStorage.setItem(`td:${fiche}:mdp`, motDePasse);
      } catch {
        // stockage indisponible : chaque réponse redemandera le mot de passe
      }
      // Seule une saisie de l'étudiant prévient les autres réponses de la fiche.
      // Une réponse ouverte par ce signal ne le relaie pas : sans cette règle,
      // les réponses se prévenaient les unes les autres sans fin.
      if (!silencieux) {
        window.dispatchEvent(new CustomEvent("td:deverrouille", { detail: { fiche, motDePasse } }));
      }
    } catch {
      setEtat(silencieux ? "ferme" : "faux");
    }
  }

  useEffect(() => {
    let memo = null;
    try {
      memo = window.sessionStorage.getItem(`td:${fiche}:mdp`);
    } catch {
      memo = null;
    }
    if (memo) essayer(memo, true);
    const ecouter = (e) => {
      if (e.detail?.fiche === fiche && !ouverte.current) essayer(e.detail.motDePasse, true);
    };
    window.addEventListener("td:deverrouille", ecouter);
    return () => window.removeEventListener("td:deverrouille", ecouter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fiche, chiffre]);

  if (html != null) {
    return (
      <section className={`${styles.protege} ${styles.protegeOuvert}`}>
        <p className={styles.protegeTitre}>
          <Unlock size={17} aria-hidden="true" /> {titre}
        </p>
        {/* Contenu écrit et chiffré par nous ; GCM garantit qu'il n'a pas été altéré. */}
        <div className={styles.protegeTexte} dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    );
  }

  return (
    <section className={styles.protege}>
      <p className={styles.protegeTitre}>
        <Lock size={17} aria-hidden="true" /> {titre}
      </p>
      <p className={styles.protegeTexteFerme}>
        C'est à vous de le trouver. La réponse s'ouvre avec le mot de passe donné en fin de séance.
      </p>
      <form
        className={styles.protegeForm}
        onSubmit={(e) => {
          e.preventDefault();
          essayer(normaliser(saisie));
        }}
      >
        <label className="sm-visually-hidden" htmlFor={`mdp-${fiche}-${chiffre.slice(0, 8)}`}>
          Mot de passe
        </label>
        <input
          id={`mdp-${fiche}-${chiffre.slice(0, 8)}`}
          type="password"
          autoComplete="off"
          placeholder="Mot de passe"
          value={saisie}
          onChange={(e) => {
            setSaisie(e.target.value);
            if (etat === "faux") setEtat("ferme");
          }}
        />
        <button type="submit" disabled={etat === "calcul"}>
          <KeyRound size={15} aria-hidden="true" /> {etat === "calcul" ? "Vérification…" : "Ouvrir"}
        </button>
      </form>
      {etat === "faux" && <p className={styles.protegeFaux}>Ce n'est pas le bon mot de passe.</p>}
    </section>
  );
}

/* ===========================================================================
   Évaluation et ressources
   ======================================================================== */

export function Evaluation({ format, duree, note, children }) {
  return (
    <section className={`${styles.evaluation} sm-block`}>
      <dl className={styles.evaluationFaits}>
        <div>
          <dt>Format</dt>
          <dd>{format}</dd>
        </div>
        {duree && (
          <div>
            <dt>Durée</dt>
            <dd>{duree}</dd>
          </div>
        )}
        {note && (
          <div>
            <dt>Note</dt>
            <dd>{note}</dd>
          </div>
        )}
      </dl>
      {children}
    </section>
  );
}

export function LienOutil({ href, titre, resume }) {
  return (
    <Link to={href} className={styles.lienOutil}>
      <span className={styles.lienOutilSurtitre}>Outil</span>
      <span className={styles.lienOutilTitre}>{titre}</span>
      {resume && <span className={styles.lienOutilResume}>{resume}</span>}
    </Link>
  );
}
