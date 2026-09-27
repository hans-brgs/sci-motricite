import React from "react";
import Link from "@docusaurus/Link";

import cours from "@site/src/data/cours.json";
import { Icon } from "../mdx/Icon";

/**
 * Les deux entrées d'un cours : les cours théoriques (CM) et les travaux dirigés
 * (TD). Deux grandes cartes côte à côte, qui passent l'une sous l'autre sur
 * téléphone. Les nombres viennent de `src/data/cours.json` : ils se tiennent à
 * jour seuls.
 */
export function PortesCours({ slug, style }) {
  const c = (slug && cours.find((x) => x.slug === slug)) || cours[0];
  if (!c) return null;
  const n = c.chapitres.length;
  const f = (c.fiches || []).length;

  const portes = [
    {
      href: c.cm,
      sigle: "CM",
      titre: "Cours théoriques",
      icone: "book-open",
      teinte: "var(--brand-teal)",
      texte: `${n} chapitre${n > 1 ? "s" : ""} rédigé${n > 1 ? "s" : ""}, avec leurs figures, leurs animations et un quiz d'entraînement.`,
    },
    {
      href: c.td,
      sigle: "TD",
      titre: "Travaux dirigés",
      icone: "flask-conical",
      teinte: "var(--brand-violet)",
      texte: f
        ? `${f} fiche${f > 1 ? "s" : ""} de TD, à suivre en séance sur téléphone.`
        : "Les fiches de TD, à suivre en séance sur téléphone. Elles arrivent au fil des séances.",
    },
  ];

  return (
    <div className="sm-portes" style={style}>
      {portes.map((p) => (
        <Link key={p.sigle} to={p.href} className="sm-porte" style={{ "--porte": p.teinte }}>
          <span className="sm-porte__tete">
            <span className="sm-porte__icone" aria-hidden="true">
              <Icon name={p.icone} size={20} />
            </span>
            <span className="sm-porte__sigle">{p.sigle}</span>
          </span>
          <span className="sm-porte__titre">{p.titre}</span>
          <span className="sm-porte__texte">{p.texte}</span>
          <span className="sm-porte__aller">
            Ouvrir <Icon name="arrow-right" size={15} />
          </span>
        </Link>
      ))}
    </div>
  );
}
