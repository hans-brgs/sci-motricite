const {Card,Badge,Tag,Input,Select,Checkbox,Icon,Tabs}=window.DS;

function Catalog({go}){
  const [q,setQ]=React.useState("");
  const [tab,setTab]=React.useState("tous");
  const list=window.COURSES.filter(c=>(tab==="tous"||c.level.startsWith(tab.toUpperCase()))&&(c.title+c.tags.join()).toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{maxWidth:"var(--page-max)",margin:"0 auto",padding:"var(--sp-12) var(--sp-6)"}}>
      <h1 style={{font:"var(--type-h1)",marginBottom:"var(--sp-2)"}}>Catalogue des cours</h1>
      <p style={{font:"var(--type-body)",color:"var(--text-muted)",maxWidth:"var(--measure)",marginTop:0}}>Quatre enseignements, du L1 au M1. Les supports restent en ligne après la fin du semestre.</p>
      <div style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:"var(--sp-10)",marginTop:"var(--sp-8)"}}>
        <aside style={{display:"flex",flexDirection:"column",gap:"var(--sp-5)"}}>
          <Input label="Rechercher" prefix={<Icon name="search" size={16}/>} placeholder="mot-clé, thème…" value={q} onChange={e=>setQ(e.target.value)}/>
          <Select label="Semestre" options={[{value:"a",label:"Année complète"},{value:"s1",label:"Semestre 1"},{value:"s2",label:"Semestre 2"}]}/>
          <div>
            <div style={{font:"var(--type-eyebrow)",textTransform:"uppercase",letterSpacing:"var(--ls-caps)",color:"var(--text-faint)",marginBottom:10}}>Type de séance</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <Checkbox defaultChecked label="Cours magistral"/><Checkbox defaultChecked label="Travaux dirigés"/><Checkbox label="Travaux pratiques"/>
            </div>
          </div>
          <div>
            <div style={{font:"var(--type-eyebrow)",textTransform:"uppercase",letterSpacing:"var(--ls-caps)",color:"var(--text-faint)",marginBottom:10}}>Mots-clés</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{["leviers","forces","VO2max","feedback","R","analyse vidéo"].map(t=><Tag key={t} onClick={()=>setQ(t)}>{t}</Tag>)}</div>
          </div>
        </aside>
        <div>
          <Tabs items={[{value:"tous",label:"Tous"},{value:"l1",label:"L1"},{value:"l2",label:"L2"},{value:"l3",label:"L3"},{value:"m1",label:"M1"}]} value={tab} onChange={setTab} style={{marginBottom:"var(--sp-6)"}}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--sp-4)"}}>
            {list.map(c=>(
              <Card key={c.id} interactive accent={c.accent} eyebrow={c.code} title={c.title} onClick={()=>go("doc")}
                meta={<><Badge tone={c.accent==="teal"?"teal":"violet"}>{c.level}</Badge>{c.tags.map(t=><Tag key={t}>{t}</Tag>)}</>} footer={c.hours}>{c.desc}</Card>))}
            {!list.length&&<p style={{font:"var(--type-small)",color:"var(--text-faint)"}}>Aucun cours ne correspond à ce filtre.</p>}
          </div>
        </div>
      </div>
    </div>);
}
Object.assign(window,{Catalog});