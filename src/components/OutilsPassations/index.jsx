import React, { useEffect, useRef, useState } from "react";
import { Copy, Download } from "lucide-react";

import {
  MAX_AFFICHEES,
  SERIES,
  affichees,
  ajouterPassation,
  bornesAges,
  cocherPassation,
  ecrireListe,
  libelleGroupe,
  lireListe,
  profilTexte,
  retirerPassation,
  versCsv,
  versTsv,
} from "./logique";
import styles from "./styles.module.css";

/**
 * Briques communes aux outils à passations (échelle de Berg, Timed Up and Go) :
 * la liste des passations enregistrées, le graphique moyenne ± 1 écart-type,
 * les champs Sujet, Âge et Sexe, et l'export vers un tableur.
 *
 * Rendu côté serveur : rien ici ne touche `localStorage`, `navigator.clipboard`
 * ou le DOM pendant le rendu. La liste enregistrée est lue dans un effet ; le
 * presse-papiers et le téléchargement passent par des gestionnaires
 * d'événements. Le premier rendu, serveur comme navigateur, montre une liste vide.
 */

export { styles };

/** Stockage du navigateur, ou null s'il est inaccessible (navigation privée, cookies bloqués…). */
function stockage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/**
 * Passations enregistrées sous la clé `cle`. La liste vit dans l'état React :
 * sans stockage, la page fonctionne, et les passations durent le temps de la visite.
 */
export function usePassations(cle) {
  const [liste, setListe] = useState([]);

  useEffect(() => {
    const s = stockage();
    if (s) setListe(lireListe(s, cle));
  }, [cle]);

  function maj(suivante) {
    setListe(suivante);
    const s = stockage();
    if (s) ecrireListe(s, cle, suivante);
  }

  return {
    liste,
    ajouter: (p) => maj(ajouterPassation(liste, p, new Date().toISOString())),
    cocher: (i, show) => maj(cocherPassation(liste, i, show)),
    retirer: (i) => maj(retirerPassation(liste, i)),
  };
}

/* ---------- identification ---------- */

/** Champs Sujet, Âge et Sexe, suivis de la note sur la condition de passation. */
export function ChampsSujet({ id, valeurs, onChange }) {
  const champ = (k) => (e) => onChange({ ...valeurs, [k]: e.target.value });
  return (
    <>
      <div className={styles.row}>
        <div className={`${styles.field} ${styles.grow}`}>
          <label className={styles.label} htmlFor={`${id}-sujet`}>
            Sujet
          </label>
          <input
            id={`${id}-sujet`}
            className={styles.input}
            type="text"
            autoComplete="off"
            placeholder="Prénom ou initiales"
            value={valeurs.label}
            onChange={champ("label")}
          />
        </div>
        <div className={`${styles.field} ${styles.age}`}>
          <label className={styles.label} htmlFor={`${id}-age`}>
            Âge
          </label>
          <input
            id={`${id}-age`}
            className={styles.input}
            type="number"
            inputMode="numeric"
            min="1"
            max="120"
            step="1"
            placeholder="—"
            value={valeurs.age}
            onChange={champ("age")}
          />
        </div>
        <div className={`${styles.field} ${styles.sexe}`}>
          <label className={styles.label} htmlFor={`${id}-sexe`}>
            Sexe
          </label>
          <select id={`${id}-sexe`} className={styles.select} value={valeurs.sexe} onChange={champ("sexe")}>
            <option value="">Non précisé</option>
            <option value="F">Femme</option>
            <option value="H">Homme</option>
          </select>
        </div>
      </div>
      <p className={styles.hint}>
        Précisez dans le champ Sujet la condition de passation si besoin, par exemple « Léa, avec mallette ». L'âge et
        le sexe, facultatifs, surlignent le groupe de référence correspondant.
      </p>
    </>
  );
}

/** Note affichée quand l'âge saisi n'appartient à aucun groupe. */
export function NoteAge({ groupes, visible }) {
  if (!visible) return null;
  const { min, max } = bornesAges(groupes);
  return (
    <p className={styles.small} aria-live="polite">
      Aucun groupe de référence pour cet âge : les groupes vont de {min} à {max} ans.
    </p>
  );
}

/* ---------- graphique ---------- */

