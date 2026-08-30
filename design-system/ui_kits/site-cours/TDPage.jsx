const {SidebarNav,Breadcrumb,ChapterHeader,Admonition,SectionLead,Badge,Tag,Button,Icon,Card,Checkbox,Checklist,DocNav,Reveal,Stat}=window.DS;

function Consigne({n,title,children,rendu}){
  return (
    <li style={{display:"grid",gridTemplateColumns:"44px 1fr",gap:"var(--sp-5)",padding:"var(--sp-6) 0",borderTop:"1px solid var(--border-subtle)"}}>
      <span style={{font:"var(--type-code)",fontSize:"var(--fs-xl)",color:"var(--accent-strong)",fontWeight:"var(--fw-medium)",lineHeight:1}}>{String(n).padStart(2,"0")}</span>
      <div>
        <h3 style={{font:"var(--type-h3)",fontSize:"var(--fs-lg)",marginBottom:"var(--sp-3)"}}>{title}</h3>
        <div style={{font:"var(--type-body)",fontSize:"var(--fs-base)",color:"var(--text-body)",maxWidth:"var(--measure)"}}>{children}</div>
        {rendu&&<div style={{marginTop:"var(--sp-3)",display:"flex",gap:"var(--sp-2)",alignItems:"baseline",font:"var(--type-code)",fontSize:12,color:"var(--violet-700)"}}>
          <span style={{textTransform:"uppercase",letterSpacing:"var(--ls-caps)",fontWeight:"var(--fw-semibold)"}}>À noter</span>
          <span style={{color:"var(--text-muted)"}}>{rendu}</span></div>}
      </div>
    </li>);
}

