const {Definition,Reference,Input,Icon,Tag,Tabs}=window.DS;

function Glossary(){
  const [q,setQ]=React.useState("");
  const list=window.GLOSSAIRE.filter(g=>(g.term+g.def).toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{maxWidth:"var(--content-max)",margin:"0 auto",padding:"var(--sp-12) var(--sp-6) var(--sp-16)"}}>
      <h1 style={{font:"var(--type-h1)",marginBottom:"var(--sp-2)"}}>Glossaire & bibliographie</h1>
      <p style={{font:"var(--type-body)",color:"var(--text-muted)",marginTop:0}}>Le vocabulaire commun aux quatre cours, et les ouvrages dont ils sont tirés.</p>
      <Input style={{margin:"var(--sp-6) 0"}} prefix={<Icon name="search" size={16}/>} placeholder="Chercher un terme…" value={q} onChange={e=>setQ(e.target.value)}/>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:"var(--sp-6)"}}>{["A–C","D–F","G–L","M–P","Q–Z"].map((l,i)=><Tag key={l} active={!i}>{l}</Tag>)}</div>
      <div style={{display:"flex",flexDirection:"column",gap:"var(--sp-3)"}}>
        {list.map(g=><Definition key={g.term} term={g.term} lang={g.lang}>{g.def}</Definition>)}
        {!list.length&&<p style={{font:"var(--type-small)",color:"var(--text-faint)"}}>Aucun terme ne correspond.</p>}
      </div>
      <h2 style={{font:"var(--type-h2)",margin:"var(--sp-12) 0 var(--sp-4)"}}>Bibliographie</h2>
      {window.REFS.map(r=><Reference key={r.title} {...r} href="#"/>)}
    </div>);
}
Object.assign(window,{Glossary});