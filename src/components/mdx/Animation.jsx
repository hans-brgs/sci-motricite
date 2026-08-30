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
 * Sans `id`, le composant affiche honnêtement que l'animation n'est pas encore
 * produite plutôt que de laisser un trou : c'est la règle maison — on ne
 * maquille jamais un manque.
 *
 * @param {string}  [id]     Identifiant YouTube de la vidéo.
 * @param {string}  title    Titre de l'animation (obligatoire — sert de nom
 *                           accessible à l'iframe).
 * @param {string}  [ref]    Repère du plan de production, ex. « A4 — §1.5 ».
 * @param {string}  [poster] Vignette locale ; à défaut, celle de YouTube.
 */
export function Animation({ id, title, reference, poster, ratio = "16 / 9", style, ...rest }) {
  const [playing, setPlaying] = React.useState(false);

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

  if (!id) {
    return (
      <figure className="sm-block" style={{ margin: 0, ...style }} {...rest}>
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

  const thumb = poster || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

  return (
    <figure className="sm-block" style={{ margin: 0, ...style }} {...rest}>
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
