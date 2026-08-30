import React from "react";
import { Checklist } from "../content/Checklist";

/**
 * Adaptateur MDX de `Checklist` — le bloc « ✅ À la fin de cette section, je
 * dois être capable de… ».
 *
 *     <Capacites>
 *       <Capacite>Donner la définition courte de la biomécanique.</Capacite>
 *     </Capacites>
 *
 * Rien de ce que le lecteur coche n'est envoyé nulle part : l'état vit dans la
 * page, le temps de la visite.
 */
export function Capacite({ children }) {
  return <>{children}</>;
}

export function Capacites({ children, title, ...rest }) {
  const items = React.Children.toArray(children)
    .filter((child) => React.isValidElement(child))
    .map((child) => child.props.children);

  if (items.length === 0) return null;

  return <Checklist className="sm-block" items={items} title={title} {...rest} />;
}
