import React, { useState } from "react";
import Link from "@docusaurus/Link";
import { ArrowLeft } from "lucide-react";

import epreuves from "@site/src/data/outils/berg-epreuves.json";
import normes from "@site/src/data/outils/normes-steffen-2002.json";
import seuils from "@site/src/data/outils/seuils-chute.json";
import {
  ChampsSujet,
  ExportTableau,
  Graphique,
  ListePassations,
  NoteAge,
  styles as s,
  usePassations,
} from "../OutilsPassations";
import { affichees, horsGroupes, indiceGroupe, lireAge, marques } from "../OutilsPassations/logique";
import { SCORE_MAX, NB_EPREUVES, avantEnregistrer, comparer, complet, cotationsVides, lignes, nbCotees, total } from "./logique";
import styles from "./styles.module.css";

/**
 * Échelle de Berg — coter les 14 épreuves, obtenir le score sur 56 et le
 * situer face aux valeurs de référence (Steffen et coll., 2002).
 *
 * Les textes des épreuves sont ceux du formulaire du CNFS, mot pour mot
 * (src/data/outils/berg-epreuves.json). Aucune épreuve n'est étiquetée
 * « statique » ou « dynamique » : c'est aux étudiants de les classer en TD.
 *
 * L'outil sert aussi hors TD, par exemple pour comparer deux passations d'une
 * même personne : rien ici ne suppose la mallette de simulation.
 *
 * Rendu côté serveur : les consignes et les niveaux sont dans le HTML publié.
 * Le stockage, le presse-papiers et le défilement ne sont touchés que dans des
 * effets ou des gestionnaires d'événements.
 */

const EPREUVES = epreuves.epreuves;
const GROUPES = normes.berg.groupes;
const SEUIL = seuils.berg;

