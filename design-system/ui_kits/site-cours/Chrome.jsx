const {Icon,Badge,Button,ThemeToggle}=window.DS;

function Wordmark({light,size=30}){
  return (
    <span style={{display:"flex",alignItems:"center",gap:11}}>
      <img src={light?"../../assets/logo-white.svg":"../../assets/logo-teal.svg"} alt="" style={{height:size,width:"auto",display:"block"}}/>
      <span style={{fontFamily:"var(--font-display)",fontWeight:700,fontSize:18,letterSpacing:"-0.025em",color:light?"var(--ink-50)":"var(--text-title)",whiteSpace:"nowrap"}}>Sci Motricité</span>
    </span>);
}

function Header({route,go,theme,setTheme}){
  const nav=[["catalog","Cours"],["doc","Chapitre"],["td","Travaux dirigés"],["glossary","Glossaire"]];
  return (
    <header style={{position:"sticky",top:0,zIndex:30,background:"color-mix(in srgb,var(--bg-page) 82%,transparent)",backdropFilter:"blur(14px)",borderBottom:"1px solid var(--border-subtle)"}}>
      <div style={{maxWidth:"var(--page-max)",margin:"0 auto",padding:"0 var(--sp-6)",height:64,display:"flex",alignItems:"center",gap:"var(--sp-8)"}}>
        <a href="#" onClick={e=>{e.preventDefault();go("home")}} style={{textDecoration:"none"}}><Wordmark/></a>
        <nav style={{display:"flex",gap:"var(--sp-5)"}}>
          {nav.map(([id,label])=>(
            <a key={id} href="#" onClick={e=>{e.preventDefault();go(id)}} style={{font:"var(--type-small)",textDecoration:"none",position:"relative",paddingBottom:2,color:route===id?"var(--text-title)":"var(--text-muted)",fontWeight:route===id?"var(--fw-medium)":"var(--fw-regular)",borderBottom:route===id?"2px solid var(--accent)":"2px solid transparent"}}>{label}</a>))}
        </nav>
        <div style={{flex:1}}/>
        <label style={{display:"flex",alignItems:"center",gap:8,padding:"7px 11px",border:"1px solid var(--border-default)",borderRadius:"var(--radius-sm)",color:"var(--text-faint)",font:"var(--type-code)",fontSize:12,minWidth:190,cursor:"text"}}>
          <Icon name="search" size={15}/><span>Rechercher…</span><span style={{marginLeft:"auto"}}>⌘K</span>
        </label>
        <ThemeToggle theme={theme} onChange={setTheme}/>
      </div>
    </header>);
}

function Footer(){
  const {GlowSurface}=window.DS;
  return (
    <GlowSurface as="footer" tone="dark" style={{marginTop:"var(--sp-24)"}}>
      <div style={{maxWidth:"var(--page-max)",margin:"0 auto",padding:"var(--sp-16) var(--sp-6) var(--sp-8)",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"var(--sp-8)"}}>
        <div>
          <Wordmark light/>
          <p style={{font:"var(--type-small)",color:"var(--ink-400)",margin:"var(--sp-4) 0 0",maxWidth:330}}>Sciences du sport & motricité humaine. Les cours et les TD que je donne en STAPS, publiés en accès libre — pour mes étudiants, et pour tous ceux que le mouvement humain intéresse.</p>
        </div>
        {[["Cours",["Biomécanique","Cinétique","Physiologie","Méthodologie"]],["Ressources",["Glossaire","Bibliographie","Travaux dirigés","Figures"]],["Le site",["Intention","Licence CC BY-SA","Signaler une erreur","Contribuer"]]].map(([t,items])=>(
          <div key={t}>
            <div style={{font:"var(--type-eyebrow)",textTransform:"uppercase",letterSpacing:"var(--ls-caps)",color:"var(--ink-500)",marginBottom:12}}>{t}</div>
            <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:8}}>
              {items.map(i=><li key={i}><a href="#" style={{font:"var(--type-small)",color:"var(--ink-300)",textDecoration:"none"}}>{i}</a></li>)}
            </ul></div>))}
      </div>
      <div style={{borderTop:"1px solid rgba(234,240,247,.08)"}}>
        <div style={{maxWidth:"var(--page-max)",margin:"0 auto",padding:"var(--sp-4) var(--sp-6)",font:"var(--type-code)",fontSize:12,color:"var(--ink-500)",display:"flex",gap:"var(--sp-6)",flexWrap:"wrap"}}>
          <span>Contenus sous licence CC BY-SA 4.0 — réutilisables en citant la source.</span><span style={{marginLeft:"auto"}}>Construit avec Docusaurus</span>
        </div>
      </div>
    </GlowSurface>);
}
Object.assign(window,{Header,Footer,Wordmark});