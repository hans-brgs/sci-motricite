import * as React from "react";
/**
 * Bandeau d'ouverture d'une page de cours ou de TD : fil d'Ariane, titre,
 * métadonnées (CM, section, durée, date de mise à jour), action, puis les
 * objectifs de la section — le tout dans un seul bloc, sous un filet dégradé.
 * @dsComponent
 */
export interface ChapterHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Un <Breadcrumb />. */
  breadcrumb?: React.ReactNode;
  title: React.ReactNode;
  /** Ligne de Badges et de mentions mono. */
  meta?: React.ReactNode;
  /** Boutons poussés à droite de la ligne de métadonnées. */
  actions?: React.ReactNode;
  /** Default "Objectifs de la section". */
  objectivesLabel?: React.ReactNode;
  /** Le texte des objectifs. Omis, la partie basse du bandeau disparaît. */
  children?: React.ReactNode;
}
export declare function ChapterHeader(props: ChapterHeaderProps): JSX.Element;
