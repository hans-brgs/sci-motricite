import React from "react";
import { GlossaryBox } from "../content/GlossaryBox";

/**
 * Adaptateur MDX de `GlossaryBox`.
 *
 * Le composant du design system attend `entries: {term, def}[]` — un tableau
 * JavaScript, qui ne s'écrit pas en Markdown. Cet adaptateur laisse écrire :
 *
 *     <Glossaire>
 *       <Terme nom="Vitesse">Distance parcourue divisée par la durée, en m/s.</Terme>
 *     </Glossaire>
 *
 * et reconstruit le tableau attendu. Le gras, les liens et les notes de bas de
 * page restent donc rédigés en Markdown dans la définition.
 */
export function Terme({ children }) {
  return <>{children}</>;
}

export function Glossaire({ children, title, ...rest }) {
  const entries = React.Children.toArray(children)
    .filter((child) => React.isValidElement(child) && child.props && child.props.nom)
    .map((child) => ({ term: child.props.nom, def: child.props.children }));

  if (entries.length === 0) return null;

  return (
    <GlossaryBox className="sm-block" entries={entries} title={title} {...rest} />
  );
}