/** Échantillon de trait, pour la légende et la liste des passations. */
function Trait({ serie, dash, className }) {
  return (
    <svg className={className} width="26" height="8" aria-hidden="true">
      <line
        x1="1"
        x2="25"
        y1="4"
        y2="4"
        stroke={`var(--op-${serie})`}
        strokeWidth="2.5"
        strokeDasharray={dash || undefined}
      />
    </svg>
  );
}

/**
 * Graphique : une ligne par groupe de référence (tranche d'âge × sexe). La
 * moyenne en point, ± 1 écart-type en trait, l'effectif `n` en fin de ligne.
 * Ce n'est pas un histogramme : aucune donnée individuelle n'existe.
 *
 * Le trait est coupé aux bornes de l'axe (56 pour l'échelle de Berg) : une
 * extrémité coupée n'a pas de taquet. Les passations sont des verticales, avec
 * leur couleur et leur type de trait.
 *
 * Le surlignage du groupe est translucide et posé après la zone colorée : il
 * reste visible sur toute la ligne, y compris dans la zone.
 */
export function Graphique({ groupes, min, max, ticks, zoneFrom, zoneTo, hl, unite, aria, marks }) {
  const W = 480;
  const rowH = 28;
  const top = 24;
  const left = 104;
  const right = 58;
  const bottom = 36;
  const plotR = W - right;
  const H = top + groupes.length * rowH + bottom;
  const yEnd = top + groupes.length * rowH;
  const cl = (v) => Math.min(Math.max(v, min), max);
  const x = (v) => left + ((cl(v) - min) / (max - min)) * (plotR - left);

  return (
    <>
      <svg className={styles.chart} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={aria}>
        <rect
          x={x(zoneFrom)}
          y={top - 4}
          width={x(zoneTo) - x(zoneFrom)}
          height={groupes.length * rowH + 4}
          fill="var(--op-zone)"
        />
        {hl >= 0 && <rect x="4" y={top + hl * rowH} width={W - 8} height={rowH} rx="5" fill="var(--op-hl)" />}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={top - 4} y2={yEnd} stroke="var(--op-grid)" strokeWidth="1" />
            <text x={x(t)} y={yEnd + 15} fontSize="11" textAnchor="middle" fill="var(--text-muted)">
              {t}
            </text>
          </g>
        ))}
        <text x={(left + plotR) / 2} y={H - 4} fontSize="11" textAnchor="middle" fill="var(--text-muted)">
          {unite}
        </text>
        <text x={left - 8} y={top - 9} fontSize="10.5" textAnchor="end" fill="var(--text-muted)">
          âge · sexe
        </text>
        <text x={W - 6} y={top - 9} fontSize="10.5" textAnchor="end" fill="var(--text-muted)">
          effectif
        </text>
        {groupes.map((g, i) => {
          const y = top + i * rowH + rowH / 2;
          const w = i === hl ? 700 : 400;
          const lo = g.moyenne - g.ecartType;
          const hi = g.moyenne + g.ecartType;
          return (
            <g key={libelleGroupe(g)}>
              <text x={left - 8} y={y + 4} fontSize="11.5" fontWeight={w} textAnchor="end" fill="var(--text-title)">
                {libelleGroupe(g)}
              </text>
              <text x={W - 6} y={y + 4} fontSize="11.5" fontWeight={w} textAnchor="end" fill="var(--text-muted)">
                n = {g.n}
              </text>
              <line x1={x(lo)} x2={x(hi)} y1={y} y2={y} stroke="var(--op-norm)" strokeWidth="2" />
              {lo >= min && <line x1={x(lo)} x2={x(lo)} y1={y - 5} y2={y + 5} stroke="var(--op-norm)" strokeWidth="2" />}
              {hi <= max && <line x1={x(hi)} x2={x(hi)} y1={y - 5} y2={y + 5} stroke="var(--op-norm)" strokeWidth="2" />}
              <circle cx={x(g.moyenne)} cy={y} r="4.5" fill="var(--op-norm)" />
            </g>
          );
        })}
        {marks.map((m, k) => (
          <line
            key={k}
            x1={x(m.v)}
            x2={x(m.v)}
            y1={top - 8}
            y2={yEnd + 2}
            stroke={`var(--op-${m.serie})`}
            strokeWidth="2.5"
            strokeDasharray={m.dash || undefined}
          />
        ))}
      </svg>
      {marks.length ? (
        <ul className={styles.legend}>
          {marks.map((m, k) => (
            <li key={k}>
              <Trait serie={m.serie} dash={m.dash} />
              {m.label}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.small}>Cochez une passation enregistrée pour la placer sur le graphique.</p>
      )}
    </>
  );
}

