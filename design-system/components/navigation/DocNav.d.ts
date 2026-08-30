import * as React from "react";
/**
 * Previous / next pager at the foot of every course page.
 * @dsComponent
 */
export interface DocNavLink { title: React.ReactNode; label?: React.ReactNode; href?: string }
export interface DocNavProps extends React.HTMLAttributes<HTMLElement> {
  prev?: DocNavLink;
  next?: DocNavLink;
}
export declare function DocNav(props: DocNavProps): JSX.Element;
