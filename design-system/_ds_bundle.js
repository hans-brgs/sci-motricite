/* @ds-bundle: {"format":4,"namespace":"MotricitDesignSystem_ea5604","components":[{"name":"Admonition","sourcePath":"components/content/Admonition.jsx"},{"name":"Application","sourcePath":"components/content/Application.jsx"},{"name":"ChapterHeader","sourcePath":"components/content/ChapterHeader.jsx"},{"name":"Checklist","sourcePath":"components/content/Checklist.jsx"},{"name":"CodeBlock","sourcePath":"components/content/CodeBlock.jsx"},{"name":"Definition","sourcePath":"components/content/Definition.jsx"},{"name":"Figure","sourcePath":"components/content/Figure.jsx"},{"name":"FigurePanel","sourcePath":"components/content/FigurePanel.jsx"},{"name":"FurtherReading","sourcePath":"components/content/FurtherReading.jsx"},{"name":"GlossaryBox","sourcePath":"components/content/GlossaryBox.jsx"},{"name":"Quiz","sourcePath":"components/content/Quiz.jsx"},{"name":"Reference","sourcePath":"components/content/Reference.jsx"},{"name":"Reveal","sourcePath":"components/content/Reveal.jsx"},{"name":"SectionLead","sourcePath":"components/content/SectionLead.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Stat","sourcePath":"components/data/Stat.jsx"},{"name":"StepList","sourcePath":"components/data/StepList.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Icon","sourcePath":"components/icons/Icon.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"DocNav","sourcePath":"components/navigation/DocNav.jsx"},{"name":"SidebarNav","sourcePath":"components/navigation/SidebarNav.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"ThemeToggle","sourcePath":"components/navigation/ThemeToggle.jsx"},{"name":"GlowSurface","sourcePath":"components/surfaces/GlowSurface.jsx"}],"sourceHashes":{"components/content/Admonition.jsx":"2b8d40f4fda5","components/content/Application.jsx":"6e01da370dee","components/content/ChapterHeader.jsx":"c156e8643ba1","components/content/Checklist.jsx":"cb7d515b519a","components/content/CodeBlock.jsx":"619fa4159190","components/content/Definition.jsx":"934414db98e9","components/content/Figure.jsx":"58d90458797e","components/content/FigurePanel.jsx":"e5a1bd2379ff","components/content/FurtherReading.jsx":"763ca6c052ae","components/content/GlossaryBox.jsx":"f67ce9684727","components/content/Quiz.jsx":"107a044e101a","components/content/Reference.jsx":"ba1da03c2733","components/content/Reveal.jsx":"cd68af81858c","components/content/SectionLead.jsx":"7b0c70cb51cd","components/core/Badge.jsx":"e3414e1d3309","components/core/Button.jsx":"4125e215bba3","components/core/Card.jsx":"a58e869edf5f","components/core/Tag.jsx":"21793230c657","components/data/Stat.jsx":"cc11420253cf","components/data/StepList.jsx":"5587677b732c","components/forms/Checkbox.jsx":"c328089bba76","components/forms/Input.jsx":"95bd1a7833b5","components/forms/Select.jsx":"40864e5169fa","components/icons/Icon.jsx":"f253f9caa7bc","components/navigation/Breadcrumb.jsx":"05841b58dc29","components/navigation/DocNav.jsx":"adb51ac6f11a","components/navigation/SidebarNav.jsx":"7ea4ca59da8b","components/navigation/Tabs.jsx":"16f4a19d4216","components/navigation/ThemeToggle.jsx":"041fdec8b780","components/surfaces/GlowSurface.jsx":"de6e8f3d57f5","ui_kits/site-cours/App.jsx":"ef6c28f51348","ui_kits/site-cours/Catalog.jsx":"a9264387d0e7","ui_kits/site-cours/Chrome.jsx":"43b329accde1","ui_kits/site-cours/DocPage.jsx":"c80a19c5ddd1","ui_kits/site-cours/Glossary.jsx":"0d6fe4338a89","ui_kits/site-cours/Home.jsx":"44fdd00d9e5b","ui_kits/site-cours/TDPage.jsx":"96240e4a8762","ui_kits/site-cours/data.js":"9e1071f97ab5","ui_kits/site-cours/ds.js":"aadf9dac3bfa"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MotricitDesignSystem_ea5604 = window.MotricitDesignSystem_ea5604 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/Admonition.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const kinds = {
  note: {
    label: "Note",
    color: "var(--teal-600)",
    soft: "var(--accent-soft)"
  },
  attention: {
    label: "Attention",
    color: "var(--status-warning)",
    soft: "var(--status-warning-soft)"
  },
  methode: {
    label: "Méthode",
    color: "var(--ink-600)",
    soft: "var(--bg-sunken)"
  }
};
function Admonition({
  kind = "note",
  title,
  children,
  style,
  ...rest
}) {
  const k = kinds[kind] || kinds.note;
  return /*#__PURE__*/React.createElement("aside", _extends({
    style: {
      background: k.soft,
      borderInlineStart: `3px solid ${k.color}`,
      borderRadius: "0 var(--radius-md) var(--radius-md) 0",
      padding: "var(--sp-4) var(--sp-5)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-eyebrow)",
      letterSpacing: "var(--ls-caps)",
      textTransform: "uppercase",
      color: k.color,
      fontWeight: "var(--fw-semibold)",
      display: "block",
      marginBottom: "var(--sp-2)"
    }
  }, title || k.label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-small)",
      color: "var(--text-body)",
      lineHeight: "var(--lh-normal)"
    }
  }, children));
}
Object.assign(__ds_scope, { Admonition });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Admonition.jsx", error: String((e && e.message) || e) }); }

// components/content/Application.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Application({
  title = "Application",
  subject,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      position: "relative",
      marginTop: "var(--sp-6)",
      border: "1px solid var(--violet-200)",
      borderRadius: "var(--radius-lg)",
      background: "var(--accent-2-soft)",
      padding: "var(--sp-6)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -11,
      insetInlineStart: "var(--sp-5)",
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      padding: "3px 12px",
      borderRadius: "var(--radius-pill)",
      background: "var(--accent-2-strong)",
      color: "#fff",
      font: "var(--type-eyebrow)",
      letterSpacing: "var(--ls-caps)",
      textTransform: "uppercase",
      fontWeight: "var(--fw-semibold)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12
    }
  }, "\uD83C\uDFC3"), title), subject && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-code)",
      fontSize: 12,
      color: "var(--violet-700)",
      marginBottom: "var(--sp-2)"
    }
  }, subject), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-small)",
      color: "var(--text-body)",
      lineHeight: "var(--lh-normal)"
    }
  }, children));
}
Object.assign(__ds_scope, { Application });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Application.jsx", error: String((e && e.message) || e) }); }

// components/content/ChapterHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ChapterHeader({
  breadcrumb,
  title,
  meta,
  actions,
  objectivesLabel = "Objectifs de la section",
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--bg-subtle)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--sp-8)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      background: "var(--rule-gradient)"
    }
  }), breadcrumb && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "var(--sp-4)"
    }
  }, breadcrumb), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-h1)",
      letterSpacing: "var(--ls-tight)",
      color: "var(--text-title)",
      margin: 0,
      maxWidth: "24ch",
      textWrap: "balance"
    }
  }, title), (meta || actions) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-2)",
      flexWrap: "wrap",
      marginTop: "var(--sp-4)"
    }
  }, meta, actions && /*#__PURE__*/React.createElement("span", {
    style: {
      marginInlineStart: "auto",
      display: "flex",
      gap: "var(--sp-2)"
    }
  }, actions)), children && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--sp-6)",
      paddingTop: "var(--sp-5)",
      borderTop: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-2)",
      marginBottom: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: 1
    }
  }, "\uD83C\uDFAF"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-eyebrow)",
      letterSpacing: "var(--ls-caps)",
      textTransform: "uppercase",
      color: "var(--accent-strong)",
      fontWeight: "var(--fw-semibold)"
    }
  }, objectivesLabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-md)",
      lineHeight: 1.6,
      color: "var(--text-body)",
      maxWidth: "var(--measure)"
    }
  }, children)));
}
Object.assign(__ds_scope, { ChapterHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ChapterHeader.jsx", error: String((e && e.message) || e) }); }

// components/content/Checklist.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checklist({
  items = [],
  title = "À la fin de cette section, je dois être capable de…",
  style,
  ...rest
}) {
  const [done, setDone] = React.useState(() => items.map(() => false));
  const count = done.filter(Boolean).length;
  const toggle = i => setDone(d => d.map((v, j) => j === i ? !v : v));
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      background: "var(--bg-subtle)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--sp-5) var(--sp-6)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-2)",
      marginBottom: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: 1
    }
  }, "\u2705"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-eyebrow)",
      letterSpacing: "var(--ls-caps)",
      textTransform: "uppercase",
      color: "var(--status-success)",
      fontWeight: "var(--fw-semibold)"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      font: "var(--type-code)",
      fontSize: 11,
      color: "var(--text-faint)"
    }
  }, count, " / ", items.length)), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    onClick: () => toggle(i),
    style: {
      display: "flex",
      gap: "var(--sp-3)",
      alignItems: "flex-start",
      cursor: "pointer",
      padding: "10px 0",
      borderTop: i ? "1px solid var(--border-subtle)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 17,
      height: 17,
      flex: "0 0 auto",
      marginTop: 1,
      borderRadius: "var(--radius-xs)",
      border: `1.5px solid ${done[i] ? "var(--status-success)" : "var(--border-strong)"}`,
      background: done[i] ? "var(--status-success)" : "transparent",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "var(--transition-control)"
    }
  }, done[i] && /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-small)",
      color: done[i] ? "var(--text-faint)" : "var(--text-body)",
      textDecoration: done[i] ? "line-through" : "none"
    }
  }, it)))));
}
Object.assign(__ds_scope, { Checklist });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Checklist.jsx", error: String((e && e.message) || e) }); }

// components/content/CodeBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CodeBlock({
  title,
  language = "text",
  code = "",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      border: "1px solid var(--border-default)",
      ...style
    }
  }, rest), (title || language) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px var(--sp-4)",
      background: "var(--bg-subtle)",
      borderBottom: "1px solid var(--border-subtle)",
      font: "var(--type-code)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, title), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)",
      letterSpacing: "var(--ls-wide)"
    }
  }, language)), /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      padding: "var(--sp-4)",
      background: "var(--surface-code)",
      color: "var(--ink-100)",
      font: "var(--type-code)",
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("code", null, code)));
}
Object.assign(__ds_scope, { CodeBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/CodeBlock.jsx", error: String((e && e.message) || e) }); }

// components/content/Definition.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Definition({
  term,
  lang,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("dl", _extends({
    style: {
      margin: 0,
      padding: "var(--sp-4) var(--sp-5)",
      background: "var(--bg-subtle)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("dt", {
    style: {
      font: "var(--type-code)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--violet-600)",
      letterSpacing: "var(--ls-wide)"
    }
  }, term, lang && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)",
      fontWeight: "var(--fw-regular)"
    }
  }, " \xB7 ", lang)), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: "6px 0 0",
      font: "var(--type-small)",
      color: "var(--text-body)"
    }
  }, children));
}
Object.assign(__ds_scope, { Definition });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Definition.jsx", error: String((e && e.message) || e) }); }