function TDPage(){
  const [active,setActive]=React.useState("td1");
  return (
    <div style={{maxWidth:"var(--page-max)",margin:"0 auto",padding:"0 var(--sp-6)",display:"grid",gridTemplateColumns:"var(--sidebar-w) minmax(0,1fr)",gap:"var(--sp-10)"}}>
      <aside style={{borderRight:"1px solid var(--border-subtle)",padding:"var(--sp-8) var(--sp-4) var(--sp-8) 0",position:"sticky",top:64,alignSelf:"start",height:"calc(100vh - 64px)",overflow:"auto"}}>
        <div style={{font:"var(--type-code)",fontSize:12,color:"var(--text-faint)",padding:"0 var(--sp-3)",marginBottom:"var(--sp-5)"}}>DEUST APSL · Biomécanique</div>
        <SidebarNav sections={window.SOMMAIRE} activeId={active} onSelect={setActive}/>
      </aside>

      <article style={{padding:"var(--sp-8) 0 var(--sp-12)",minWidth:0,maxWidth:900}}>
        <ChapterHeader style={{marginBottom:"var(--sp-10)"}} objectivesLabel="Objectifs de la séance"
          breadcrumb={<Breadcrumb items={[{label:"DEUST APSL",href:"#"},{label:"Biomécanique",href:"#"},{label:"TD 1"}]}/>}
          title="TD 1 — Objectiver une marche"
          meta={<><Badge tone="violet">TD</Badge><Badge tone="neutral">Binômes</Badge>
            <span style={{font:"var(--type-code)",fontSize:12,color:"var(--text-faint)"}}>rattaché au chapitre 1 · sections 1.2 et 1.6</span></>}
          actions={<Button size="sm" variant="outline" iconLeft={<Icon name="download" size={14}/>}>Fiche de mesure</Button>}>
          Ce TD met en pratique la boucle vue en 1.2 : passer d'une impression à une mesure. Vous conduirez un test de vitesse de marche sur 10 mètres, vous confronterez vos valeurs à celles des autres binômes, et vous en discuterez la reproductibilité. À la fin, vous devez savoir mener ce test et interpréter la valeur obtenue au regard des données normatives.
        </ChapterHeader>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--sp-4)",margin:"var(--sp-6) 0 var(--sp-10)"}}>
          <Card eyebrow="Ce que vous allez réaliser" title="Six passages chronométrés" accent="teal">
            Un couloir de 14 m (2 m d'accélération, 10 m utiles, 2 m de décélération), un chronomètre, trois passages à allure confortable et trois à allure rapide, en alternant les rôles.
          </Card>
          <Card eyebrow="Ce que vous rendrez" title="Une fiche de mesure par binôme" accent="violet">
            Valeurs brutes des six passages, moyenne par allure, écart entre les deux allures, et une phrase d'interprétation replaçant la personne dans les données normatives de son âge.
          </Card>
        </div>

        <h2 style={{font:"var(--type-h2)",letterSpacing:"var(--ls-tight)",margin:"0 0 var(--sp-2)"}}>Consignes</h2>
        <p style={{font:"var(--type-small)",color:"var(--text-muted)",marginTop:0}}>Travaillez en binôme, dans l'ordre. Chaque consigne se suffit à elle-même : si vous êtes bloqué, reprenez la section du cours indiquée.</p>
        <ol style={{listStyle:"none",margin:"var(--sp-6) 0 0",padding:0}}>
          <Consigne n={1} title="Matérialisez le couloir de mesure" rendu="la longueur exacte de vos 10 m utiles, mesurée au décamètre">
            Repérez au sol quatre lignes : départ, début des 10 m chronométrés, fin des 10 m, arrivée. Les 2 m avant et après servent à ce que la mesure porte sur une marche à vitesse stabilisée. Vérifiez que les deux lignes intermédiaires sont visibles depuis la position du chronométreur.
          </Consigne>
          <Consigne n={2} title="Fixez votre consigne verbale — et ne la changez plus" rendu="la formulation exacte employée, mot pour mot">
            La consigne donnée au marcheur fait partie du protocole : « marchez à votre allure habituelle » et « marchez normalement » ne produisent pas les mêmes valeurs. Choisissez une formulation pour l'allure confortable, une pour l'allure rapide, et répétez-les à l'identique à chaque passage.
          </Consigne>
          <Consigne n={3} title="Réalisez trois passages à allure confortable" rendu="les trois temps bruts, en secondes, sans en écarter aucun">
            Le chronométreur déclenche au franchissement de la première ligne intermédiaire par le pied d'appui, et arrête au franchissement de la seconde. Le marcheur ne s'arrête pas sur la ligne : il poursuit jusqu'à l'arrivée. Laissez au moins 30 s de récupération entre les passages.
          </Consigne>
          <Consigne n={4} title="Répétez à allure rapide" rendu="les trois temps bruts de la seconde série">
            Même protocole, consigne d'allure rapide — sans course. Puis inversez les rôles au sein du binôme et recommencez l'ensemble, de sorte que chacun soit mesuré.
          </Consigne>
          <Consigne n={5} title="Convertissez et traitez vos données" rendu="moyenne par allure, écart maximal intra-série, écart entre les deux allures">
            Convertissez chaque temps en vitesse (v = d / t, avec d = 10 m). Calculez la moyenne de chaque série, puis l'écart entre le passage le plus rapide et le plus lent d'une même série. Que vous dit cet écart sur la reproductibilité de votre protocole ?
          </Consigne>
          <Consigne n={6} title="Interprétez, en une phrase" rendu="votre phrase d'interprétation, sur la fiche">
            Situez la valeur obtenue par rapport aux données normatives de l'âge et du sexe de la personne mesurée (section 1.2.3 du cours). Formulez une phrase que vous pourriez transmettre à un collègue : la grandeur, sa valeur, son unité, et ce qu'elle situe.
          </Consigne>
        </ol>

        <Admonition kind="attention" style={{margin:"var(--sp-8) 0"}}>
          Aucune donnée mesurée pendant ce TD ne concerne une personne vulnérable : vous vous mesurez entre vous. Si vous reproduisez ce protocole en stage auprès de séniors, l'accord de la personne et celui de l'équipe encadrante sont un préalable.
        </Admonition>

        <h2 style={{font:"var(--type-h2)",letterSpacing:"var(--ls-tight)",margin:"var(--sp-12) 0 var(--sp-4)"}}>Matériel à prévoir</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px var(--sp-6)",marginBottom:"var(--sp-6)"}}>
          {["Un chronomètre par binôme (le téléphone convient)","Un décamètre ou quatre plots de repérage","La fiche de mesure imprimée, ou un tableur","Des chaussures de sport — vous marcherez"].map(x=><Checkbox key={x} label={x}/>)}
        </div>

        <h2 style={{font:"var(--type-h2)",letterSpacing:"var(--ls-tight)",margin:"var(--sp-12) 0 var(--sp-4)"}}>À préparer avant la séance</h2>
        <div style={{display:"flex",flexDirection:"column",gap:"var(--sp-3)"}}>
          <Reveal index="1" question="Relisez la section 1.2 : quelles sont les trois propriétés d'une mesure ?">
            Reproductible (le même protocole redonne une valeur proche), transmissible (elle garde le même sens pour tous), comparable (à des mesures antérieures et à des données normatives).
          </Reveal>
          <Reveal index="2" question="Quelle est la vitesse de marche confortable moyenne d'une femme de 75 ans ?">
            Environ 1,13 m/s entre 70 et 79 ans, contre environ 0,94 m/s entre 80 et 99 ans. Ces ordres de grandeur serviront de repère pour interpréter vos mesures.
          </Reveal>
          <Reveal index="3" tone="violet" question="Pourquoi prévoir 2 m avant et après les 10 m chronométrés ?">
            Pour que la mesure porte sur une marche à vitesse stabilisée : les premières et les dernières foulées sont des phases d'accélération et de décélération, qui feraient baisser artificiellement la vitesse mesurée.
          </Reveal>
        </div>

        <Checklist style={{margin:"var(--sp-10) 0 0"}} title="À la fin de ce TD, je dois être capable de…" items={[
          "Mettre en place un couloir de mesure de vitesse de marche sur 10 m.",
          "Énoncer une consigne verbale reproductible et expliquer pourquoi elle compte.",
          "Convertir un temps en vitesse et calculer un écart intra-série.",
          "Interpréter une vitesse de marche au regard des données normatives."]}/>

        <DocNav style={{marginTop:"var(--sp-10)"}} prev={{label:"Chapitre",title:"1.9 Synthèse et ouverture"}} next={{label:"Séance suivante",title:"TD 2 — Analyse vidéo"}}/>
      </article>
    </div>);
}
Object.assign(window,{TDPage});