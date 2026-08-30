import React from "react";

export function Quiz({ question, index, options = [], explanation, style, ...rest }) {
  const [picked, setPicked] = React.useState(null);
  const [hover, setHover] = React.useState(null);
  const done = picked !== null;
  return (
    <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", background: "var(--surface-card)", padding: "var(--sp-5)", ...style }} {...rest}>
      <div style={{ display: "flex", gap: "var(--sp-3)", marginBottom: "var(--sp-4)" }}>
        {index && <span style={{ font: "var(--type-code)", color: "var(--accent-strong)", fontWeight: "var(--fw-semibold)" }}>{index}</span>}
        <span style={{ font: "var(--type-small)", fontWeight: "var(--fw-medium)", color: "var(--text-title)" }}>{question}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
        {options.map((o, i) => {
          const chosen = picked === i;
          const reveal = done && (chosen || o.correct);
          const good = o.correct;
          const bd = reveal ? (good ? "var(--status-success)" : "var(--status-danger)") : (hover === i && !done ? "var(--border-strong)" : "var(--border-default)");
          const bg = reveal ? (good ? "var(--status-success-soft)" : "var(--status-danger-soft)") : (hover === i && !done ? "var(--bg-subtle)" : "transparent");
          return (
            <button key={i} disabled={done} onClick={() => setPicked(i)}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{
              display: "flex", alignItems: "center", gap: "var(--sp-3)", textAlign: "left",
              padding: "10px var(--sp-4)", border: `1px solid ${bd}`, background: bg,
              borderRadius: "var(--radius-sm)", cursor: done ? "default" : "pointer",
              font: "var(--type-small)", color: "var(--text-body)", transition: "var(--transition-control)"
            }}>
              <span style={{ font: "var(--type-code)", fontSize: 11, color: "var(--text-faint)", width: 14, flex: "0 0 auto" }}>{String.fromCharCode(97 + i)}</span>
              <span style={{ flex: 1 }}>{o.label}</span>
              {reveal && <span style={{ font: "var(--type-code)", fontSize: 11, fontWeight: "var(--fw-semibold)", color: good ? "var(--status-success)" : "var(--status-danger)" }}>{good ? "correct" : "incorrect"}</span>}
            </button>
          );
        })}
      </div>
      {done && explanation && (
        <div style={{ marginTop: "var(--sp-4)", paddingTop: "var(--sp-3)", borderTop: "1px solid var(--border-subtle)", font: "var(--type-small)", color: "var(--text-body)" }}>{explanation}</div>
      )}
      {done && <button onClick={() => setPicked(null)} style={{ marginTop: "var(--sp-3)", background: "none", border: "none", padding: 0, cursor: "pointer", font: "var(--type-code)", fontSize: 12, color: "var(--text-link)" }}>Réessayer</button>}
    </div>
  );
}