// components/content/Figure.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Figure({
  src,
  alt = "",
  caption,
  number,
  source,
  ratio = "16 / 9",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      margin: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      background: "var(--bg-subtle)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-code)",
      color: "var(--text-faint)"
    }
  }, "[ figure \xE0 ins\xE9rer ]")), (caption || number || source) && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: "var(--sp-2)",
      font: "var(--type-code)",
      color: "var(--text-muted)",
      lineHeight: 1.5
    }
  }, number && /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-body)",
      fontWeight: "var(--fw-semibold)"
    }
  }, "Fig. ", number, " \u2014 "), caption, source && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      color: "var(--text-faint)"
    }
  }, "Source : ", source)));
}
Object.assign(__ds_scope, { Figure });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Figure.jsx", error: String((e && e.message) || e) }); }

// components/content/FigurePanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function FigurePanel({
  src,
  alt = "",
  title,
  kicker,
  legend = [],
  number,
  caption,
  source,
  ratio = "16 / 10",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      margin: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    "data-theme": "dark",
    style: {
      background: "radial-gradient(60% 80% at 10% 0%,rgba(21,184,167,.10) 0%,rgba(21,184,167,0) 70%),var(--brand-night)",
      border: "1px solid rgba(234,240,247,.08)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--sp-6)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-4)"
    }
  }, (title || kicker) && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: 28,
      height: 2,
      background: "var(--brand-teal)",
      marginBottom: 10
    }
  }), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--fw-semibold)",
      fontSize: "var(--fs-lg)",
      color: "var(--ink-50)"
    }
  }, title), kicker && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-eyebrow)",
      fontSize: 13,
      textTransform: "uppercase",
      letterSpacing: "var(--ls-caps)",
      color: "var(--ink-400)",
      marginTop: 4
    }
  }, kicker)), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "contain"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-code)",
      color: "var(--ink-500)"
    }
  }, "[ figure \xE0 ins\xE9rer ]")), legend.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-6)",
      borderTop: "1px solid rgba(234,240,247,.08)",
      paddingTop: "var(--sp-3)"
    }
  }, legend.map(l => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      font: "var(--type-code)",
      fontSize: 12,
      letterSpacing: "var(--ls-wide)",
      textTransform: "uppercase",
      color: "var(--ink-300)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--brand-teal)"
    }
  }), l)))), (caption || number || source) && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: "var(--sp-2)",
      font: "var(--type-code)",
      color: "var(--text-muted)",
      lineHeight: 1.5
    }
  }, number && /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-body)",
      fontWeight: "var(--fw-semibold)"
    }
  }, "Figure ", number, " \u2014 "), caption, source && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      color: "var(--text-faint)"
    }
  }, "Source : ", source)));
}
Object.assign(__ds_scope, { FigurePanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/FigurePanel.jsx", error: String((e && e.message) || e) }); }

// components/content/FurtherReading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function FurtherReading({
  title = "Pour aller plus loin",
  note = "hors programme, non évalué",
  defaultOpen = false,
  children,
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      border: `1px dashed ${hover || open ? "var(--support-blue)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-md)",
      background: "transparent",
      transition: "border-color var(--dur-fast) var(--ease-standard)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-2)",
      textAlign: "left",
      padding: "var(--sp-3) var(--sp-5)",
      background: "none",
      border: "none",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      lineHeight: 1
    }
  }, "\uD83D\uDD0E"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-eyebrow)",
      letterSpacing: "var(--ls-caps)",
      textTransform: "uppercase",
      color: "var(--support-blue)",
      fontWeight: "var(--fw-semibold)"
    }
  }, title), note && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-code)",
      fontSize: 11,
      color: "var(--text-faint)",
      fontStyle: "italic"
    }
  }, "\u2014 ", note), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      font: "var(--type-code)",
      fontSize: 11,
      color: "var(--text-faint)"
    }
  }, open ? "replier" : "déplier")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateRows: open ? "1fr" : "0fr",
      transition: "grid-template-rows var(--dur-slow) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--sp-5) var(--sp-5)",
      font: "var(--type-small)",
      color: "var(--text-muted)",
      lineHeight: "var(--lh-normal)"
    }
  }, children))));
}
Object.assign(__ds_scope, { FurtherReading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/FurtherReading.jsx", error: String((e && e.message) || e) }); }

// components/content/GlossaryBox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function GlossaryBox({
  entries = [],
  title = "Glossaire de la section",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-2)",
      paddingBottom: "var(--sp-3)",
      borderBottom: "2px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: 1
    }
  }, "\uD83D\uDCD6"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-eyebrow)",
      letterSpacing: "var(--ls-caps)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      fontWeight: "var(--fw-semibold)"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      font: "var(--type-code)",
      fontSize: 11,
      color: "var(--text-faint)"
    }
  }, entries.length, " termes")), /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0
    }
  }, entries.map(e => /*#__PURE__*/React.createElement("div", {
    key: e.term,
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(140px,26%) 1fr",
      gap: "var(--sp-5)",
      padding: "var(--sp-3) 0",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      font: "var(--type-code)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--accent-2-strong)",
      letterSpacing: "var(--ls-wide)"
    }
  }, e.term), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      font: "var(--type-small)",
      color: "var(--text-body)"
    }
  }, e.def)))));
}
Object.assign(__ds_scope, { GlossaryBox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/GlossaryBox.jsx", error: String((e && e.message) || e) }); }

// components/content/Quiz.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Quiz({
  question,
  index,
  options = [],
  explanation,
  style,
  ...rest
}) {
  const [picked, setPicked] = React.useState(null);
  const [hover, setHover] = React.useState(null);
  const done = picked !== null;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      background: "var(--surface-card)",
      padding: "var(--sp-5)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-3)",
      marginBottom: "var(--sp-4)"
    }
  }, index && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-code)",
      color: "var(--accent-strong)",
      fontWeight: "var(--fw-semibold)"
    }
  }, index), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-small)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-title)"
    }
  }, question)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-2)"
    }
  }, options.map((o, i) => {
    const chosen = picked === i;
    const reveal = done && (chosen || o.correct);
    const good = o.correct;
    const bd = reveal ? good ? "var(--status-success)" : "var(--status-danger)" : hover === i && !done ? "var(--border-strong)" : "var(--border-default)";
    const bg = reveal ? good ? "var(--status-success-soft)" : "var(--status-danger-soft)" : hover === i && !done ? "var(--bg-subtle)" : "transparent";
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      disabled: done,
      onClick: () => setPicked(i),
      onMouseEnter: () => setHover(i),
      onMouseLeave: () => setHover(null),
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--sp-3)",
        textAlign: "left",
        padding: "10px var(--sp-4)",
        border: `1px solid ${bd}`,
        background: bg,
        borderRadius: "var(--radius-sm)",
        cursor: done ? "default" : "pointer",
        font: "var(--type-small)",
        color: "var(--text-body)",
        transition: "var(--transition-control)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-code)",
        fontSize: 11,
        color: "var(--text-faint)",
        width: 14,
        flex: "0 0 auto"
      }
    }, String.fromCharCode(97 + i)), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, o.label), reveal && /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-code)",
        fontSize: 11,
        fontWeight: "var(--fw-semibold)",
        color: good ? "var(--status-success)" : "var(--status-danger)"
      }
    }, good ? "correct" : "incorrect"));
  })), done && explanation && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--sp-4)",
      paddingTop: "var(--sp-3)",
      borderTop: "1px solid var(--border-subtle)",
      font: "var(--type-small)",
      color: "var(--text-body)"
    }
  }, explanation), done && /*#__PURE__*/React.createElement("button", {
    onClick: () => setPicked(null),
    style: {
      marginTop: "var(--sp-3)",
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer",
      font: "var(--type-code)",
      fontSize: 12,
      color: "var(--text-link)"
    }
  }, "R\xE9essayer"));
}
Object.assign(__ds_scope, { Quiz });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Quiz.jsx", error: String((e && e.message) || e) }); }

// components/content/Reference.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Reference({
  authors,
  year,
  title,
  source,
  href,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      gap: "var(--sp-3)",
      padding: "var(--sp-3) 0",
      borderBottom: "1px solid var(--border-subtle)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-code)",
      color: "var(--text-faint)",
      flex: "0 0 auto"
    }
  }, year), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-small)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: "var(--fw-medium)",
      color: "var(--text-title)"
    }
  }, authors), " — ", href ? /*#__PURE__*/React.createElement("a", {
    href: href,
    target: "_blank",
    rel: "noreferrer",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      color: "var(--text-link)",
      textDecoration: hover ? "underline" : "none"
    }
  }, title) : title, source && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)",
      fontStyle: "italic"
    }
  }, ", ", source)));
}
Object.assign(__ds_scope, { Reference });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Reference.jsx", error: String((e && e.message) || e) }); }

// components/content/Reveal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Reveal({
  question,
  index,
  children,
  tone = "teal",
  defaultOpen = false,
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [hover, setHover] = React.useState(false);
  const color = tone === "violet" ? "var(--accent-2-strong)" : "var(--accent-strong)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      border: `1px solid ${open || hover ? "var(--border-default)" : "var(--border-subtle)"}`,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-card)",
      overflow: "hidden",
      transition: "border-color var(--dur-fast) var(--ease-standard)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "flex-start",
      gap: "var(--sp-3)",
      textAlign: "left",
      padding: "var(--sp-4) var(--sp-5)",
      background: hover ? "var(--bg-subtle)" : "transparent",
      border: "none",
      cursor: "pointer",
      font: "var(--type-small)",
      color: "var(--text-title)",
      transition: "background-color var(--dur-fast) var(--ease-standard)"
    }
  }, index && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-code)",
      color,
      fontWeight: "var(--fw-semibold)",
      flex: "0 0 auto",
      paddingTop: 1
    }
  }, index), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontWeight: "var(--fw-medium)"
    }
  }, question), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 auto",
      display: "inline-flex",
      color: "var(--text-faint)",
      transform: open ? "rotate(90deg)" : "none",
      transition: "transform var(--dur-base) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "9 18 15 12 9 6"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateRows: open ? "1fr" : "0fr",
      transition: "grid-template-rows var(--dur-slow) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--sp-5) var(--sp-5)",
      marginInlineStart: index ? "var(--sp-6)" : 0,
      font: "var(--type-small)",
      color: "var(--text-body)",
      borderTop: "1px solid var(--border-subtle)",
      paddingTop: "var(--sp-4)"
    }
  }, children))));
}
Object.assign(__ds_scope, { Reveal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Reveal.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionLead.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionLead({
  label = "Objectifs de la section",
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      position: "relative",
      paddingTop: "var(--sp-5)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 56,
      height: 3,
      background: "var(--rule-gradient)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-2)",
      marginBottom: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: 1
    }
  }, "\uD83C\uDFAF"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-eyebrow)",
      letterSpacing: "var(--ls-caps)",
      textTransform: "uppercase",
      color: "var(--accent-strong)",
      fontWeight: "var(--fw-semibold)"
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-lg)",
      lineHeight: 1.55,
      fontWeight: "var(--fw-light)",
      color: "var(--text-body)",
      maxWidth: "var(--measure)"
    }
  }, children));
}
Object.assign(__ds_scope, { SectionLead });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionLead.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = ["teal", "violet", "neutral", "success", "warning", "danger"];
function Badge({
  tone = "teal",
  mono = true,
  children,
  style,
  ...rest
}) {
  const t = tones.includes(tone) ? tone : "teal";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "3px 9px",
      borderRadius: "var(--radius-pill)",
      background: `var(--badge-${t}-bg)`,
      color: `var(--badge-${t}-fg)`,
      border: `1px solid var(--badge-${t}-bd)`,
      fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
      fontSize: "var(--fs-xs)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-wide)",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--sp-2)",
  font: "var(--type-small)",
  fontWeight: "var(--fw-medium)",
  letterSpacing: "var(--ls-normal)",
  borderRadius: "var(--radius-sm)",
  border: "1px solid transparent",
  cursor: "pointer",
  textDecoration: "none",
  whiteSpace: "nowrap",
  transition: "var(--transition-control), transform var(--dur-instant) var(--ease-standard)"
};
const sizes = {
  sm: {
    padding: "6px 12px",
    fontSize: "var(--fs-xs)"
  },
  md: {
    padding: "9px 16px",
    fontSize: "var(--fs-sm)"
  },
  lg: {
    padding: "13px 22px",
    fontSize: "var(--fs-base)"
  }
};
const variants = {
  primary: {
    background: "var(--accent)",
    color: "#04302b",
    borderColor: "var(--accent)"
  },
  secondary: {
    background: "var(--accent-2)",
    color: "#1e0a35",
    borderColor: "var(--accent-2)"
  },
  outline: {
    background: "transparent",
    color: "var(--text-title)",
    borderColor: "var(--border-default)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-link)",
    borderColor: "transparent"
  },
  danger: {
    background: "var(--status-danger)",
    color: "#fff",
    borderColor: "var(--status-danger)"
  }
};
const hovers = {
  primary: {
    background: "var(--teal-500)",
    borderColor: "var(--teal-500)"
  },
  secondary: {
    background: "var(--violet-500)",
    borderColor: "var(--violet-500)"
  },
  outline: {
    background: "var(--bg-subtle)",
    borderColor: "var(--border-strong)"
  },
  ghost: {
    background: "var(--accent-soft)"
  },
  danger: {
    filter: "brightness(.94)"
  }
};
function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  full = false,
  href,
  iconLeft,
  iconRight,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const Tag = href ? "a" : "button";
  const css = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...(hover && !disabled ? hovers[variant] : null),
    ...(active && !disabled ? {
      transform: "translateY(1px)"
    } : null),
    ...(full ? {
      width: "100%"
    } : null),
    ...(disabled ? {
      opacity: .45,
      cursor: "not-allowed"
    } : null),
    ...style
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    disabled: !href && disabled ? true : undefined,
    style: css,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false)
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  title,
  eyebrow,
  meta,
  footer,
  accent = "none",
  interactive = false,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const accentColor = accent === "teal" ? "var(--accent)" : accent === "violet" ? "var(--accent-2)" : null;
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      padding: "var(--sp-5)",
      boxShadow: interactive && hover ? "var(--shadow-3)" : "var(--shadow-1)",
      transform: interactive && hover ? "translateY(-2px)" : "none",
      transition: "box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)",
      borderColor: interactive && hover ? "var(--border-default)" : "var(--border-subtle)",
      cursor: interactive ? "pointer" : "default",
      ...style
    }
  }, rest), accentColor && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      insetInlineStart: 0,
      top: 0,
      bottom: 0,
      width: "3px",
      background: accentColor
    }
  }), eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-eyebrow)",
      letterSpacing: "var(--ls-caps)",
      textTransform: "uppercase",
      color: "var(--text-faint)",
      marginBottom: "var(--sp-2)"
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-h3)",
      fontSize: "var(--fs-lg)",
      color: "var(--text-title)",
      margin: "0 0 var(--sp-2)"
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-small)",
      color: "var(--text-body)"
    }
  }, children), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-2)",
      marginTop: "var(--sp-4)",
      flexWrap: "wrap"
    }
  }, meta), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--sp-4)",
      paddingTop: "var(--sp-3)",
      borderTop: "1px solid var(--border-subtle)",
      font: "var(--type-code)",
      color: "var(--text-faint)"
    }
  }, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  children,
  onRemove,
  active = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--sp-2)",
      padding: "4px 10px",
      borderRadius: "var(--radius-xs)",
      border: `1px solid ${active ? "var(--badge-teal-bd)" : "var(--border-default)"}`,
      background: active ? "var(--badge-teal-bg)" : hover ? "var(--bg-subtle)" : "transparent",
      color: active ? "var(--badge-teal-fg)" : "var(--text-muted)",
      font: "var(--type-code)",
      cursor: onRemove || rest.onClick ? "pointer" : "default",
      transition: "var(--transition-control)",
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      opacity: .6,
      fontSize: "var(--fs-sm)",
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Stat({
  label,
  value,
  unit,
  tone = "teal",
  trend,
  style,
  ...rest
}) {
  const color = tone === "violet" ? "var(--accent-2)" : "var(--accent)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-2)",
      padding: "var(--sp-4) var(--sp-5)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-eyebrow)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-caps)",
      color: "var(--text-faint)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-stat)",
      fontSize: "var(--fs-3xl)",
      color,
      fontWeight: "var(--fw-medium)"
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-code)",
      color: "var(--text-muted)"
    }
  }, unit)), trend && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-code)",
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, trend));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Stat.jsx", error: String((e && e.message) || e) }); }

// components/data/StepList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function StepList({
  steps = [],
  orientation = "horizontal",
  style,
  ...rest
}) {
  const horiz = orientation === "horizontal";
  return /*#__PURE__*/React.createElement("ol", _extends({
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: horiz ? "grid" : "flex",
      flexDirection: horiz ? undefined : "column",
      gridTemplateColumns: horiz ? `repeat(${steps.length},1fr)` : undefined,
      gap: "var(--sp-4)",
      ...style
    }
  }, rest), steps.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      paddingTop: "var(--sp-4)",
      borderTop: "2px solid",
      borderImage: i % 2 ? "linear-gradient(90deg,var(--accent-2),var(--accent-2)) 1" : "linear-gradient(90deg,var(--accent),var(--accent)) 1"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-code)",
      fontSize: "var(--fs-lg)",
      fontWeight: "var(--fw-medium)",
      color: i % 2 ? "var(--accent-2)" : "var(--accent)"
    }
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-eyebrow)",
      fontSize: "var(--fs-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-caps)",
      color: "var(--text-title)",
      fontWeight: "var(--fw-semibold)",
      margin: "6px 0 4px"
    }
  }, s.label), s.detail && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-small)",
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, s.detail))));
}
Object.assign(__ds_scope, { StepList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StepList.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  disabled,
  style,
  ...rest
}) {
  const controlled = checked !== undefined;
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = controlled ? checked : inner;
  const toggle = () => {
    if (disabled) return;
    if (!controlled) setInner(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    onClick: toggle,
    style: {
      display: "flex",
      gap: "var(--sp-3)",
      alignItems: "flex-start",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .5 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      flex: "0 0 auto",
      marginTop: 2,
      borderRadius: "var(--radius-xs)",
      border: `1.5px solid ${on ? "var(--accent)" : "var(--border-strong)"}`,
      background: on ? "var(--accent)" : "var(--surface-card)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "var(--transition-control)"
    }
  }, on && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#04302b",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--type-small)",
      color: "var(--text-title)"
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--type-code)",
      color: "var(--text-faint)",
      marginTop: 2
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  prefix,
  suffix,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const uid = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      display: "block",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--type-small)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-title)",
      marginBottom: "6px"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-2)",
      padding: "0 var(--sp-3)",
      background: "var(--surface-card)",
      border: `1px solid ${error ? "var(--status-danger)" : focus ? "var(--accent)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-sm)",
      boxShadow: focus ? "var(--focus-ring)" : "none",
      transition: "var(--transition-control)"
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)",
      display: "inline-flex"
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: uid,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      font: "var(--type-small)",
      color: "var(--text-title)",
      padding: "9px 0",
      minWidth: 0
    }
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)",
      font: "var(--type-code)"
    }
  }, suffix)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--type-code)",
      color: error ? "var(--status-danger)" : "var(--text-faint)",
      marginTop: "6px"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  hint,
  options = [],
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const uid = React.useId();
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      display: "block",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--type-small)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-title)",
      marginBottom: "6px"
    }
  }, label), /*#__PURE__*/React.createElement("select", _extends({
    id: uid,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      appearance: "none",
      padding: "9px var(--sp-8) 9px var(--sp-3)",
      background: "var(--surface-card)",
      backgroundImage: "linear-gradient(45deg,transparent 50%,var(--text-faint) 50%),linear-gradient(135deg,var(--text-faint) 50%,transparent 50%)",
      backgroundPosition: "calc(100% - 18px) 51%,calc(100% - 13px) 51%",
      backgroundSize: "5px 5px,5px 5px",
      backgroundRepeat: "no-repeat",
      border: `1px solid ${focus ? "var(--accent)" : "var(--border-default)"}`,
      boxShadow: focus ? "var(--focus-ring)" : "none",
      borderRadius: "var(--radius-sm)",
      font: "var(--type-small)",
      color: "var(--text-title)",
      outline: "none",
      transition: "var(--transition-control)"
    }
  }, rest), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--type-code)",
      color: "var(--text-faint)",
      marginTop: "6px"
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/icons/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Wrapper around the Lucide icon set (loaded from CDN as `window.lucide`). */
function Icon({
  name,
  size = 18,
  strokeWidth = 1.75,
  color = "currentColor",
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const draw = () => {
      const L = typeof window !== "undefined" && window.lucide;
      const node = ref.current;
      if (!L || !node) return false;
      node.innerHTML = "";
      const el = document.createElement("i");
      el.setAttribute("data-lucide", name);
      node.appendChild(el);
      L.createIcons({
        root: node,
        attrs: {
          width: size,
          height: size,
          "stroke-width": strokeWidth,
          stroke: color
        }
      });
      return true;
    };
    if (draw()) return;
    const t = setInterval(() => {
      if (draw()) clearInterval(t);
    }, 120);
    return () => clearInterval(t);
  }, [name, size, strokeWidth, color]);
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: ref,
    "aria-hidden": "true",
    style: {
      display: "inline-flex",
      width: size,
      height: size,
      flex: "0 0 auto",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/Icon.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Breadcrumb({
  items = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-2)",
      flexWrap: "wrap",
      font: "var(--type-code)",
      color: "var(--text-faint)",
      ...style
    }
  }, rest), items.map((it, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5
    }
  }, "/"), it.href && i < items.length - 1 ? /*#__PURE__*/React.createElement("a", {
    href: it.href,
    style: {
      color: "var(--text-muted)",
      textDecoration: "none"
    }
  }, it.label) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: i === items.length - 1 ? "var(--text-body)" : "var(--text-muted)"
    }
  }, it.label))));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/DocNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Side({
  dir,
  label,
  title,
  href
}) {
  const [hover, setHover] = React.useState(false);
  const prev = dir === "prev";
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      flex: 1,
      display: "block",
      padding: "var(--sp-4)",
      textDecoration: "none",
      border: `1px solid ${hover ? "var(--accent)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-md)",
      textAlign: prev ? "left" : "right",
      background: hover ? "var(--accent-soft)" : "transparent",
      transition: "var(--transition-control)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--type-code)",
      color: "var(--text-faint)",
      marginBottom: "6px"
    }
  }, prev ? "← " : "", label, prev ? "" : " →"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--type-small)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-link)"
    }
  }, title));
}
function DocNav({
  prev,
  next,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: "flex",
      gap: "var(--sp-4)",
      ...style
    }
  }, rest), prev ? /*#__PURE__*/React.createElement(Side, {
    dir: "prev",
    label: prev.label || "Précédent",
    title: prev.title,
    href: prev.href || "#"
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), next ? /*#__PURE__*/React.createElement(Side, {
    dir: "next",
    label: next.label || "Suivant",
    title: next.title,
    href: next.href || "#"
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }));
}
Object.assign(__ds_scope, { DocNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/DocNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SidebarNav({
  sections = [],
  activeId,
  onSelect,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      font: "var(--type-small)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-6)",
      ...style
    }
  }, rest), sections.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-eyebrow)",
      letterSpacing: "var(--ls-caps)",
      textTransform: "uppercase",
      color: "var(--text-faint)",
      padding: "0 var(--sp-3)",
      marginBottom: "var(--sp-2)"
    }
  }, s.label), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: "1px"
    }
  }, s.items.map(it => {
    const on = it.id === activeId;
    return /*#__PURE__*/React.createElement("li", {
      key: it.id
    }, /*#__PURE__*/React.createElement("a", {
      href: it.href || "#",
      onClick: e => {
        if (onSelect) {
          e.preventDefault();
          onSelect(it.id);
        }
      },
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--sp-2)",
        padding: "7px var(--sp-3)",
        borderRadius: "var(--radius-sm)",
        textDecoration: "none",
        background: on ? "var(--accent-soft)" : "transparent",
        color: on ? "var(--text-link)" : "var(--text-body)",
        fontWeight: on ? "var(--fw-medium)" : "var(--fw-regular)",
        transition: "var(--transition-control)"
      }
    }, /*#__PURE__*/React.createElement("span", null, it.label), it.badge));
  })))));
}
Object.assign(__ds_scope, { SidebarNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  style,
  ...rest
}) {
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue ?? items[0]?.value);
  const active = controlled ? value : inner;
  const pick = v => {
    if (!controlled) setInner(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderBottom: "1px solid var(--border-default)",
      display: "flex",
      gap: "var(--sp-5)",
      ...style
    }
  }, rest), items.map(it => {
    const on = it.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      onClick: () => pick(it.value),
      style: {
        appearance: "none",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0 0 10px",
        marginBottom: "-1px",
        font: "var(--type-small)",
        fontWeight: on ? "var(--fw-semibold)" : "var(--fw-regular)",
        color: on ? "var(--text-title)" : "var(--text-muted)",
        borderBottom: `2px solid ${on ? "var(--accent)" : "transparent"}`,
        transition: "var(--transition-control)"
      }
    }, it.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/ThemeToggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ThemeToggle({
  theme,
  onChange,
  style,
  ...rest
}) {
  const controlled = theme !== undefined;
  const [inner, setInner] = React.useState("light");
  const cur = controlled ? theme : inner;
  const [hover, setHover] = React.useState(false);
  const flip = () => {
    const next = cur === "light" ? "dark" : "light";
    if (!controlled) setInner(next);
    onChange && onChange(next);
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: flip,
    "aria-label": "Changer de th\xE8me",
    title: "Changer de th\xE8me",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 34,
      height: 34,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-sm)",
      cursor: "pointer",
      border: "1px solid var(--border-default)",
      background: hover ? "var(--bg-subtle)" : "transparent",
      color: "var(--text-muted)",
      transition: "var(--transition-control)",
      ...style
    }
  }, rest), cur === "light" ? /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
  })));
}
Object.assign(__ds_scope, { ThemeToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/ThemeToggle.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/GlowSurface.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const GRID_MASK = "radial-gradient(ellipse 54% 58% at 50% 50%,#000 0%,rgba(0,0,0,.55) 40%,rgba(0,0,0,.12) 70%,transparent 92%)";
function GlowSurface({
  as: Tag = "section",
  tone = "dark",
  grid = true,
  glow = true,
  radius = 0,
  children,
  style,
  ...rest
}) {
  const dark = tone === "dark";
  const line = dark ? "rgba(234,240,247,.06)" : "rgba(14,22,34,.07)";
  const glows = [glow && (dark ? "radial-gradient(50% 60% at 8% 0%,rgba(21,184,167,.30) 0%,rgba(21,184,167,0) 72%)" : "radial-gradient(55% 65% at 6% 0%,rgba(21,184,167,.14) 0%,rgba(21,184,167,0) 70%)"), glow && (dark ? "radial-gradient(45% 60% at 97% 100%,rgba(167,86,246,.26) 0%,rgba(167,86,246,0) 72%)" : "radial-gradient(45% 60% at 98% 100%,rgba(167,86,246,.13) 0%,rgba(167,86,246,0) 70%)"), dark ? "var(--brand-night)" : "var(--bg-page)"].filter(Boolean).join(",");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    "data-theme": dark ? "dark" : undefined,
    style: {
      position: "relative",
      isolation: "isolate",
      background: glows,
      borderRadius: radius,
      color: dark ? "var(--ink-50)" : "var(--text-body)",
      ...style
    }
  }, rest), grid && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      borderRadius: "inherit",
      backgroundImage: `linear-gradient(${line} 1px,transparent 1px),linear-gradient(90deg,${line} 1px,transparent 1px)`,
      backgroundSize: "64px 64px",
      backgroundPosition: "center center",
      WebkitMaskImage: GRID_MASK,
      maskImage: GRID_MASK
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      zIndex: 1,
      display: "block"
    }
  }, children));
}
Object.assign(__ds_scope, { GlowSurface });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/GlowSurface.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site-cours/App.jsx
try { (() => {
function App() {
  const [route, setRoute] = React.useState("home");
  const [theme, setTheme] = React.useState("light");
  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);
  const {
    Header,
    Footer,
    Home,
    Catalog,
    DocPage,
    TDPage,
    Glossary
  } = window;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(Header, {
    route: route,
    go: setRoute,
    theme: theme,
    setTheme: setTheme
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1
    }
  }, route === "home" && /*#__PURE__*/React.createElement(Home, {
    go: setRoute
  }), route === "catalog" && /*#__PURE__*/React.createElement(Catalog, {
    go: setRoute
  }), route === "doc" && /*#__PURE__*/React.createElement(DocPage, {
    go: setRoute
  }), route === "td" && /*#__PURE__*/React.createElement(TDPage, null), route === "glossary" && /*#__PURE__*/React.createElement(Glossary, null)), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site-cours/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site-cours/Catalog.jsx
try { (() => {
const {
  Card,
  Badge,
  Tag,
  Input,
  Select,
  Checkbox,
  Icon,
  Tabs
} = window.DS;
function Catalog({
  go
}) {
  const [q, setQ] = React.useState("");
  const [tab, setTab] = React.useState("tous");
  const list = window.COURSES.filter(c => (tab === "tous" || c.level.startsWith(tab.toUpperCase())) && (c.title + c.tags.join()).toLowerCase().includes(q.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      padding: "var(--sp-12) var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-h1)",
      marginBottom: "var(--sp-2)"
    }
  }, "Catalogue des cours"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)",
      maxWidth: "var(--measure)",
      marginTop: 0
    }
  }, "Quatre enseignements, du L1 au M1. Les supports restent en ligne apr\xE8s la fin du semestre."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "260px 1fr",
      gap: "var(--sp-10)",
      marginTop: "var(--sp-8)"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-5)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Rechercher",
    prefix: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 16
    }),
    placeholder: "mot-cl\xE9, th\xE8me\u2026",
    value: q,
    onChange: e => setQ(e.target.value)
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Semestre",
    options: [{
      value: "a",
      label: "Année complète"
    }, {
      value: "s1",
      label: "Semestre 1"
    }, {
      value: "s2",
      label: "Semestre 2"
    }]
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-eyebrow)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-caps)",
      color: "var(--text-faint)",
      marginBottom: 10
    }
  }, "Type de s\xE9ance"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    defaultChecked: true,
    label: "Cours magistral"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    defaultChecked: true,
    label: "Travaux dirig\xE9s"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Travaux pratiques"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-eyebrow)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-caps)",
      color: "var(--text-faint)",
      marginBottom: 10
    }
  }, "Mots-cl\xE9s"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, ["leviers", "forces", "VO2max", "feedback", "R", "analyse vidéo"].map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    onClick: () => setQ(t)
  }, t))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      value: "tous",
      label: "Tous"
    }, {
      value: "l1",
      label: "L1"
    }, {
      value: "l2",
      label: "L2"
    }, {
      value: "l3",
      label: "L3"
    }, {
      value: "m1",
      label: "M1"
    }],
    value: tab,
    onChange: setTab,
    style: {
      marginBottom: "var(--sp-6)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--sp-4)"
    }
  }, list.map(c => /*#__PURE__*/React.createElement(Card, {
    key: c.id,
    interactive: true,
    accent: c.accent,
    eyebrow: c.code,
    title: c.title,
    onClick: () => go("doc"),
    meta: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Badge, {
      tone: c.accent === "teal" ? "teal" : "violet"
    }, c.level), c.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
      key: t
    }, t))),
    footer: c.hours
  }, c.desc)), !list.length && /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-small)",
      color: "var(--text-faint)"
    }
  }, "Aucun cours ne correspond \xE0 ce filtre.")))));
}
Object.assign(window, {
  Catalog
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site-cours/Catalog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site-cours/Chrome.jsx
try { (() => {
const {
  Icon,
  Badge,
  Button,
  ThemeToggle
} = window.DS;
function Wordmark({
  light,
  size = 30
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: light ? "../../assets/logo-white.svg" : "../../assets/logo-teal.svg",
    alt: "",
    style: {
      height: size,
      width: "auto",
      display: "block"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: "-0.025em",
      color: light ? "var(--ink-50)" : "var(--text-title)",
      whiteSpace: "nowrap"
    }
  }, "Sci Motricit\xE9"));
}
function Header({
  route,
  go,
  theme,
  setTheme
}) {
  const nav = [["catalog", "Cours"], ["doc", "Chapitre"], ["td", "Travaux dirigés"], ["glossary", "Glossaire"]];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 30,
      background: "color-mix(in srgb,var(--bg-page) 82%,transparent)",
      backdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      padding: "0 var(--sp-6)",
      height: 64,
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-8)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go("home");
    },
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null)), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "var(--sp-5)"
    }
  }, nav.map(([id, label]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go(id);
    },
    style: {
      font: "var(--type-small)",
      textDecoration: "none",
      position: "relative",
      paddingBottom: 2,
      color: route === id ? "var(--text-title)" : "var(--text-muted)",
      fontWeight: route === id ? "var(--fw-medium)" : "var(--fw-regular)",
      borderBottom: route === id ? "2px solid var(--accent)" : "2px solid transparent"
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "7px 11px",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-sm)",
      color: "var(--text-faint)",
      font: "var(--type-code)",
      fontSize: 12,
      minWidth: 190,
      cursor: "text"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 15
  }), /*#__PURE__*/React.createElement("span", null, "Rechercher\u2026"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }, "\u2318K")), /*#__PURE__*/React.createElement(ThemeToggle, {
    theme: theme,
    onChange: setTheme
  })));
}
function Footer() {
  const {
    GlowSurface
  } = window.DS;
  return /*#__PURE__*/React.createElement(GlowSurface, {
    as: "footer",
    tone: "dark",
    style: {
      marginTop: "var(--sp-24)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      padding: "var(--sp-16) var(--sp-6) var(--sp-8)",
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr 1fr",
      gap: "var(--sp-8)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Wordmark, {
    light: true
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-small)",
      color: "var(--ink-400)",
      margin: "var(--sp-4) 0 0",
      maxWidth: 330
    }
  }, "Sciences du sport & motricit\xE9 humaine. Les cours et les TD que je donne en STAPS, publi\xE9s en acc\xE8s libre \u2014 pour mes \xE9tudiants, et pour tous ceux que le mouvement humain int\xE9resse.")), [["Cours", ["Biomécanique", "Cinétique", "Physiologie", "Méthodologie"]], ["Ressources", ["Glossaire", "Bibliographie", "Travaux dirigés", "Figures"]], ["Le site", ["Intention", "Licence CC BY-SA", "Signaler une erreur", "Contribuer"]]].map(([t, items]) => /*#__PURE__*/React.createElement("div", {
    key: t
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-eyebrow)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-caps)",
      color: "var(--ink-500)",
      marginBottom: 12
    }
  }, t), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, items.map(i => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: "var(--type-small)",
      color: "var(--ink-300)",
      textDecoration: "none"
    }
  }, i))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(234,240,247,.08)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      padding: "var(--sp-4) var(--sp-6)",
      font: "var(--type-code)",
      fontSize: 12,
      color: "var(--ink-500)",
      display: "flex",
      gap: "var(--sp-6)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Contenus sous licence CC BY-SA 4.0 \u2014 r\xE9utilisables en citant la source."), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }, "Construit avec Docusaurus"))));
}
Object.assign(window, {
  Header,
  Footer,
  Wordmark
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site-cours/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site-cours/DocPage.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  SidebarNav,
  Breadcrumb,
  ChapterHeader,
  Admonition,
  SectionLead,
  Application,
  FurtherReading,
  Checklist,
  GlossaryBox,
  FigurePanel,
  Reveal,
  Quiz,
  Stat,
  StepList,
  DocNav,
  Badge,
  Tag,
  Button,
  Icon,
  Reference,
  Tabs
} = window.DS;
function Toc({
  items,
  active
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: "sticky",
      top: 88,
      alignSelf: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-eyebrow)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-caps)",
      color: "var(--text-faint)",
      marginBottom: 12
    }
  }, "Sur cette page"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 9,
      borderLeft: "1px solid var(--border-subtle)"
    }
  }, items.map(([t, d], i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      paddingLeft: 12 + d * 12,
      marginLeft: -1,
      borderLeft: i === active ? "2px solid var(--accent)" : "2px solid transparent"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: "var(--type-small)",
      fontSize: 13,
      color: i === active ? "var(--text-link)" : "var(--text-muted)",
      textDecoration: "none"
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--sp-6)",
      paddingTop: "var(--sp-4)",
      borderTop: "1px solid var(--border-subtle)",
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: "var(--type-code)",
      fontSize: 12,
      color: "var(--text-muted)",
      display: "flex",
      alignItems: "center",
      gap: 6,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 13
  }), "T\xE9l\xE9charger le poly"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: "var(--type-code)",
      fontSize: 12,
      color: "var(--text-muted)",
      display: "flex",
      alignItems: "center",
      gap: 6,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert-triangle",
    size: 13
  }), "Signaler une erreur")));
}
function SectionHead({
  num,
  title
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "var(--sp-12) 0 var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: 28,
      height: 3,
      background: "var(--rule-gradient)",
      marginBottom: "var(--sp-3)"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h2)",
      letterSpacing: "var(--ls-tight)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-code)",
      fontSize: "var(--fs-lg)",
      color: "var(--accent-strong)",
      marginRight: 12
    }
  }, num), title));
}
const P = {
  font: "var(--type-body)",
  maxWidth: "var(--measure)",
  color: "var(--text-body)"
};
function DocPage({
  go
}) {
  const [active, setActive] = React.useState("s12");
  const [mode, setMode] = React.useState("reveal");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      padding: "0 var(--sp-6)",
      display: "grid",
      gridTemplateColumns: "var(--sidebar-w) minmax(0,1fr) var(--toc-w)",
      gap: "var(--sp-10)"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      borderRight: "1px solid var(--border-subtle)",
      padding: "var(--sp-8) var(--sp-4) var(--sp-8) 0",
      position: "sticky",
      top: 64,
      alignSelf: "start",
      height: "calc(100vh - 64px)",
      overflow: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-code)",
      fontSize: 12,
      color: "var(--text-faint)",
      padding: "0 var(--sp-3)",
      marginBottom: "var(--sp-5)"
    }
  }, "DEUST APSL \xB7 Biom\xE9canique"), /*#__PURE__*/React.createElement(SidebarNav, {
    sections: window.SOMMAIRE,
    activeId: active,
    onSelect: setActive
  })), /*#__PURE__*/React.createElement("article", {
    style: {
      padding: "var(--sp-8) 0 var(--sp-12)",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(ChapterHeader, {
    style: {
      marginBottom: "var(--sp-10)"
    },
    breadcrumb: /*#__PURE__*/React.createElement(Breadcrumb, {
      items: [{
        label: "DEUST APSL",
        href: "#"
      }, {
        label: "Biomécanique",
        href: "#"
      }, {
        label: "Chapitre 1 — Cinématique"
      }, {
        label: "1.2 Pourquoi mesurer ?"
      }]
    }),
    title: "Pourquoi mesurer ? De l'impression \xE0 la donn\xE9e",
    meta: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Badge, null, "CM 01"), /*#__PURE__*/React.createElement(Badge, {
      tone: "violet"
    }, "Section 1.2"), /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral"
    }, "\u2248 12 min"), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-code)",
        fontSize: 12,
        color: "var(--text-faint)"
      }
    }, "mis \xE0 jour le 17 ao\xFBt 2026")),
    actions: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "outline",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "download",
        size: 14
      })
    }, "Poly PDF")
  }, "La section 1.1 a d\xE9fini la biom\xE9canique : l'\xE9tude des forces et de leurs effets sur le vivant. Celle-ci fait la transition vers votre future profession : \xE0 quoi sert d'\xE9tudier ces forces \u2014 objectiver un mouvement, prendre des d\xE9cisions \xE9clair\xE9es, v\xE9rifier l'effet de ces d\xE9cisions. \xC0 la fin de cette section, vous devez \xEAtre capable d'expliquer ce qu'\xAB objectiver \xBB veut dire, de citer les limites de l'impression, et de d\xE9rouler la boucle mesurer \u2192 interpr\xE9ter \u2192 cibler \u2192 intervenir \u2192 re-mesurer sur un exemple concret."), /*#__PURE__*/React.createElement(SectionHead, {
    num: "1.2.1",
    title: "L'impression : utile, mais pas suffisante"
  }), /*#__PURE__*/React.createElement("p", {
    style: P
  }, "Partons du terrain. Vous encadrez un groupe de s\xE9niors depuis plusieurs mois et, un matin, une pens\xE9e vous traverse : \xAB M\xE9m\xE9 Jacqueline marche moins bien qu'avant \xBB. C'est une ", /*#__PURE__*/React.createElement("strong", null, "impression"), " \u2014 et une impression, c'est d\xE9j\xE0 pr\xE9cieux : c'est votre \u0153il de professionnel qui a rep\xE9r\xE9 qu'un changement s'est produit."), /*#__PURE__*/React.createElement("p", {
    style: P
  }, "Le probl\xE8me, c'est qu'on ne peut pas s'arr\xEAter l\xE0, parce que nos sens et notre m\xE9moire ne sont pas des instruments de mesure :"), /*#__PURE__*/React.createElement("ul", {
    style: {
      ...P,
      paddingLeft: "1.2em"
    }
  }, /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("strong", null, "L'\u0153il rep\xE8re, mais ne quantifie pas."), " Il vous dit que la marche est \xAB plus lente \xBB ; pas de combien."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("strong", null, "L'\u0153il est influenc\xE9 par le contexte."), " La m\xEAme marche para\xEEt diff\xE9rente selon le couloir, l'\xE2ge \u2014 et selon ce que vous vous attendez \xE0 voir."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("strong", null, "La m\xE9moire ne garde pas une trace fid\xE8le."), " Trois mois plus tard, vous vous souviendrez de l'impression, pas de la marche."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Une impression ne se transmet pas."), " \xAB Elle marche moins bien \xBB ne dit pas quel param\xE8tre est en cause.")), /*#__PURE__*/React.createElement(SectionHead, {
    num: "1.2.2",
    title: "Objectiver : transformer l'impression en mesure"
  }), /*#__PURE__*/React.createElement("p", {
    style: P
  }, /*#__PURE__*/React.createElement("strong", null, "Objectiver"), ", c'est transformer une impression en ", /*#__PURE__*/React.createElement("strong", null, "mesure"), " \u2014 une grandeur d\xE9finie, exprim\xE9e dans une unit\xE9. Trois exemples de ", /*#__PURE__*/React.createElement("em", null, "param\xE8tres biom\xE9caniques"), ", ces grandeurs mesurables qui d\xE9crivent le mouvement ou les forces qui le produisent :"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--sp-3)",
      margin: "var(--sp-5) 0"
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Vitesse de marche",
    value: "1,12",
    unit: "m/s"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Longueur de pas",
    value: "0,58",
    unit: "m",
    tone: "violet"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Flexion de hanche",
    value: "24",
    unit: "\xB0"
  })), /*#__PURE__*/React.createElement("p", {
    style: P
  }, "La mesure poss\xE8de trois propri\xE9t\xE9s que l'impression n'aura jamais : elle est ", /*#__PURE__*/React.createElement("strong", null, "reproductible"), ", elle ", /*#__PURE__*/React.createElement("strong", null, "se transmet"), ", et elle ", /*#__PURE__*/React.createElement("strong", null, "se compare"), " \u2014 \xE0 des mesures ant\xE9rieures et \xE0 des ", /*#__PURE__*/React.createElement("em", null, "donn\xE9es normatives"), "."), /*#__PURE__*/React.createElement(Admonition, {
    kind: "attention",
    style: {
      margin: "var(--sp-6) 0"
    }
  }, "Une valeur isol\xE9e n'est pas une alerte. Ce qui alerte, c'est l'amplitude de la perte rapport\xE9e au temps, et l'\xE9cart aux valeurs habituelles du m\xEAme \xE2ge et du m\xEAme sexe."), /*#__PURE__*/React.createElement(FigurePanel, {
    style: {
      margin: "var(--sp-8) 0"
    },
    src: "../../assets/illustrations/patineuse-translation-rectiligne.jpg",
    alt: "Sch\xE9ma de rep\xE8res cin\xE9matiques",
    ratio: "16 / 10",
    number: "1.3",
    caption: "Mesurer la m\xEAme grandeur \xE0 intervalles r\xE9guliers transforme une impression de d\xE9clin en trajectoire quantifi\xE9e.",
    source: "diaporama CM1, dia 12 \u2014 figure \xE0 r\xE9-exporter"
  }), /*#__PURE__*/React.createElement(SectionHead, {
    num: "1.2.3",
    title: "Les quatre usages professionnels de la mesure"
  }), /*#__PURE__*/React.createElement(StepList, {
    style: {
      margin: "var(--sp-6) 0"
    },
    steps: [{
      label: "Mesurer",
      detail: "Objectiver l'état présent : une valeur datée, comparable, partageable."
    }, {
      label: "Suivre",
      detail: "Répéter la mesure pour dessiner une trajectoire."
    }, {
      label: "Cibler",
      detail: "La mesure ne dit pas seulement que ça se dégrade : elle dit où."
    }, {
      label: "Ré-évaluer",
      detail: "Même protocole, même grandeur — l'intervention fonctionne, ou non."
    }]
  }), /*#__PURE__*/React.createElement("p", {
    style: P
  }, "Mises bout \xE0 bout, ces \xE9tapes forment une boucle : ", /*#__PURE__*/React.createElement("strong", null, "mesurer \u2192 interpr\xE9ter \u2192 cibler \u2192 intervenir \u2192 re-mesurer"), ". Elle sera le squelette de votre pratique tout au long de ce cours."), /*#__PURE__*/React.createElement(Application, {
    style: {
      margin: "var(--sp-10) 0 var(--sp-5)"
    },
    subject: 'du « il saute moins » au suivi de la détente'
  }, "Un pr\xE9parateur physique trouve qu'un volleyeur \xAB saute moins haut qu'en d\xE9but de saison \xBB. M\xEAme situation que M\xE9m\xE9 Jacqueline : une impression, pr\xE9cieuse comme signal d'alerte, inutilisable comme donn\xE9e. On objective \u2014 la d\xE9tente verticale se mesure en centim\xE8tres, par un test standardis\xE9 \u2014, on suit la valeur, on cherche la cause, on cible, puis on re-mesure. Seuls changent le public et la grandeur mesur\xE9e."), /*#__PURE__*/React.createElement(FurtherReading, {
    style: {
      margin: "var(--sp-5) 0"
    }
  }, "Objectiver n'exige pas un laboratoire : un chronom\xE8tre et un couloir suffisent pour mesurer une vitesse de marche. Les protocoles instrument\xE9s (plateforme de force, capture opto\xE9lectronique) apportent de la pr\xE9cision, pas n\xE9cessairement de la pertinence clinique."), /*#__PURE__*/React.createElement(GlossaryBox, {
    style: {
      margin: "var(--sp-8) 0"
    },
    entries: [{
      term: "Impression",
      def: "Jugement qualitatif fourni par les sens et la mémoire. Utile comme signal d'alerte, mais non quantifiée et non transmissible."
    }, {
      term: "Objectiver",
      def: "Transformer une impression en mesure : une grandeur définie, exprimée dans une unité."
    }, {
      term: "Données normatives",
      def: "Valeurs habituellement mesurées dans un groupe de référence (même âge, même sexe)."
    }, {
      term: "Biais de confirmation",
      def: "Tendance à interpréter l'information dans le sens de ce que l'on croit déjà. Il fausse l'observation non instrumentée."
    }]
  }), /*#__PURE__*/React.createElement(Checklist, {
    style: {
      margin: "var(--sp-8) 0 var(--sp-6)"
    },
    items: ["Expliquer ce qu'« objectiver » veut dire et donner deux paramètres biomécaniques avec leur unité.", "Citer les quatre limites de l'impression, et pourquoi elle reste utile comme signal d'alerte.", "Expliquer pourquoi une mesure est reproductible, transmissible et comparable.", "Dérouler la boucle mesurer → interpréter → cibler → intervenir → re-mesurer."]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--sp-10)",
      padding: "var(--sp-6)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      background: "var(--bg-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--sp-4)",
      marginBottom: "var(--sp-5)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-eyebrow)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-caps)",
      color: "var(--accent-strong)"
    }
  }, "V\xE9rifiez votre compr\xE9hension"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-small)",
      color: "var(--text-muted)",
      margin: "6px 0 0"
    }
  }, "R\xE9pondez de t\xEAte, puis d\xE9roulez la r\xE9ponse. Aucune donn\xE9e n'est envoy\xE9e.")), /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      value: "reveal",
      label: "Réponses cachées"
    }, {
      value: "qcm",
      label: "QCM"
    }],
    value: mode,
    onChange: setMode,
    style: {
      borderBottom: "none"
    }
  })), mode === "reveal" ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    index: "a.",
    question: "Quelle est la diff\xE9rence entre une impression et une donn\xE9e objectiv\xE9e ? Donnez un exemple de chacune \xE0 propos d'une m\xEAme marche."
  }, "L'impression est un jugement qualitatif issu des sens et de la m\xE9moire (\xAB elle marche moins bien \xBB) ; la donn\xE9e objectiv\xE9e est une grandeur mesur\xE9e dans une unit\xE9 d\xE9finie (\xAB vitesse de marche : 1,12 m/s \xBB). La premi\xE8re alerte, la seconde se compare et se transmet."), /*#__PURE__*/React.createElement(Reveal, {
    index: "b.",
    question: "Vrai ou faux : \xAB une impression n'a aucune valeur professionnelle \xBB. Justifiez."
  }, /*#__PURE__*/React.createElement("strong", null, "Faux."), " L'impression est le signal d'alerte : c'est l'\u0153il du professionnel qui rep\xE8re qu'un changement s'est produit. Elle est insuffisante seule, mais c'est elle qui d\xE9clenche la mesure."), /*#__PURE__*/React.createElement(Reveal, {
    index: "c.",
    tone: "violet",
    question: "La vitesse de marche d'une r\xE9sidente est mesur\xE9e \xE0 1,0 m/s. Ce chiffre suffit-il \xE0 conclure que sa marche se d\xE9grade ?"
  }, /*#__PURE__*/React.createElement("strong", null, "Non."), " Une valeur isol\xE9e ne dit rien d'une \xE9volution. Il faut la comparer \xE0 ses propres mesures ant\xE9rieures (de combien, en combien de temps) et aux donn\xE9es normatives de son \xE2ge et de son sexe.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement(Quiz, {
    index: "1",
    question: "\xAB Objectiver \xBB, c'est :",
    options: [{
      label: "donner son avis de professionnel sur un mouvement"
    }, {
      label: "transformer une impression en mesure exprimée dans une unité",
      correct: true
    }, {
      label: "comparer deux personnes entre elles"
    }],
    explanation: "Objectiver = passer d'un jugement qualitatif \xE0 une grandeur d\xE9finie et exprim\xE9e dans une unit\xE9 (m/s, cm, \xB0)."
  }), /*#__PURE__*/React.createElement(Quiz, {
    index: "2",
    question: "Parmi ces propositions, laquelle N'EST PAS une limite de l'impression ?",
    options: [{
      label: "elle ne quantifie pas"
    }, {
      label: "elle est influencée par le contexte"
    }, {
      label: "elle ne coûte rien à produire",
      correct: true
    }, {
      label: "elle ne se transmet pas"
    }],
    explanation: "Le faible co\xFBt est justement un avantage de l'impression : elle reste un excellent signal d'alerte."
  }), /*#__PURE__*/React.createElement(Quiz, {
    index: "3",
    question: "Une vitesse de marche mesur\xE9e une seule fois \xE0 1,0 m/s permet de conclure \xE0 un d\xE9clin.",
    options: [{
      label: "Vrai"
    }, {
      label: "Faux — il faut une comparaison dans le temps ou aux données normatives",
      correct: true
    }],
    explanation: "C'est la comparaison \u2014 \xE9volution personnelle et \xE9cart au groupe d'\xE2ge \u2014 qui constitue l'alerte, pas la valeur brute."
  }))), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h2)",
      margin: "var(--sp-12) 0 var(--sp-4)"
    }
  }, "R\xE9f\xE9rences"), window.REFS.slice(0, 3).map(r => /*#__PURE__*/React.createElement(Reference, _extends({
    key: r.title
  }, r, {
    href: "#"
  }))), /*#__PURE__*/React.createElement(DocNav, {
    style: {
      marginTop: "var(--sp-10)"
    },
    prev: {
      label: "Section précédente",
      title: "1.1 Qu'est-ce que la biomécanique ?"
    },
    next: {
      label: "Section suivante",
      title: "1.3 Cinématique ou cinétique"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--sp-8) 0"
    }
  }, /*#__PURE__*/React.createElement(Toc, {
    active: 1,
    items: [["1.2.1 L'impression", 0], ["1.2.2 Objectiver", 0], ["1.2.3 Quatre usages", 0], ["Glossaire", 1], ["Auto-évaluation", 1], ["Références", 1]]
  })));
}
Object.assign(window, {
  DocPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site-cours/DocPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site-cours/Glossary.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Definition,
  Reference,
  Input,
  Icon,
  Tag,
  Tabs
} = window.DS;
function Glossary() {
  const [q, setQ] = React.useState("");
  const list = window.GLOSSAIRE.filter(g => (g.term + g.def).toLowerCase().includes(q.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--content-max)",
      margin: "0 auto",
      padding: "var(--sp-12) var(--sp-6) var(--sp-16)"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-h1)",
      marginBottom: "var(--sp-2)"
    }
  }, "Glossaire & bibliographie"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)",
      marginTop: 0
    }
  }, "Le vocabulaire commun aux quatre cours, et les ouvrages dont ils sont tir\xE9s."), /*#__PURE__*/React.createElement(Input, {
    style: {
      margin: "var(--sp-6) 0"
    },
    prefix: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 16
    }),
    placeholder: "Chercher un terme\u2026",
    value: q,
    onChange: e => setQ(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: "var(--sp-6)"
    }
  }, ["A–C", "D–F", "G–L", "M–P", "Q–Z"].map((l, i) => /*#__PURE__*/React.createElement(Tag, {
    key: l,
    active: !i
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-3)"
    }
  }, list.map(g => /*#__PURE__*/React.createElement(Definition, {
    key: g.term,
    term: g.term,
    lang: g.lang
  }, g.def)), !list.length && /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-small)",
      color: "var(--text-faint)"
    }
  }, "Aucun terme ne correspond.")), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h2)",
      margin: "var(--sp-12) 0 var(--sp-4)"
    }
  }, "Bibliographie"), window.REFS.map(r => /*#__PURE__*/React.createElement(Reference, _extends({
    key: r.title
  }, r, {
    href: "#"
  }))));
}
Object.assign(window, {
  Glossary
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site-cours/Glossary.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site-cours/Home.jsx
try { (() => {
const {
  Button,
  Card,
  Tag,
  Icon,
  GlowSurface,
  StepList
} = window.DS;
function Hero({
  go
}) {
  return /*#__PURE__*/React.createElement(GlowSurface, {
    tone: "dark",
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      padding: "var(--sp-24) var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 900
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-eyebrow)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-caps)",
      color: "var(--brand-teal)",
      marginBottom: "var(--sp-5)"
    }
  }, "Sciences du sport \xB7 Motricit\xE9 humaine \xB7 Acc\xE8s libre"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "clamp(40px,5.2vw,72px)",
      lineHeight: 1.03,
      letterSpacing: "-0.03em",
      color: "var(--ink-50)",
      margin: 0
    }
  }, "Les cours de STAPS,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--brand-teal)"
    }
  }, "ouverts \xE0 tout le monde"), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      fontSize: 19,
      lineHeight: 1.6,
      color: "var(--ink-300)",
      maxWidth: 620,
      margin: "var(--sp-6) 0 var(--sp-8)"
    }
  }, "Je suis docteur en sciences du sport, et sur ce site je partage le contenu des cours et des TD que je donne."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-3)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go("catalog"),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "Parcourir les cours"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    onClick: () => go("doc")
  }, "Lire un chapitre")))));
}
function Intention() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      padding: "var(--sp-20) var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)",
      gap: "var(--sp-16)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: 36,
      height: 3,
      background: "var(--rule-gradient)",
      marginBottom: "var(--sp-5)"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h2)",
      letterSpacing: "var(--ls-tight)",
      marginBottom: "var(--sp-4)"
    }
  }, "Partager la connaissance, au plus grand nombre"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      maxWidth: "var(--measure)"
    }
  }, "Un support de cours n'a aucune raison de rester enferm\xE9 dans un amphith\xE9\xE2tre. Ce site publie l'int\xE9gralit\xE9 de ce que j'enseigne en STAPS : la mati\xE8re est la m\xEAme que celle projet\xE9e en s\xE9ance, mais r\xE9dig\xE9e pour \xEAtre lue seul, sans notes et sans avoir assist\xE9 au cours."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      maxWidth: "var(--measure)"
    }
  }, "L'objectif est double : donner \xE0 mes \xE9tudiants un support fiable pour r\xE9viser, et rendre ces connaissances accessibles \xE0 toute personne \u2014 professionnel, \xE9tudiant d'ailleurs, curieux \u2014 qui veut comprendre comment le corps humain bouge.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--sp-4)"
    }
  }, [["book-open", "Rédigé, pas résumé", "Chaque section est un texte complet, avec ses définitions, ses exemples et ses limites."], ["list-checks", "Auto-évaluation", "Des questions à la fin de chaque section : réponse cachée, ou QCM corrigé immédiatement."], ["link", "Sources tracées", "Chaque affirmation renvoie à la référence exacte qui la soutient."], ["unlock", "Licence ouverte", "CC BY-SA : réutilisable en cours, en formation, en autodidacte."]].map(([ic, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      padding: "var(--sp-5)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-strong)",
      display: "inline-flex",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 20
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-h3)",
      fontSize: "var(--fs-base)",
      marginBottom: 6
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-small)",
      fontSize: 13,
      color: "var(--text-muted)",
      margin: 0
    }
  }, d))))));
}
function Courses({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      padding: "0 var(--sp-6) var(--sp-20)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: "var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h2)",
      letterSpacing: "var(--ls-tight)"
    }
  }, "Les cours"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go("catalog");
    },
    style: {
      font: "var(--type-small)"
    }
  }, "Tout le catalogue \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--sp-4)"
    }
  }, window.COURSES.map(c => /*#__PURE__*/React.createElement(Card, {
    key: c.id,
    interactive: true,
    accent: c.accent,
    eyebrow: c.code,
    title: c.title,
    onClick: () => go("doc"),
    meta: c.tags.slice(0, 2).map(t => /*#__PURE__*/React.createElement(Tag, {
      key: t
    }, t)),
    footer: c.hours
  }, c.desc))));
}
function Method() {
  return /*#__PURE__*/React.createElement(GlowSurface, {
    tone: "light",
    glow: false
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      padding: "var(--sp-16) var(--sp-6)",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-eyebrow)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-caps)",
      color: "var(--text-faint)",
      marginBottom: "var(--sp-3)"
    }
  }, "Comment un chapitre est construit"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h2)",
      letterSpacing: "var(--ls-tight)",
      marginBottom: "var(--sp-8)",
      maxWidth: 600
    }
  }, "La m\xEAme structure, d'une section \xE0 l'autre"), /*#__PURE__*/React.createElement(StepList, {
    steps: [{
      label: "Objectifs",
      detail: "Ce que la section apporte, et ce que vous saurez faire à la fin."
    }, {
      label: "Le cours",
      detail: "Le texte rédigé, ses figures et ses sources."
    }, {
      label: "Application",
      detail: "Le même raisonnement transposé au terrain."
    }, {
      label: "Glossaire",
      detail: "Les termes introduits, définis en une phrase."
    }, {
      label: "Auto-évaluation",
      detail: "Questions à réponse cachée ou QCM corrigé."
    }]
  })));
}
function Home({
  go
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, {
    go: go
  }), /*#__PURE__*/React.createElement(Intention, null), /*#__PURE__*/React.createElement(Courses, {
    go: go
  }), /*#__PURE__*/React.createElement(Method, null));
}
Object.assign(window, {
  Home
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site-cours/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site-cours/TDPage.jsx
try { (() => {
const {
  SidebarNav,
  Breadcrumb,
  ChapterHeader,
  Admonition,
  SectionLead,
  Badge,
  Tag,
  Button,
  Icon,
  Card,
  Checkbox,
  Checklist,
  DocNav,
  Reveal,
  Stat
} = window.DS;
function Consigne({
  n,
  title,
  children,
  rendu
}) {
  return /*#__PURE__*/React.createElement("li", {
    style: {
      display: "grid",
      gridTemplateColumns: "44px 1fr",
      gap: "var(--sp-5)",
      padding: "var(--sp-6) 0",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-code)",
      fontSize: "var(--fs-xl)",
      color: "var(--accent-strong)",
      fontWeight: "var(--fw-medium)",
      lineHeight: 1
    }
  }, String(n).padStart(2, "0")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-h3)",
      fontSize: "var(--fs-lg)",
      marginBottom: "var(--sp-3)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body)",
      fontSize: "var(--fs-base)",
      color: "var(--text-body)",
      maxWidth: "var(--measure)"
    }
  }, children), rendu && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--sp-3)",
      display: "flex",
      gap: "var(--sp-2)",
      alignItems: "baseline",
      font: "var(--type-code)",
      fontSize: 12,
      color: "var(--violet-700)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: "uppercase",
      letterSpacing: "var(--ls-caps)",
      fontWeight: "var(--fw-semibold)"
    }
  }, "\xC0 noter"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, rendu))));
}
function TDPage() {
  const [active, setActive] = React.useState("td1");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      padding: "0 var(--sp-6)",
      display: "grid",
      gridTemplateColumns: "var(--sidebar-w) minmax(0,1fr)",
      gap: "var(--sp-10)"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      borderRight: "1px solid var(--border-subtle)",
      padding: "var(--sp-8) var(--sp-4) var(--sp-8) 0",
      position: "sticky",
      top: 64,
      alignSelf: "start",
      height: "calc(100vh - 64px)",
      overflow: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-code)",
      fontSize: 12,
      color: "var(--text-faint)",
      padding: "0 var(--sp-3)",
      marginBottom: "var(--sp-5)"
    }
  }, "DEUST APSL \xB7 Biom\xE9canique"), /*#__PURE__*/React.createElement(SidebarNav, {
    sections: window.SOMMAIRE,
    activeId: active,
    onSelect: setActive
  })), /*#__PURE__*/React.createElement("article", {
    style: {
      padding: "var(--sp-8) 0 var(--sp-12)",
      minWidth: 0,
      maxWidth: 900
    }
  }, /*#__PURE__*/React.createElement(ChapterHeader, {
    style: {
      marginBottom: "var(--sp-10)"
    },
    objectivesLabel: "Objectifs de la s\xE9ance",
    breadcrumb: /*#__PURE__*/React.createElement(Breadcrumb, {
      items: [{
        label: "DEUST APSL",
        href: "#"
      }, {
        label: "Biomécanique",
        href: "#"
      }, {
        label: "TD 1"
      }]
    }),
    title: "TD 1 \u2014 Objectiver une marche",
    meta: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Badge, {
      tone: "violet"
    }, "TD"), /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral"
    }, "Bin\xF4mes"), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-code)",
        fontSize: 12,
        color: "var(--text-faint)"
      }
    }, "rattach\xE9 au chapitre 1 \xB7 sections 1.2 et 1.6")),
    actions: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "outline",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "download",
        size: 14
      })
    }, "Fiche de mesure")
  }, "Ce TD met en pratique la boucle vue en 1.2 : passer d'une impression \xE0 une mesure. Vous conduirez un test de vitesse de marche sur 10 m\xE8tres, vous confronterez vos valeurs \xE0 celles des autres bin\xF4mes, et vous en discuterez la reproductibilit\xE9. \xC0 la fin, vous devez savoir mener ce test et interpr\xE9ter la valeur obtenue au regard des donn\xE9es normatives."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--sp-4)",
      margin: "var(--sp-6) 0 var(--sp-10)"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Ce que vous allez r\xE9aliser",
    title: "Six passages chronom\xE9tr\xE9s",
    accent: "teal"
  }, "Un couloir de 14 m (2 m d'acc\xE9l\xE9ration, 10 m utiles, 2 m de d\xE9c\xE9l\xE9ration), un chronom\xE8tre, trois passages \xE0 allure confortable et trois \xE0 allure rapide, en alternant les r\xF4les."), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Ce que vous rendrez",
    title: "Une fiche de mesure par bin\xF4me",
    accent: "violet"
  }, "Valeurs brutes des six passages, moyenne par allure, \xE9cart entre les deux allures, et une phrase d'interpr\xE9tation repla\xE7ant la personne dans les donn\xE9es normatives de son \xE2ge.")), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h2)",
      letterSpacing: "var(--ls-tight)",
      margin: "0 0 var(--sp-2)"
    }
  }, "Consignes"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-small)",
      color: "var(--text-muted)",
      marginTop: 0
    }
  }, "Travaillez en bin\xF4me, dans l'ordre. Chaque consigne se suffit \xE0 elle-m\xEAme : si vous \xEAtes bloqu\xE9, reprenez la section du cours indiqu\xE9e."), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: "none",
      margin: "var(--sp-6) 0 0",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Consigne, {
    n: 1,
    title: "Mat\xE9rialisez le couloir de mesure",
    rendu: "la longueur exacte de vos 10 m utiles, mesur\xE9e au d\xE9cam\xE8tre"
  }, "Rep\xE9rez au sol quatre lignes : d\xE9part, d\xE9but des 10 m chronom\xE9tr\xE9s, fin des 10 m, arriv\xE9e. Les 2 m avant et apr\xE8s servent \xE0 ce que la mesure porte sur une marche \xE0 vitesse stabilis\xE9e. V\xE9rifiez que les deux lignes interm\xE9diaires sont visibles depuis la position du chronom\xE9treur."), /*#__PURE__*/React.createElement(Consigne, {
    n: 2,
    title: "Fixez votre consigne verbale \u2014 et ne la changez plus",
    rendu: "la formulation exacte employ\xE9e, mot pour mot"
  }, "La consigne donn\xE9e au marcheur fait partie du protocole : \xAB marchez \xE0 votre allure habituelle \xBB et \xAB marchez normalement \xBB ne produisent pas les m\xEAmes valeurs. Choisissez une formulation pour l'allure confortable, une pour l'allure rapide, et r\xE9p\xE9tez-les \xE0 l'identique \xE0 chaque passage."), /*#__PURE__*/React.createElement(Consigne, {
    n: 3,
    title: "R\xE9alisez trois passages \xE0 allure confortable",
    rendu: "les trois temps bruts, en secondes, sans en \xE9carter aucun"
  }, "Le chronom\xE9treur d\xE9clenche au franchissement de la premi\xE8re ligne interm\xE9diaire par le pied d'appui, et arr\xEAte au franchissement de la seconde. Le marcheur ne s'arr\xEAte pas sur la ligne : il poursuit jusqu'\xE0 l'arriv\xE9e. Laissez au moins 30 s de r\xE9cup\xE9ration entre les passages."), /*#__PURE__*/React.createElement(Consigne, {
    n: 4,
    title: "R\xE9p\xE9tez \xE0 allure rapide",
    rendu: "les trois temps bruts de la seconde s\xE9rie"
  }, "M\xEAme protocole, consigne d'allure rapide \u2014 sans course. Puis inversez les r\xF4les au sein du bin\xF4me et recommencez l'ensemble, de sorte que chacun soit mesur\xE9."), /*#__PURE__*/React.createElement(Consigne, {
    n: 5,
    title: "Convertissez et traitez vos donn\xE9es",
    rendu: "moyenne par allure, \xE9cart maximal intra-s\xE9rie, \xE9cart entre les deux allures"
  }, "Convertissez chaque temps en vitesse (v = d / t, avec d = 10 m). Calculez la moyenne de chaque s\xE9rie, puis l'\xE9cart entre le passage le plus rapide et le plus lent d'une m\xEAme s\xE9rie. Que vous dit cet \xE9cart sur la reproductibilit\xE9 de votre protocole ?"), /*#__PURE__*/React.createElement(Consigne, {
    n: 6,
    title: "Interpr\xE9tez, en une phrase",
    rendu: "votre phrase d'interpr\xE9tation, sur la fiche"
  }, "Situez la valeur obtenue par rapport aux donn\xE9es normatives de l'\xE2ge et du sexe de la personne mesur\xE9e (section 1.2.3 du cours). Formulez une phrase que vous pourriez transmettre \xE0 un coll\xE8gue : la grandeur, sa valeur, son unit\xE9, et ce qu'elle situe.")), /*#__PURE__*/React.createElement(Admonition, {
    kind: "attention",
    style: {
      margin: "var(--sp-8) 0"
    }
  }, "Aucune donn\xE9e mesur\xE9e pendant ce TD ne concerne une personne vuln\xE9rable : vous vous mesurez entre vous. Si vous reproduisez ce protocole en stage aupr\xE8s de s\xE9niors, l'accord de la personne et celui de l'\xE9quipe encadrante sont un pr\xE9alable."), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h2)",
      letterSpacing: "var(--ls-tight)",
      margin: "var(--sp-12) 0 var(--sp-4)"
    }
  }, "Mat\xE9riel \xE0 pr\xE9voir"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px var(--sp-6)",
      marginBottom: "var(--sp-6)"
    }
  }, ["Un chronomètre par binôme (le téléphone convient)", "Un décamètre ou quatre plots de repérage", "La fiche de mesure imprimée, ou un tableur", "Des chaussures de sport — vous marcherez"].map(x => /*#__PURE__*/React.createElement(Checkbox, {
    key: x,
    label: x
  }))), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h2)",
      letterSpacing: "var(--ls-tight)",
      margin: "var(--sp-12) 0 var(--sp-4)"
    }
  }, "\xC0 pr\xE9parer avant la s\xE9ance"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    index: "1",
    question: "Relisez la section 1.2 : quelles sont les trois propri\xE9t\xE9s d'une mesure ?"
  }, "Reproductible (le m\xEAme protocole redonne une valeur proche), transmissible (elle garde le m\xEAme sens pour tous), comparable (\xE0 des mesures ant\xE9rieures et \xE0 des donn\xE9es normatives)."), /*#__PURE__*/React.createElement(Reveal, {
    index: "2",
    question: "Quelle est la vitesse de marche confortable moyenne d'une femme de 75 ans ?"
  }, "Environ 1,13 m/s entre 70 et 79 ans, contre environ 0,94 m/s entre 80 et 99 ans. Ces ordres de grandeur serviront de rep\xE8re pour interpr\xE9ter vos mesures."), /*#__PURE__*/React.createElement(Reveal, {
    index: "3",
    tone: "violet",
    question: "Pourquoi pr\xE9voir 2 m avant et apr\xE8s les 10 m chronom\xE9tr\xE9s ?"
  }, "Pour que la mesure porte sur une marche \xE0 vitesse stabilis\xE9e : les premi\xE8res et les derni\xE8res foul\xE9es sont des phases d'acc\xE9l\xE9ration et de d\xE9c\xE9l\xE9ration, qui feraient baisser artificiellement la vitesse mesur\xE9e.")), /*#__PURE__*/React.createElement(Checklist, {
    style: {
      margin: "var(--sp-10) 0 0"
    },
    title: "\xC0 la fin de ce TD, je dois \xEAtre capable de\u2026",
    items: ["Mettre en place un couloir de mesure de vitesse de marche sur 10 m.", "Énoncer une consigne verbale reproductible et expliquer pourquoi elle compte.", "Convertir un temps en vitesse et calculer un écart intra-série.", "Interpréter une vitesse de marche au regard des données normatives."]
  }), /*#__PURE__*/React.createElement(DocNav, {
    style: {
      marginTop: "var(--sp-10)"
    },
    prev: {
      label: "Chapitre",
      title: "1.9 Synthèse et ouverture"
    },
    next: {
      label: "Séance suivante",
      title: "TD 2 — Analyse vidéo"
    }
  })));
}
Object.assign(window, {
  TDPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site-cours/TDPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site-cours/data.js
try { (() => {
const COURSES = [{
  id: "biomeca",
  code: "DEUST APSL",
  title: "Biomécanique & analyse du mouvement du sénior",
  level: "DEUST 1",
  hours: "9 chapitres · 24 h CM",
  tags: ["cinématique", "cinétique", "marche"],
  accent: "teal",
  desc: "Décrire et expliquer le mouvement du sénior : marche, posture, équilibre, prévention des chutes.",
  progress: 9
}, {
  id: "cinetique",
  code: "DEUST APSL",
  title: "Cinétique : expliquer le mouvement",
  level: "DEUST 1",
  hours: "7 chapitres · 18 h CM",
  tags: ["forces", "Newton", "moments"],
  accent: "violet",
  desc: "Remonter des effets aux causes : forces musculaires, réaction au sol, moments articulaires.",
  progress: 7
}, {
  id: "physio",
  code: "L1 STAPS",
  title: "Physiologie de l'exercice",
  level: "L1",
  hours: "6 chapitres · 24 h CM",
  tags: ["VO2max", "filières"],
  accent: "teal",
  desc: "Réponses aiguës et adaptations chroniques de l'organisme à l'effort.",
  progress: 4
}, {
  id: "methodo",
  code: "M1 EOPS",
  title: "Méthodologie de la mesure",
  level: "M1",
  hours: "5 chapitres · 12 h CM",
  tags: ["plateforme de force", "R"],
  accent: "violet",
  desc: "Instrumenter, mesurer et interpréter des données de motricité.",
  progress: 2
}];
const SOMMAIRE = [{
  label: "Chapitre 1 · Cinématique",
  items: [{
    id: "s11",
    label: "1.1 Qu'est-ce que la biomécanique ?"
  }, {
    id: "s12",
    label: "1.2 Pourquoi mesurer ?"
  }, {
    id: "s13",
    label: "1.3 Cinématique ou cinétique"
  }, {
    id: "s14",
    label: "1.4 Les deux natures du mouvement"
  }, {
    id: "s15",
    label: "1.5 Décrire un déplacement"
  }, {
    id: "s16",
    label: "1.6 La vitesse"
  }, {
    id: "s17",
    label: "1.7 L'accélération"
  }, {
    id: "s18",
    label: "1.8 La cinématique angulaire"
  }, {
    id: "s19",
    label: "1.9 Synthèse et ouverture"
  }]
}, {
  label: "Chapitre 2 · Cinétique",
  items: [{
    id: "s21",
    label: "2.1 Qu'est-ce qu'une force ?"
  }, {
    id: "s22",
    label: "2.2 Les lois de Newton"
  }, {
    id: "s23",
    label: "2.3 La force de réaction au sol"
  }]
}, {
  label: "Travaux dirigés",
  items: [{
    id: "td1",
    label: "TD 1 — Objectiver une marche"
  }, {
    id: "td2",
    label: "TD 2 — Analyse vidéo"
  }]
}];
const GLOSSAIRE = [{
  term: "Biomécanique",
  lang: "Hatze, 1974",
  def: "Étude de la structure et de la fonction des systèmes biologiques par les méthodes de la mécanique. En clair : l'étude des forces et de leurs effets sur le vivant."
}, {
  term: "Objectiver",
  lang: "",
  def: "Transformer une impression en mesure : une grandeur définie, exprimée dans une unité."
}, {
  term: "Cinématique",
  lang: "en. kinematics",
  def: "Étude des valeurs descriptives du mouvement : positions, vitesses, accélérations, angles. L'effet."
}, {
  term: "Cinétique",
  lang: "en. kinetics",
  def: "Étude des forces qui s'appliquent au mouvement. La cause."
}, {
  term: "Données normatives",
  lang: "",
  def: "Valeurs habituellement mesurées dans un groupe de référence (même âge, même sexe)."
}, {
  term: "Mécanobiologie",
  lang: "",
  def: "Étude de la façon dont les cellules perçoivent les forces mécaniques et y répondent."
}, {
  term: "Paramètre biomécanique",
  lang: "",
  def: "Grandeur mesurable décrivant le mouvement ou les forces : vitesse de marche (m/s), longueur de pas (cm), angle articulaire (°)."
}];
const REFS = [{
  year: "1974",
  authors: "Hatze H.",
  title: "Letter: The meaning of the term biomechanics",
  source: "Journal of Biomechanics"
}, {
  year: "2009",
  authors: "Winter D. A.",
  title: "Biomechanics and Motor Control of Human Movement",
  source: "Wiley"
}, {
  year: "2015",
  authors: "Enoka R. M.",
  title: "Neuromechanics of Human Movement",
  source: "Human Kinetics"
}, {
  year: "1680",
  authors: "Borelli G. A.",
  title: "De Motu Animalium",
  source: "Rome"
}];
Object.assign(window, {
  COURSES,
  SOMMAIRE,
  GLOSSAIRE,
  REFS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site-cours/data.js", error: String((e && e.message) || e) }); }

// ui_kits/site-cours/ds.js
try { (() => {
/* Résolution paresseuse des composants du design system.
   Chaque nom est un wrapper qui va chercher le composant réel au moment du
   rendu ; s'il n'est pas encore là (bundle en cours de compilation), il
   réessaie jusqu'à ce qu'il apparaisse, puis se re-rend tout seul. */
(function () {
  var names = ["Admonition", "Application", "ChapterHeader", "Checklist", "FurtherReading", "SectionLead", "Badge", "Breadcrumb", "Button", "Card", "Checkbox", "CodeBlock", "Definition", "DocNav", "Figure", "FigurePanel", "GlossaryBox", "GlowSurface", "Icon", "Input", "Quiz", "Reference", "Reveal", "Select", "SidebarNav", "Stat", "StepList", "Tabs", "Tag", "ThemeToggle"];
  var g = {};
  names.forEach(function (n) {
    function C(props) {
      var tick = React.useState(0);
      var R = (window.MotricitDesignSystem_ea5604 || {})[n];
      React.useEffect(function () {
        if (R) return;
        var t = setInterval(function () {
          if ((window.MotricitDesignSystem_ea5604 || {})[n]) {
            clearInterval(t);
            tick[1](function (v) {
              return v + 1;
            });
          }
        }, 250);
        return function () {
          clearInterval(t);
        };
      }, [R]);
      if (!R) return null;
      return React.createElement(R, props, props && props.children);
    }
    C.displayName = n;
    g[n] = C;
  });
  window.DS = g;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site-cours/ds.js", error: String((e && e.message) || e) }); }

__ds_ns.Admonition = __ds_scope.Admonition;

__ds_ns.Application = __ds_scope.Application;

__ds_ns.ChapterHeader = __ds_scope.ChapterHeader;

__ds_ns.Checklist = __ds_scope.Checklist;

__ds_ns.CodeBlock = __ds_scope.CodeBlock;

__ds_ns.Definition = __ds_scope.Definition;

__ds_ns.Figure = __ds_scope.Figure;

__ds_ns.FigurePanel = __ds_scope.FigurePanel;

__ds_ns.FurtherReading = __ds_scope.FurtherReading;

__ds_ns.GlossaryBox = __ds_scope.GlossaryBox;

__ds_ns.Quiz = __ds_scope.Quiz;

__ds_ns.Reference = __ds_scope.Reference;

__ds_ns.Reveal = __ds_scope.Reveal;

__ds_ns.SectionLead = __ds_scope.SectionLead;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.StepList = __ds_scope.StepList;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.DocNav = __ds_scope.DocNav;

__ds_ns.SidebarNav = __ds_scope.SidebarNav;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.ThemeToggle = __ds_scope.ThemeToggle;

__ds_ns.GlowSurface = __ds_scope.GlowSurface;

})();
