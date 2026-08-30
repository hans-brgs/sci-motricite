import React from "react";

/**
 * Quiz d'entraînement de fin de chapitre.
 *
 * Différence de fond avec le `<Reveal>` des sections : celui-ci corrige une
 * question à la fois, sans enjeu. Le quiz de chapitre demande de **répondre à
 * tout avant de voir quoi que ce soit**, puis rend un score — c'est ce qui en
 * fait un exercice de révision plutôt qu'une lecture accompagnée.
 *
 * Le design system fournit un `<Quiz>` à correction immédiate ; on le garde
 * pour une question isolée dans le fil du texte. Ici la correction est pilotée
 * par l'ensemble, d'où ces composants.
 *
 * Rien n'est envoyé nulle part et rien n'est conservé : le score vit dans la
 * page, le temps de la visite. Ces questions sont un entraînement — elles ne
 * sont pas les questions de l'examen.
 */

const ROLE_OPTION = "quiz-option";
const ROLE_EXPLANATION = "quiz-explanation";

/* --- Une proposition de réponse ------------------------------------------ */

export function QuizOption({ children }) {
  return <>{children}</>;
}
QuizOption.__role = ROLE_OPTION;

/* --- La justification, révélée après correction --------------------------- */

export function QuizExplanation({ children }) {
  return <>{children}</>;
}
QuizExplanation.__role = ROLE_EXPLANATION;

/* --- Une question --------------------------------------------------------- */

const hasRole = (child, role) =>
  React.isValidElement(child) && child.type && child.type.__role === role;

