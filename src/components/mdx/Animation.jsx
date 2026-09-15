import React from "react";

/**
 * Lecteur d'une animation 3D du cours.
 *
 * Les animations sont hébergées sur YouTube en « non répertorié » : les mêmes
 * liens servent au poly, au diaporama et au site. L'iframe n'est montée qu'au
 * clic (façade cliquable) — la page ne contacte donc YouTube que si le lecteur
 * décide de regarder, et le domaine `youtube-nocookie.com` évite le dépôt de
 * cookies de suivi tant que la lecture n'a pas commencé.
 *
 * Le composant accepte **deux sources**, et une seule à la fois :
 *
 *  - `id`  — un identifiant YouTube. La vidéo ne pèse rien dans le dépôt, et
 *    YouTube se charge du ré-encodage, des débits adaptatifs et des sous-titres.
 *  - `src` — un fichier servi par le site lui-même. Aucun tiers n'est contacté,
 *    aucun cookie, aucune recommandation en fin de lecture ; en contrepartie
 *    le fichier compte dans le gigaoctet de GitHub Pages et dans sa bande
 *    passante.
 *
 * Les deux passent par le même cadre et la même légende : basculer de l'un à
 * l'autre est un changement d'attribut, pas de mise en page.
 *
 * Sans source, le composant affiche honnêtement que l'animation n'est pas
 * encore produite plutôt que de laisser un trou : c'est la règle maison — on ne
 * maquille jamais un manque.
 *
 * @param {string}  [id]     Identifiant YouTube de la vidéo.
 * @param {string}  [src]    URL d'un fichier vidéo servi par le site.
 * @param {string}  title    Titre de l'animation (obligatoire — sert de nom
 *                           accessible à l'iframe).
 * @param {string}  [ref]    Repère du plan de production, ex. « A4 — §1.5 ».
 * @param {string}  [poster] Vignette locale ; à défaut, celle de YouTube.
 * @param {string}  [ratio]  Format de la source, ex. « 1200 / 1256 ». Le lecteur
 *                           YouTube inscrit toujours la vidéo *dans* le cadre
 *                           qu'on lui donne : un format faux ne déforme rien,
 *                           il ajoute des bandes noires. C'est donc à l'appelant
 *                           de déclarer le format réel du rendu.
 */
export function Animation({ id, src, title, reference, poster, ratio = "16 / 9", style, ...rest }) {
  const [playing, setPlaying] = React.useState(false);

  // Une vidéo verticale occupée sur toute la largeur de la colonne de texte
  // dépasserait la hauteur de l'écran : on la borne. Le seuil est large — un
  // rendu carré (1:1) compte déjà comme vertical de ce point de vue.
  const [num, den] = String(ratio).split("/");
  const ratioValue = den ? Number(num) / Number(den) : Number(num);
  const vertical = Number.isFinite(ratioValue) && ratioValue < 1.2;

  const frame = {
    position: "relative",
    aspectRatio: ratio,
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
    background: "var(--ink-900)",
    border: "1px solid var(--border-subtle)",
  };

  const legend = (
    <figcaption
      style={{
        marginTop: "var(--sp-2)",
        font: "var(--type-code)",
        fontSize: 12,
        color: "var(--text-muted)",
        lineHeight: 1.5,
      }}
    >
      {reference && (
        <strong style={{ color: "var(--text-body)", fontWeight: "var(--fw-semibold)" }}>
          {reference} —{" "}
        </strong>
      )}
      {title}
    </figcaption>
  );

  // Un format vertical se lit aussi bien à 420 px de large, et le cadre est
  // centré dans sa colonne : borné mais collé à gauche, il laisserait à droite
  // un vide qui se lit comme un défaut de mise en page.
  //
  // `marginBlock` / `marginInline` plutôt que le raccourci `margin` : mêler un
  // raccourci et une propriété détaillée dans un même style en ligne fait
  // effacer par React les côtés que le raccourci ne nomme pas.
  const bounds = {
    marginBlock: 0,
    marginInline: "auto",
    ...(vertical ? { maxWidth: "min(100%, 420px)" } : null),
  };

  // Fichier servi par le site : la balise native suffit. `preload="metadata"`
  // ne télécharge que l'en-tête tant que personne n'a cliqué — sans quoi une
  // page portant quatre animations tirerait soixante mégaoctets à l'ouverture.
  if (src) {
    return (
      <figure className="sm-block" style={{ ...bounds, ...style }} {...rest}>
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          style={{ ...frame, display: "block", width: "100%" }}
        >
          {/* Le repli n'arrive qu'aux navigateurs sans <video> ; il vaut mieux
              qu'un cadre noir muet. */}
          <a href={src}>Télécharger l'animation : {title}</a>
        </video>
        {legend}
      </figure>
    );
  }

  if (!id) {
    return (
      <figure className="sm-block" style={{ ...bounds, ...style }} {...rest}>
        <div
          style={{
            ...frame,
            background: "var(--bg-subtle)",
            borderStyle: "dashed",
            borderColor: "var(--border-strong)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--sp-2)",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "var(--sp-6)",
          }}
        >
          <span style={{ font: "var(--type-code)", color: "var(--text-faint)" }}>
            [ animation à produire ]
          </span>
          <span style={{ font: "var(--type-small)", fontSize: 13, color: "var(--text-muted)", maxWidth: "48ch" }}>
            {title}
          </span>
        </div>
        {legend}
      </figure>
    );
  }

  // `maxresdefault` est toujours recadrée en 16/9 : sur une source verticale
  // elle amputerait la façade. `oardefault` — *original aspect ratio* — rend la
  // vignette au format du tournage (mesuré : 1080×1130 pour un Short 1200×1256).
  const thumb = poster || `https://i.ytimg.com/vi/${id}/${vertical ? "oardefault" : "maxresdefault"}.jpg`;

  return (
    <figure className="sm-block" style={{ ...bounds, ...style }} {...rest}>
      <div style={frame}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Lire l'animation : ${title}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              padding: 0,
              border: 0,
              cursor: "pointer",
              background: `center / cover no-repeat url("${thumb}")`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 62,
                height: 62,
                borderRadius: "var(--radius-pill)",
                background: "var(--teal-400)",
                boxShadow: "var(--shadow-3)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--ink-900)" aria-hidden="true">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            </span>
          </button>
        )}
      </div>
      {legend}
    </figure>
  );
}
