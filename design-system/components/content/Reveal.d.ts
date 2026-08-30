import * as React from "react";
/**
 * Question de la rubrique « Vérifiez votre compréhension » : l'énoncé est visible,
 * la réponse se déroule au clic. C'est le mode d'auto-évaluation par défaut du site.
 * @dsComponent
 */
export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  question: React.ReactNode;
  /** Repère affiché à gauche, ex. "a." ou "1". */
  index?: React.ReactNode;
  /** Couleur du repère. Default "teal". */
  tone?: "teal" | "violet";
  defaultOpen?: boolean;
  /** La réponse / le corrigé. */
  children?: React.ReactNode;
}
export declare function Reveal(props: RevealProps): JSX.Element;