export function QuizItem({
  question,
  renvoi,
  href,
  children,
  // injectés par QuizSet
  number,
  picked,
  onPick,
  submitted,
}) {
  const kids = React.Children.toArray(children);
  const options = kids.filter((c) => hasRole(c, ROLE_OPTION));
  const explanation = kids.find((c) => hasRole(c, ROLE_EXPLANATION));
  const correctIndex = options.findIndex((o) => o.props.correct);
  const answered = picked !== null && picked !== undefined;
  const right = submitted && picked === correctIndex;

  return (
    <li
      style={{
        listStyle: "none",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        background: "var(--surface-card)",
        padding: "var(--sp-5)",
      }}
    >
      <div style={{ display: "flex", gap: "var(--sp-3)", marginBottom: "var(--sp-4)" }}>
        <span
          style={{
            font: "var(--type-code)",
            color: submitted
              ? right
                ? "var(--status-success)"
                : "var(--status-danger)"
              : "var(--accent-strong)",
            fontWeight: "var(--fw-semibold)",
            flex: "0 0 auto",
          }}
        >
          {number}.
        </span>
        <span
          style={{
            flex: 1,
            font: "var(--type-small)",
            fontWeight: "var(--fw-medium)",
            color: "var(--text-title)",
          }}
        >
          {question}
        </span>
      </div>

      <div role="radiogroup" aria-label={question} style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
        {options.map((option, i) => {
          const chosen = picked === i;
          const good = i === correctIndex;
          // Après correction, on éclaire la bonne réponse et, si elle diffère,
          // celle qui a été choisie : le lecteur voit son erreur ET la cible.
          const reveal = submitted && (chosen || good);
          const border = reveal
            ? good
              ? "var(--status-success)"
              : "var(--status-danger)"
            : chosen
              ? "var(--accent-strong)"
              : "var(--border-default)";
          const background = reveal
            ? good
              ? "var(--status-success-soft)"
              : "var(--status-danger-soft)"
            : chosen
              ? "var(--accent-soft)"
              : "transparent";

          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={chosen}
              disabled={submitted}
              onClick={() => onPick(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--sp-3)",
                textAlign: "left",
                padding: "10px var(--sp-4)",
                border: `1px solid ${border}`,
                background,
                borderRadius: "var(--radius-sm)",
                cursor: submitted ? "default" : "pointer",
                font: "var(--type-small)",
                color: "var(--text-body)",
                transition: "var(--transition-control)",
              }}
            >
              <span
                style={{
                  font: "var(--type-code)",
                  fontSize: 11,
                  color: "var(--text-faint)",
                  width: 14,
                  flex: "0 0 auto",
                }}
              >
                {String.fromCharCode(97 + i)}
              </span>
              <span style={{ flex: 1 }}>{option.props.children}</span>
              {reveal && (
                <span
                  style={{
                    font: "var(--type-code)",
                    fontSize: 11,
                    fontWeight: "var(--fw-semibold)",
                    color: good ? "var(--status-success)" : "var(--status-danger)",
                    flex: "0 0 auto",
                  }}
                >
                  {good ? "correct" : "incorrect"}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {submitted && (explanation || href) && (
        <div
          style={{
            marginTop: "var(--sp-4)",
            paddingTop: "var(--sp-3)",
            borderTop: "1px solid var(--border-subtle)",
            font: "var(--type-small)",
            color: "var(--text-body)",
          }}
        >
          {explanation}
          {href && (
            <div style={{ marginTop: "var(--sp-2)", font: "var(--type-code)", fontSize: 12 }}>
              <a href={href}>Relire la section {renvoi} →</a>
            </div>
          )}
        </div>
      )}

      {!submitted && !answered && (
        <div
          style={{
            marginTop: "var(--sp-3)",
            font: "var(--type-code)",
            fontSize: 11,
            color: "var(--text-faint)",
          }}
        >
          sans réponse
        </div>
      )}
    </li>
  );
}

/* --- L'ensemble ----------------------------------------------------------- */

export function QuizSet({ children, style, ...rest }) {
  const items = React.Children.toArray(children).filter((c) => React.isValidElement(c));
  const [picks, setPicks] = React.useState(() => items.map(() => null));
  const [submitted, setSubmitted] = React.useState(false);
  const headingRef = React.useRef(null);

  const answered = picks.filter((p) => p !== null).length;
  const complete = answered === items.length;

  const score = items.reduce((total, item, i) => {
    const options = React.Children.toArray(item.props.children).filter((c) =>
      hasRole(c, ROLE_OPTION)
    );
    const correctIndex = options.findIndex((o) => o.props.correct);
    return total + (picks[i] === correctIndex ? 1 : 0);
  }, 0);

  const pick = (i, value) =>
    setPicks((current) => current.map((v, j) => (j === i ? value : v)));

  const reset = () => {
    setPicks(items.map(() => null));
    setSubmitted(false);
  };

  const tone =
    score === items.length
      ? "var(--status-success)"
      : score >= Math.ceil(items.length * 0.6)
        ? "var(--accent-strong)"
        : "var(--status-warning)";

  return (
    <section className="sm-block" style={style} {...rest}>
      <div
        ref={headingRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--sp-3)",
          flexWrap: "wrap",
          paddingBottom: "var(--sp-3)",
          marginBottom: "var(--sp-5)",
          borderBottom: "2px solid var(--border-default)",
        }}
      >
        <span
          style={{
            font: "var(--type-eyebrow)",
            letterSpacing: "var(--ls-caps)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            fontWeight: "var(--fw-semibold)",
          }}
        >
          {items.length} questions
        </span>
        <span
          style={{
            marginLeft: "auto",
            font: "var(--type-code)",
            fontSize: 12,
            color: submitted ? tone : "var(--text-faint)",
            fontWeight: submitted ? "var(--fw-semibold)" : "var(--fw-regular)",
          }}
        >
          {submitted ? `score : ${score} / ${items.length}` : `${answered} / ${items.length} répondues`}
        </span>
      </div>

      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--sp-4)" }}>
        {items.map((item, i) =>
          React.cloneElement(item, {
            key: i,
            number: i + 1,
            picked: picks[i],
            onPick: (value) => pick(i, value),
            submitted,
          })
        )}
      </ol>

      <div
        style={{
          marginTop: "var(--sp-6)",
          paddingTop: "var(--sp-5)",
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          gap: "var(--sp-4)",
          flexWrap: "wrap",
        }}
      >
        {!submitted ? (
          <>
            <button
              type="button"
              disabled={!complete}
              onClick={() => setSubmitted(true)}
              style={{
                padding: "10px var(--sp-6)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid transparent",
                background: complete ? "var(--accent-strong)" : "var(--bg-sunken)",
                color: complete ? "#fff" : "var(--text-faint)",
                font: "var(--type-small)",
                fontWeight: "var(--fw-semibold)",
                cursor: complete ? "pointer" : "not-allowed",
                transition: "var(--transition-control)",
              }}
            >
              Vérifier mes réponses
            </button>
            {!complete && (
              <span style={{ font: "var(--type-code)", fontSize: 12, color: "var(--text-muted)" }}>
                il reste {items.length - answered} question
                {items.length - answered > 1 ? "s" : ""} sans réponse
              </span>
            )}
          </>
        ) : (
          <>
            <span
              style={{
                font: "var(--type-stat)",
                fontSize: "var(--fs-2xl)",
                color: tone,
              }}
            >
              {score} / {items.length}
            </span>
            <button
              type="button"
              onClick={reset}
              style={{
                padding: "10px var(--sp-5)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-default)",
                background: "transparent",
                color: "var(--text-body)",
                font: "var(--type-small)",
                fontWeight: "var(--fw-medium)",
                cursor: "pointer",
                transition: "var(--transition-control)",
              }}
            >
              Recommencer
            </button>
            <span
              style={{
                font: "var(--type-code)",
                fontSize: 12,
                color: "var(--text-muted)",
                flexBasis: "100%",
              }}
            >
              Chaque question renvoie vers la section à relire.
            </span>
          </>
        )}
      </div>
    </section>
  );
}
