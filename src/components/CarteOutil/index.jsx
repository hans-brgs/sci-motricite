import React from "react";
import Link from "@docusaurus/Link";
import { ArrowRight } from "lucide-react";

import styles from "./styles.module.css";

/**
 * Carte d'un outil sur la page « Outils » : une vignette qui montre ce que fait
 * l'outil, puis son nom, ce qu'on y fait en une phrase, et le lien pour l'ouvrir.
 * Toute la carte est cliquable.
 */
export default function CarteOutil({ href, titre, resume, etiquettes = [], vignette, large = false }) {
  return (
    <Link to={href} className={`${styles.carte} ${large ? styles.large : ""}`}>
      <div className={styles.vignette} aria-hidden={vignette ? undefined : "true"}>
        {vignette}
      </div>
      <div className={styles.corps}>
        {etiquettes.length > 0 && (
          <ul className={styles.etiquettes}>
            {etiquettes.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
        <h2 className={styles.titre}>{titre}</h2>
        <p className={styles.resume}>{resume}</p>
        <span className={styles.ouvrir}>
          Ouvrir l'outil <ArrowRight size={16} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
