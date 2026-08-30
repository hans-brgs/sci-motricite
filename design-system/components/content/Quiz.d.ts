import * as React from "react";
/**
 * QCM d'auto-évaluation : une seule bonne réponse, correction immédiate au clic,
 * explication sous les options. Complète `Reveal` pour les questions fermées.
 * @dsComponent
 */
export interface QuizOption { label: React.ReactNode; correct?: boolean }
export interface QuizProps extends React.HTMLAttributes<HTMLDivElement> {
  question: React.ReactNode;
  index?: React.ReactNode;
  options: QuizOption[];
  /** Justification affichée après la réponse. */
  explanation?: React.ReactNode;
}
export declare function Quiz(props: QuizProps): JSX.Element;
