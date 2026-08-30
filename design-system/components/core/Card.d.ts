import * as React from "react";
/**
 * Surface for a course, chapter or resource. Flat by default; lifts on hover
 * only when `interactive`.
 * @dsComponent
 * @startingPoint section="Core" subtitle="Carte de chapitre / ressource" viewport="700x260"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  /** Mono uppercase kicker above the title. */
  eyebrow?: React.ReactNode;
  /** Row of Badges/Tags under the body. */
  meta?: React.ReactNode;
  footer?: React.ReactNode;
  /** 3px colour rule on the leading edge. Default "none". */
  accent?: "none" | "teal" | "violet";
  interactive?: boolean;
  children?: React.ReactNode;
}
export declare function Card(props: CardProps): JSX.Element;