/* ---------- passations enregistrées ---------- */

/**
 * Tableau des passations : une case à cocher par passation (quatre au plus sur
 * le graphique), l'échantillon de son trait, sa valeur, et un bouton pour la retirer.
 */
export function ListePassations({ id, liste, entete, valeur, onCocher, onRetirer }) {
  const nAff = affichees(liste).length;
  let k = 0;
  return (
    <>
      <p className={styles.hint}>
        Cochez jusqu'à quatre passations pour les placer sur le graphique, deux pour les comparer.
      </p>
      <div className={styles.tablewrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <span className="sm-visually-hidden">Afficher</span>
              </th>
              <th>Sujet</th>
              <th>
                <span className="sm-visually-hidden">Trait</span>
              </th>
              <th>{entete}</th>
              <th>
                <span className="sm-visually-hidden">Retirer</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {liste.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.small}>
                  Aucune passation enregistrée.
                </td>
              </tr>
            ) : (
              liste.map((p, i) => {
                const on = !!p.show;
                const serie = on ? SERIES[k++] : null;
                const prof = profilTexte(p);
                const cid = `${id}-show-${i}`;
                return (
                  <tr key={`${p.date}-${i}`}>
                    <td>
                      <input
                        type="checkbox"
                        id={cid}
                        className={styles.checkbox}
                        checked={on}
                        disabled={!on && nAff >= MAX_AFFICHEES}
                        onChange={(e) => onCocher(i, e.target.checked)}
                        aria-label={`Afficher ${p.label} sur le graphique`}
                      />
                    </td>
                    <td className={styles.wrap}>
                      <label htmlFor={cid}>{p.label}</label>
                      {prof && (
                        <>
                          <br />
                          <span className={styles.small}>{prof}</span>
                        </>
                      )}
                    </td>
                    <td>{serie && <Trait className={styles.swatch} serie={serie.cle} dash={serie.dash} />}</td>
                    <td className={styles.nb}>{valeur(p)}</td>
                    <td>
                      <button
                        type="button"
                        className={`${styles.button} ${styles.ghost} ${styles.mini}`}
                        onClick={() => onRetirer(i)}
                        aria-label={`Retirer ${p.label}`}
                      >
                        Retirer
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ---------- export vers un tableur ---------- */

/**
 * « Copier le tableau » (tabulations, à coller dans un tableur) et
 * « Télécharger (CSV) » (point-virgule, virgule décimale, BOM UTF-8 pour Excel).
 * Si le navigateur refuse la copie automatique, le texte s'affiche, sélectionné.
 */
export function ExportTableau({ lignes, nomFichier, aide, vide }) {
  const [copie, setCopie] = useState(false);
  const [repli, setRepli] = useState(null);
  const minuterie = useRef(null);

  useEffect(() => () => clearTimeout(minuterie.current), []);

  function copier() {
    const texte = versTsv(lignes());
    const ok = () => {
      setRepli(null);
      setCopie(true);
      clearTimeout(minuterie.current);
      minuterie.current = setTimeout(() => setCopie(false), 1400);
    };
    const echec = () => setRepli(texte);
    try {
      navigator.clipboard.writeText(texte).then(ok, echec);
    } catch {
      echec();
    }
  }

  function telecharger() {
    const blob = new Blob([versCsv(lignes())], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = nomFichier;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <>
      <div className={styles.row}>
        <button type="button" className={`${styles.button} ${styles.ghost}`} onClick={copier} disabled={vide}>
          <Copy size={16} aria-hidden="true" /> {copie ? "Copié" : "Copier le tableau"}
        </button>
        <button type="button" className={`${styles.button} ${styles.ghost}`} onClick={telecharger} disabled={vide}>
          <Download size={16} aria-hidden="true" /> Télécharger (CSV)
        </button>
      </div>
      {repli != null && (
        <>
          <p className={styles.small} aria-live="polite">
            Copie automatique refusée : le tableau est sélectionné ci-dessous, copiez-le.
          </p>
          <textarea
            className={styles.copyArea}
            readOnly
            value={repli}
            aria-label="Tableau à copier"
            onFocus={(e) => e.target.select()}
            autoFocus
          />
        </>
      )}
      <p className={styles.hint}>{aide}</p>
    </>
  );
}
