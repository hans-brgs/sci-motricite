import * as React from "react";
/**
 * Docs sidebar: uppercase mono section labels over a flat list of page links.
 * @dsComponent
 * @startingPoint section="Navigation" subtitle="Sommaire latéral du cours" viewport="320x420"
 */
export interface SidebarItem { id: string; label: React.ReactNode; href?: string; badge?: React.ReactNode }
export interface SidebarSection { label: React.ReactNode; items: SidebarItem[] }
export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  sections: SidebarSection[];
  activeId?: string;
  onSelect?: (id: string) => void;
}
export declare function SidebarNav(props: SidebarNavProps): JSX.Element;
