const {Button,Card,Tag,Icon,GlowSurface,StepList}=window.DS;

function Hero({go}){
  return (
    <GlowSurface tone="dark" style={{overflow:"hidden"}}>
      <div style={{maxWidth:"var(--page-max)",margin:"0 auto",padding:"var(--sp-24) var(--sp-6)"}}>
        <div style={{maxWidth:900}}>
          <div style={{font:"var(--type-eyebrow)",textTransform:"uppercase",letterSpacing:"var(--ls-caps)",color:"var(--brand-teal)",marginBottom:"var(--sp-5)"}}>Sciences du sport · Motricité humaine · Accès libre</div>
          <h1 style={{fontFamily:"var(--font-display)",fontWeight:700,fontSize:"clamp(40px,5.2vw,72px)",lineHeight:1.03,letterSpacing:"-0.03em",color:"var(--ink-50)",margin:0}}>
            Les cours de STAPS,<br/><span style={{color:"var(--brand-teal)"}}>ouverts à tout le monde</span>.
          </h1>
          <p style={{font:"var(--type-body)",fontSize:19,lineHeight:1.6,color:"var(--ink-300)",maxWidth:620,margin:"var(--sp-6) 0 var(--sp-8)"}}>
            Je suis docteur en sciences du sport, et sur ce site je partage le contenu des cours et des TD que je donne.
          </p>
          <div style={{display:"flex",gap:"var(--sp-3)",flexWrap:"wrap"}}>
            <Button size="lg" onClick={()=>go("catalog")} iconRight={<Icon name="arrow-right" size={16}/>}>Parcourir les cours</Button>
            <Button size="lg" variant="outline" onClick={()=>go("doc")}>Lire un chapitre</Button>
          </div>
        </div>
      </div>
    </GlowSurface>);
}

function Intention(){
  return (
    <section style={{maxWidth:"var(--page-max)",margin:"0 auto",padding:"var(--sp-20) var(--sp-6)"}}>
      <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1.1fr)",gap:"var(--sp-16)",alignItems:"start"}}>
        <div>
          <span style={{display:"block",width:36,height:3,background:"var(--rule-gradient)",marginBottom:"var(--sp-5)"}}/>
          <h2 style={{font:"var(--type-h2)",letterSpacing:"var(--ls-tight)",marginBottom:"var(--sp-4)"}}>Partager la connaissance, au plus grand nombre</h2>
          <p style={{font:"var(--type-body)",color:"var(--text-body)",maxWidth:"var(--measure)"}}>
            Un support de cours n'a aucune raison de rester enfermé dans un amphithéâtre. Ce site publie l'intégralité de ce que j'enseigne en STAPS : la matière est la même que celle projetée en séance, mais rédigée pour être lue seul, sans notes et sans avoir assisté au cours.
          </p>
          <p style={{font:"var(--type-body)",color:"var(--text-body)",maxWidth:"var(--measure)"}}>
            L'objectif est double : donner à mes étudiants un support fiable pour réviser, et rendre ces connaissances accessibles à toute personne — professionnel, étudiant d'ailleurs, curieux — qui veut comprendre comment le corps humain bouge.
          </p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--sp-4)"}}>
          {[["book-open","Rédigé, pas résumé","Chaque section est un texte complet, avec ses définitions, ses exemples et ses limites."],
            ["list-checks","Auto-évaluation","Des questions à la fin de chaque section : réponse cachée, ou QCM corrigé immédiatement."],
            ["link","Sources tracées","Chaque affirmation renvoie à la référence exacte qui la soutient."],
            ["unlock","Licence ouverte","CC BY-SA : réutilisable en cours, en formation, en autodidacte."]].map(([ic,t,d])=>(
            <div key={t} style={{padding:"var(--sp-5)",background:"var(--surface-card)",border:"1px solid var(--border-subtle)",borderRadius:"var(--radius-md)",boxShadow:"var(--shadow-1)"}}>
              <span style={{color:"var(--accent-strong)",display:"inline-flex",marginBottom:12}}><Icon name={ic} size={20}/></span>
              <h3 style={{font:"var(--type-h3)",fontSize:"var(--fs-base)",marginBottom:6}}>{t}</h3>
              <p style={{font:"var(--type-small)",fontSize:13,color:"var(--text-muted)",margin:0}}>{d}</p>
            </div>))}
        </div>
      </div>
    </section>);
}

function Courses({go}){
  return (
    <section style={{maxWidth:"var(--page-max)",margin:"0 auto",padding:"0 var(--sp-6) var(--sp-20)"}}>
      <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",marginBottom:"var(--sp-6)"}}>
        <h2 style={{font:"var(--type-h2)",letterSpacing:"var(--ls-tight)"}}>Les cours</h2>
        <a href="#" onClick={e=>{e.preventDefault();go("catalog")}} style={{font:"var(--type-small)"}}>Tout le catalogue →</a>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"var(--sp-4)"}}>
        {window.COURSES.map(c=>(
          <Card key={c.id} interactive accent={c.accent} eyebrow={c.code} title={c.title} onClick={()=>go("doc")}
            meta={c.tags.slice(0,2).map(t=><Tag key={t}>{t}</Tag>)} footer={c.hours}>{c.desc}</Card>))}
      </div>
    </section>);
}

function Method(){
  return (
    <GlowSurface tone="light" glow={false}>
      <div style={{maxWidth:"var(--page-max)",margin:"0 auto",padding:"var(--sp-16) var(--sp-6)",borderTop:"1px solid var(--border-subtle)"}}>
        <div style={{font:"var(--type-eyebrow)",textTransform:"uppercase",letterSpacing:"var(--ls-caps)",color:"var(--text-faint)",marginBottom:"var(--sp-3)"}}>Comment un chapitre est construit</div>
        <h2 style={{font:"var(--type-h2)",letterSpacing:"var(--ls-tight)",marginBottom:"var(--sp-8)",maxWidth:600}}>La même structure, d'une section à l'autre</h2>
        <StepList steps={[
          {label:"Objectifs",detail:"Ce que la section apporte, et ce que vous saurez faire à la fin."},
          {label:"Le cours",detail:"Le texte rédigé, ses figures et ses sources."},
          {label:"Application",detail:"Le même raisonnement transposé au terrain."},
          {label:"Glossaire",detail:"Les termes introduits, définis en une phrase."},
          {label:"Auto-évaluation",detail:"Questions à réponse cachée ou QCM corrigé."}]}/>
      </div>
    </GlowSurface>);
}

function Home({go}){
  return <div><Hero go={go}/><Intention/><Courses go={go}/><Method/></div>;
}
Object.assign(window,{Home});