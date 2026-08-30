/**
 * Point d'entrée des composants du design system « Sci Motricité ».
 *
 * Les fichiers de `src/components/<famille>/` sont des **copies** de
 * `design-system/components/`. Le design system reste la source de vérité :
 * toute divergence est listée dans `src/components/README.md`.
 *
 * Pour écrire dans un chapitre sans rien importer, un composant doit aussi être
 * enregistré dans `src/theme/MDXComponents.js`.
 */

// Core
export { Button } from "./core/Button";
export { Badge } from "./core/Badge";
export { Tag } from "./core/Tag";
export { Card } from "./core/Card";

// Formulaires
export { Input } from "./forms/Input";
export { Select } from "./forms/Select";
export { Checkbox } from "./forms/Checkbox";

// Navigation
export { Tabs } from "./navigation/Tabs";
export { Breadcrumb } from "./navigation/Breadcrumb";
export { SidebarNav } from "./navigation/SidebarNav";
export { DocNav } from "./navigation/DocNav";
export { ThemeToggle } from "./navigation/ThemeToggle";

// Contenu
export { ChapterHeader } from "./content/ChapterHeader";
export { SectionLead } from "./content/SectionLead";
export { Application } from "./content/Application";
export { FurtherReading } from "./content/FurtherReading";
export { GlossaryBox } from "./content/GlossaryBox";
export { Checklist } from "./content/Checklist";
export { Admonition } from "./content/Admonition";
export { Definition } from "./content/Definition";
export { Figure } from "./content/Figure";
export { FigurePanel } from "./content/FigurePanel";
export { CodeBlock } from "./content/CodeBlock";
export { Reference } from "./content/Reference";
export { Reveal } from "./content/Reveal";
export { Quiz } from "./content/Quiz";

// Données
export { Stat } from "./data/Stat";
export { StepList } from "./data/StepList";

// Surfaces
export { GlowSurface } from "./surfaces/GlowSurface";

// Adaptateurs MDX (voir ./mdx/README.md)
export { Glossaire, Terme } from "./mdx/Glossaire";
export { Capacites, Capacite } from "./mdx/Capacites";
export { Formule } from "./mdx/Formule";
export { ExempleResolu } from "./mdx/ExempleResolu";
export { Ressource } from "./mdx/Ressource";
export { Animation } from "./mdx/Animation";
export { Verification } from "./mdx/Verification";
export { Icon } from "./mdx/Icon";
