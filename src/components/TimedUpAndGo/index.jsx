import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import { ArrowLeft } from "lucide-react";

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
import { affichees, fmt, horsGroupes, indiceGroupe, lireAge, marques } from "../OutilsPassations/logique";
import { arrondiTemps, comparer, lignes, lireTemps } from "./logique";
import styles from "./styles.module.css";

/**
 * Timed Up and Go — chronométrer le test, enregistrer le temps et le situer
 * face aux valeurs de référence (Steffen et coll., 2002).
 *
 * Le temps vient du chronomètre (« Partez », puis « Assis : stop ») ou se
 * saisit à la main. L'outil sert aussi hors TD : rien ici ne suppose la
 * mallette de simulation.
 *
 * Rendu côté serveur : `performance.now` et `requestAnimationFrame` ne sont
 * appelés que depuis les boutons du chronomètre ; le stockage et le
 * presse-papiers, que dans des effets ou des gestionnaires d'événements.
 */

const GROUPES = normes.tug.groupes;
const SEUIL = seuils.tug;
const MAX = 20;

export default function TimedUpAndGo() {
  const { liste, ajouter, cocher, retirer } = usePassations("tug-passations");
  const [sujet, setSujet] = useState({ label: "", age: "", sexe: "" });
  const [temps, setTemps] = useState("");
  const [affiche, setAffiche] = useState(0);
  const [enCours, setEnCours] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [warn, setWarn] = useState(null);
  const t0 = useRef(null);
  const raf = useRef(null);

  // Le chronomètre s'arrête si l'on quitte la page en cours de mesure.
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const age = lireAge(sujet.age);
  const hl = indiceGroupe(GROUPES, age, sujet.sexe);
  const v = lireTemps(temps);

  const marks = marques(
    liste,
    (p) => p.time,
    (p) => `${p.label} : ${fmt(p.time)} s`,
    v !== null && dirty ? { v, label: `Passation en cours, non enregistrée : ${fmt(v)} s` } : null
  );
  const aff = affichees(liste);

  /* ---------- chronomètre ---------- */
  function tick() {
    setAffiche((performance.now() - t0.current) / 1000);
    raf.current = requestAnimationFrame(tick);
  }

  function partez() {
    t0.current = performance.now();
    setEnCours(true);
    setTemps("");
    tick();
  }

  function stop() {
    if (t0.current === null) return;
    cancelAnimationFrame(raf.current);
    const sec = (performance.now() - t0.current) / 1000;
    t0.current = null;
    setAffiche(sec);
    setTemps(sec.toFixed(1));
    setDirty(true);
    setEnCours(false);
  }

  function remettreAZero() {
    cancelAnimationFrame(raf.current);
    t0.current = null;
    setAffiche(0);
    setTemps("");
    setDirty(false);
    setEnCours(false);
  }

  function enregistrer() {
    if (v === null) {
      setWarn("Chronométrez ou saisissez un temps avant d’enregistrer.");
      return;
    }
    setWarn(null);
    setDirty(false);
    ajouter({ label: sujet.label.trim() || "Sujet sans nom", age, sex: sujet.sexe, time: arrondiTemps(v) });
  }

  return (
    <div className={s.outil}>
      <header className={s.top}>
        <Link to="/outils" className={s.back}>
          <ArrowLeft size={15} aria-hidden="true" /> Tous les outils
        </Link>
        <h1>Timed Up and Go</h1>
        <p className={s.sub}>Chronométrer le test, enregistrer le temps et le situer face aux valeurs de référence.</p>
      </header>

      <div className={s.layout}>
        <div className={s.main}>
          <div className={s.card}>
            <h2>Consigne</h2>
            <p className={s.consigne}>
              Quand je dirai « Partez », levez-vous de la chaise, marchez jusqu'à la ligne à votre allure habituelle,
              faites demi-tour, revenez à la chaise à votre allure habituelle, et asseyez-vous.
            </p>
            <p className={s.small}>
              Le sujet est assis au fond d'une chaise à accoudoirs, avec ses chaussures habituelles ; une ligne est
              tracée au sol à 3 m. Déclenchez le chronomètre au mot « Partez », arrêtez-le quand le sujet est de
              nouveau assis (CDC, STEADI).
            </p>
          </div>

          <div className={s.card}>
            <ChampsSujet id="tug" valeurs={sujet} onChange={setSujet} />
            <div className={styles.chrono} aria-live="off">
              {fmt(affiche)}
              <small> s</small>
            </div>
            <div className={s.row}>
              <button type="button" className={s.button} onClick={partez} disabled={enCours}>
                Partez
              </button>
              <button type="button" className={`${s.button} ${s.ghost}`} onClick={stop} disabled={!enCours}>
                Assis : stop
              </button>
              <button type="button" className={`${s.button} ${s.ghost}`} onClick={remettreAZero}>
                Remettre à zéro
              </button>
            </div>
            <div className={s.row}>
              <div className={`${s.field} ${styles.time}`}>
                <label className={s.label} htmlFor="tug-temps">
                  Temps (s)
                </label>
                <input
                  id="tug-temps"
                  className={s.input}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.1"
                  placeholder="ou saisir"
                  value={temps}
                  onChange={(e) => {
                    setTemps(e.target.value);
                    setDirty(true);
                  }}
                />
              </div>
              <button type="button" className={s.button} onClick={enregistrer}>
                Enregistrer la passation
              </button>
            </div>
            {warn && (
              <p className={s.warn} role="alert">
                {warn}
              </p>
            )}
          </div>
        </div>

        <aside className={s.side}>
          <div className={s.card}>
            <h2>Situer le temps</h2>
            <Graphique
              groupes={GROUPES}
              min={0}
              max={MAX}
              ticks={[0, 4, 8, 12, 16, 20]}
              zoneFrom={SEUIL.valeur}
              zoneTo={MAX}
              hl={hl}
              unite="temps (s)"
              aria="Temps de référence au Timed Up and Go par âge et par sexe, et temps des passations cochées"
              marks={marks}
            />
            <NoteAge groupes={GROUPES} visible={horsGroupes(GROUPES, age)} />
            <p className={s.small}>
              Point : moyenne du groupe. Trait : ± 1 écart-type, la dispersion des temps entre les personnes du groupe.
              Effectif : nombre de personnes du groupe, 96 personnes âgées vivant à domicile au total (Steffen et coll.,
              2002). Zone colorée : 13,5 s ou plus. Ce seuil vient de Shumway-Cook et coll. (2000), qui ont comparé 15
              personnes âgées ayant chuté au moins deux fois dans les six mois précédents à 15 personnes sans
              antécédent de chute. Plus le temps est long, plus la probabilité d'appartenir au groupe des chuteurs est
              élevée ; à partir de 13,5 s, le test classait correctement 90 % des personnes. Le temps du test est donc
              un indicateur corrélé aux antécédents de chute : il signale un risque, il ne prédit pas qu'une personne va
              tomber.
            </p>
          </div>

          <div className={s.card}>
            <h2>Passations enregistrées</h2>
            <ListePassations
              id="tug"
              liste={liste}
              entete="Temps"
              valeur={(p) => `${fmt(p.time)} s`}
              onCocher={cocher}
              onRetirer={retirer}
            />
            {aff.length === 2 && (
              <p className={s.cmp}>
                <strong>{aff[0].label}</strong> : {fmt(aff[0].time)} s ; <strong>{aff[1].label}</strong> :{" "}
                {fmt(aff[1].time)} s. {comparer(aff[0], aff[1])}
              </p>
            )}
            <ExportTableau
              lignes={() => lignes(liste)}
              nomFichier="tug-passations.csv"
              vide={liste.length === 0}
              aide="Le tableau (une ligne par passation, décimales à la virgule) se colle dans un tableur, ou se télécharge au format CSV. Les passations restent enregistrées dans ce navigateur seulement."
            />
          </div>
        </aside>
      </div>

      <div className={`${s.card} ${s.refs}`}>
        <h2>Sources</h2>
        <p>
          Podsiadlo, D., &amp; Richardson, S. (1991). The timed "Up &amp; Go": a test of basic functional mobility for
          frail elderly persons. <em>Journal of the American Geriatrics Society</em>, 39(2), 142-148.
        </p>
        <p>
          Shumway-Cook, A., Brauer, S., &amp; Woollacott, M. (2000). Predicting the probability for falls in
          community-dwelling older adults using the Timed Up &amp; Go Test. <em>Physical Therapy</em>, 80(9), 896-903.{" "}
          <a href={SEUIL.url} target="_blank" rel="noopener noreferrer">
            Article
          </a>{" "}
          — seuil de 13,5 s.
        </p>
        <p>
          CDC, STEADI :{" "}
          <a
            href="https://www.nj.gov/humanservices/doas/documents/STEADI-Assessment-TUG-508.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Timed Up &amp; Go (TUG)
          </a>
          . Consigne et protocole.
        </p>
        <p>
          Steffen, T. M., Hacker, T. A., &amp; Mollinger, L. (2002). Age- and gender-related test performance in
          community-dwelling elderly people: Six-Minute Walk Test, Berg Balance Scale, Timed Up &amp; Go Test, and gait
          speeds. <em>Physical Therapy</em>, 82(2), 128-137. Moyennes, écarts-types et effectifs repris de la{" "}
          <a href={normes.tug.url} target="_blank" rel="noopener noreferrer">
            base RehabMeasures
          </a>
          .
        </p>
      </div>
    </div>
  );
}