export default function EchelleBerg() {
  const { liste, ajouter, cocher, retirer } = usePassations("berg-passations");
  const [sujet, setSujet] = useState({ label: "", age: "", sexe: "" });
  const [scores, setScores] = useState(cotationsVides);
  const [dirty, setDirty] = useState(false);
  const [warn, setWarn] = useState(null);

  const age = lireAge(sujet.age);
  const hl = indiceGroupe(GROUPES, age, sujet.sexe);
  const tot = total(scores);
  const n = nbCotees(scores);

  const marks = marques(
    liste,
    (p) => p.total,
    (p) => `${p.label} : ${p.total}`,
    complet(scores) && dirty ? { v: tot, label: `Passation en cours, non enregistrée : ${tot}` } : null
  );
  const aff = affichees(liste);
  const cmp = aff.length === 2 ? comparer(aff[0], aff[1]) : null;

  function coter(i, v) {
    setScores((sc) => sc.map((x, k) => (k === i ? v : x)));
    setDirty(true);
  }

  function enregistrer() {
    const w = avantEnregistrer(scores);
    setWarn(w);
    if (w) return;
    setDirty(false);
    ajouter({ label: sujet.label.trim() || "Sujet sans nom", age, sex: sujet.sexe, total: tot, scores: [...scores] });
  }

  function nouvelle() {
    setScores(cotationsVides());
    setDirty(false);
    setSujet((v) => ({ ...v, label: "" }));
    setWarn(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className={s.outil}>
      <header className={s.top}>
        <Link to="/outils" className={s.back}>
          <ArrowLeft size={15} aria-hidden="true" /> Tous les outils
        </Link>
        <h1>Échelle de Berg</h1>
        <p className={s.sub}>
          Coter les 14 épreuves, obtenir le score sur 56 et le situer face aux valeurs de référence.
        </p>
      </header>

      <div className={s.layout}>
        <div className={s.main}>
          <div className={s.card}>
            <ChampsSujet id="berg" valeurs={sujet} onChange={setSujet} />
            <details className={s.intro}>
              <summary>Avant de commencer</summary>
              <ul>
                <li>
                  Matériel : chronomètre ; règle de 25 cm ; chaise avec et sans appui-bras (hauteur de 45 cm) ; step
                  (hauteur de 19,5 cm) ; ruban adhésif.
                </li>
                <li>
                  Le sujet porte des chaussures fermées. Avant chaque épreuve, montrez au sujet le mouvement attendu,
                  puis lisez-lui la consigne telle qu'elle est écrite, identique d'une passation à l'autre.
                </li>
                <li>Pour l'appui sur une jambe et le pied devant l'autre, le sujet choisit sa jambe.</li>
                <li>
                  Quand deux niveaux semblent possibles, cotez le plus bas. Aucune aide technique, aucune aide de
                  l'évaluateur.
                </li>
                <li>
                  <a href="https://vimeo.com/158322903" target="_blank" rel="noopener noreferrer">
                    Vidéo de référence : la passation de l'échelle
                  </a>
                </li>
              </ul>
            </details>
          </div>

          <div className={styles.items}>
            {EPREUVES.map((e, i) => {
              const v = scores[i];
              return (
                <article key={e.numero} className={`${styles.item} ${v !== null ? styles.done : ""}`}>
                  <h3>
                    <span className={styles.n}>{e.numero}</span>
                    <span className={styles.titre}>{e.titre}</span>
                    <span className={styles.sc}>{v === null ? "–" : `${v} / 4`}</span>
                  </h3>
                  <p className={s.consigne}>« {e.consigne} »</p>
                  <div className={styles.opts} role="radiogroup" aria-label={`Cotation de l'épreuve ${e.numero}`}>
                    {e.niveaux.map((niv) => (
                      <label key={niv.cote} className={`${styles.opt} ${v === niv.cote ? styles.optOn : ""}`}>
                        <input
                          type="radio"
                          name={`berg-${e.numero}`}
                          value={niv.cote}
                          checked={v === niv.cote}
                          onChange={() => coter(i, niv.cote)}
                        />
                        <span className={styles.k}>{niv.cote}</span>
                        <span>{niv.texte}</span>
                      </label>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className={`${s.side} ${styles.side}`}>
          <div className={s.card}>
            <h2>Score</h2>
            <div className={styles.total}>
              <span className={styles.big}>{tot}</span>
              <span className={styles.of}>/ {SCORE_MAX}</span>
              <span className={s.small}>
                {n} / {NB_EPREUVES} épreuves cotées
              </span>
            </div>
            <div className={s.row}>
              <button type="button" className={s.button} onClick={enregistrer}>
                Enregistrer la passation
              </button>
              <button type="button" className={`${s.button} ${s.ghost}`} onClick={nouvelle}>
                Nouvelle passation
              </button>
            </div>
            {warn && (
              <p className={s.warn} role="alert">
                {warn}
              </p>
            )}
          </div>

          <div className={s.card}>
            <h2>Situer le score</h2>
            <Graphique
              groupes={GROUPES}
              min={30}
              max={SCORE_MAX}
              ticks={[30, 35, 40, 45, 50, 56]}
              zoneFrom={30}
              zoneTo={SEUIL.valeur}
              hl={hl}
              unite="score à l’échelle de Berg (sur 56)"
              aria="Scores de référence à l’échelle de Berg par âge et par sexe, et scores des passations cochées"
              marks={marks}
            />
            <NoteAge groupes={GROUPES} visible={horsGroupes(GROUPES, age)} />
            <p className={s.small}>
              Point : moyenne du groupe. Trait : ± 1 écart-type, la dispersion des scores entre les personnes du
              groupe ; il s'arrête à 56, le maximum de l'échelle. Effectif : nombre de personnes du groupe, 96
              personnes âgées vivant à domicile au total (Steffen et coll., 2002). Zone colorée : score inférieur à{" "}
              {SEUIL.valeur}, associé à un risque de chute accru ({SEUIL.source}).
            </p>
          </div>

          <div className={s.card}>
            <h2>Passations enregistrées</h2>
            <ListePassations
              id="berg"
              liste={liste}
              entete="Score"
              valeur={(p) => `${p.total} / ${SCORE_MAX}`}
              onCocher={cocher}
              onRetirer={retirer}
            />
            {cmp && (
              <p className={s.cmp}>
                <strong>{aff[0].label}</strong> : {aff[0].total} ; <strong>{aff[1].label}</strong> : {aff[1].total}.{" "}
                {cmp.ecart}
                <br />
                {cmp.changements}
              </p>
            )}
            <ExportTableau
              lignes={() => lignes(liste)}
              nomFichier="berg-passations.csv"
              vide={liste.length === 0}
              aide="Le tableau (une ligne par passation, cotation de chaque épreuve) se colle dans un tableur, ou se télécharge au format CSV. Les passations restent enregistrées dans ce navigateur seulement."
            />
          </div>
        </aside>
      </div>

      <div className={`${s.card} ${s.refs}`}>
        <h2>Sources</h2>
        <p>
          Berg, K. O., Wood-Dauphinee, S., Williams, J. I., &amp; Maki, B. E. (1992). Measuring balance in the elderly:
          validation of an instrument. <em>Canadian Journal of Public Health</em>, 83, 7-11. Version française :{" "}
          <em>Kinésithérapie, les cahiers</em>, 2004, vol. 32-33, p. 50-59. Consignes et cotations reprises du{" "}
          <a href={epreuves.url} target="_blank" rel="noopener noreferrer">
            formulaire du CNFS
          </a>
          .
        </p>
        <p>
          Steffen, T. M., Hacker, T. A., &amp; Mollinger, L. (2002). Age- and gender-related test performance in
          community-dwelling elderly people: Six-Minute Walk Test, Berg Balance Scale, Timed Up &amp; Go Test, and gait
          speeds. <em>Physical Therapy</em>, 82(2), 128-137. Moyennes, écarts-types et effectifs repris de la{" "}
          <a href={normes.berg.url} target="_blank" rel="noopener noreferrer">
            base RehabMeasures
          </a>
          .
        </p>
      </div>
    </div>
  );
}
