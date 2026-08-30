const {SidebarNav,Breadcrumb,ChapterHeader,Admonition,SectionLead,Application,FurtherReading,Checklist,GlossaryBox,FigurePanel,Reveal,Quiz,Stat,StepList,DocNav,Badge,Tag,Button,Icon,Reference,Tabs}=window.DS;

function Toc({items,active}){
  return (
    <nav style={{position:"sticky",top:88,alignSelf:"start"}}>
      <div style={{font:"var(--type-eyebrow)",textTransform:"uppercase",letterSpacing:"var(--ls-caps)",color:"var(--text-faint)",marginBottom:12}}>Sur cette page</div>
      <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:9,borderLeft:"1px solid var(--border-subtle)"}}>
        {items.map(([t,d],i)=>(
          <li key={i} style={{paddingLeft:12+d*12,marginLeft:-1,borderLeft:i===active?"2px solid var(--accent)":"2px solid transparent"}}>
            <a href="#" style={{font:"var(--type-small)",fontSize:13,color:i===active?"var(--text-link)":"var(--text-muted)",textDecoration:"none"}}>{t}</a></li>))}
      </ul>
      <div style={{marginTop:"var(--sp-6)",paddingTop:"var(--sp-4)",borderTop:"1px solid var(--border-subtle)",display:"flex",flexDirection:"column",gap:8}}>
        <a href="#" style={{font:"var(--type-code)",fontSize:12,color:"var(--text-muted)",display:"flex",alignItems:"center",gap:6,textDecoration:"none"}}><Icon name="download" size={13}/>Télécharger le poly</a>
        <a href="#" style={{font:"var(--type-code)",fontSize:12,color:"var(--text-muted)",display:"flex",alignItems:"center",gap:6,textDecoration:"none"}}><Icon name="alert-triangle" size={13}/>Signaler une erreur</a>
      </div>
    </nav>);
}

function SectionHead({num,title}){
  return (
    <div style={{margin:"var(--sp-12) 0 var(--sp-4)"}}>
      <span style={{display:"block",width:28,height:3,background:"var(--rule-gradient)",marginBottom:"var(--sp-3)"}}/>
      <h2 style={{font:"var(--type-h2)",letterSpacing:"var(--ls-tight)"}}><span style={{font:"var(--type-code)",fontSize:"var(--fs-lg)",color:"var(--accent-strong)",marginRight:12}}>{num}</span>{title}</h2>
    </div>);
}

const P={font:"var(--type-body)",maxWidth:"var(--measure)",color:"var(--text-body)"};

function DocPage({go}){
  const [active,setActive]=React.useState("s12");
  const [mode,setMode]=React.useState("reveal");
  return (
    <div style={{maxWidth:"var(--page-max)",margin:"0 auto",padding:"0 var(--sp-6)",display:"grid",gridTemplateColumns:"var(--sidebar-w) minmax(0,1fr) var(--toc-w)",gap:"var(--sp-10)"}}>
      <aside style={{borderRight:"1px solid var(--border-subtle)",padding:"var(--sp-8) var(--sp-4) var(--sp-8) 0",position:"sticky",top:64,alignSelf:"start",height:"calc(100vh - 64px)",overflow:"auto"}}>
        <div style={{font:"var(--type-code)",fontSize:12,color:"var(--text-faint)",padding:"0 var(--sp-3)",marginBottom:"var(--sp-5)"}}>DEUST APSL · Biomécanique</div>
        <SidebarNav sections={window.SOMMAIRE} activeId={active} onSelect={setActive}/>
      </aside>

      <article style={{padding:"var(--sp-8) 0 var(--sp-12)",minWidth:0}}>
        <ChapterHeader style={{marginBottom:"var(--sp-10)"}}
          breadcrumb={<Breadcrumb items={[{label:"DEUST APSL",href:"#"},{label:"Biomécanique",href:"#"},{label:"Chapitre 1 — Cinématique"},{label:"1.2 Pourquoi mesurer ?"}]}/>}
          title="Pourquoi mesurer ? De l'impression à la donnée"
          meta={<><Badge>CM 01</Badge><Badge tone="violet">Section 1.2</Badge><Badge tone="neutral">≈ 12 min</Badge>
            <span style={{font:"var(--type-code)",fontSize:12,color:"var(--text-faint)"}}>mis à jour le 17 août 2026</span></>}
          actions={<Button size="sm" variant="outline" iconLeft={<Icon name="download" size={14}/>}>Poly PDF</Button>}>
          La section 1.1 a défini la biomécanique : l'étude des forces et de leurs effets sur le vivant. Celle-ci fait la transition vers votre future profession : à quoi sert d'étudier ces forces — objectiver un mouvement, prendre des décisions éclairées, vérifier l'effet de ces décisions. À la fin de cette section, vous devez être capable d'expliquer ce qu'« objectiver » veut dire, de citer les limites de l'impression, et de dérouler la boucle mesurer → interpréter → cibler → intervenir → re-mesurer sur un exemple concret.
        </ChapterHeader>

        <SectionHead num="1.2.1" title="L'impression : utile, mais pas suffisante"/>
        <p style={P}>Partons du terrain. Vous encadrez un groupe de séniors depuis plusieurs mois et, un matin, une pensée vous traverse : « Mémé Jacqueline marche moins bien qu'avant ». C'est une <strong>impression</strong> — et une impression, c'est déjà précieux : c'est votre œil de professionnel qui a repéré qu'un changement s'est produit.</p>
        <p style={P}>Le problème, c'est qu'on ne peut pas s'arrêter là, parce que nos sens et notre mémoire ne sont pas des instruments de mesure :</p>
        <ul style={{...P,paddingLeft:"1.2em"}}>
          <li style={{marginBottom:8}}><strong>L'œil repère, mais ne quantifie pas.</strong> Il vous dit que la marche est « plus lente » ; pas de combien.</li>
          <li style={{marginBottom:8}}><strong>L'œil est influencé par le contexte.</strong> La même marche paraît différente selon le couloir, l'âge — et selon ce que vous vous attendez à voir.</li>
          <li style={{marginBottom:8}}><strong>La mémoire ne garde pas une trace fidèle.</strong> Trois mois plus tard, vous vous souviendrez de l'impression, pas de la marche.</li>
          <li><strong>Une impression ne se transmet pas.</strong> « Elle marche moins bien » ne dit pas quel paramètre est en cause.</li>
        </ul>

        <SectionHead num="1.2.2" title="Objectiver : transformer l'impression en mesure"/>
        <p style={P}><strong>Objectiver</strong>, c'est transformer une impression en <strong>mesure</strong> — une grandeur définie, exprimée dans une unité. Trois exemples de <em>paramètres biomécaniques</em>, ces grandeurs mesurables qui décrivent le mouvement ou les forces qui le produisent :</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"var(--sp-3)",margin:"var(--sp-5) 0"}}>
          <Stat label="Vitesse de marche" value="1,12" unit="m/s"/>
          <Stat label="Longueur de pas" value="0,58" unit="m" tone="violet"/>
          <Stat label="Flexion de hanche" value="24" unit="°"/>
        </div>
        <p style={P}>La mesure possède trois propriétés que l'impression n'aura jamais : elle est <strong>reproductible</strong>, elle <strong>se transmet</strong>, et elle <strong>se compare</strong> — à des mesures antérieures et à des <em>données normatives</em>.</p>
        <Admonition kind="attention" style={{margin:"var(--sp-6) 0"}}>Une valeur isolée n'est pas une alerte. Ce qui alerte, c'est l'amplitude de la perte rapportée au temps, et l'écart aux valeurs habituelles du même âge et du même sexe.</Admonition>

        <FigurePanel style={{margin:"var(--sp-8) 0"}} src="../../assets/illustrations/patineuse-translation-rectiligne.jpg" alt="Schéma de repères cinématiques"
          ratio="16 / 10" number="1.3" caption="Mesurer la même grandeur à intervalles réguliers transforme une impression de déclin en trajectoire quantifiée." source="diaporama CM1, dia 12 — figure à ré-exporter"/>

        <SectionHead num="1.2.3" title="Les quatre usages professionnels de la mesure"/>
        <StepList style={{margin:"var(--sp-6) 0"}} steps={[
          {label:"Mesurer",detail:"Objectiver l'état présent : une valeur datée, comparable, partageable."},
          {label:"Suivre",detail:"Répéter la mesure pour dessiner une trajectoire."},
          {label:"Cibler",detail:"La mesure ne dit pas seulement que ça se dégrade : elle dit où."},
          {label:"Ré-évaluer",detail:"Même protocole, même grandeur — l'intervention fonctionne, ou non."}]}/>
        <p style={P}>Mises bout à bout, ces étapes forment une boucle : <strong>mesurer → interpréter → cibler → intervenir → re-mesurer</strong>. Elle sera le squelette de votre pratique tout au long de ce cours.</p>

        <Application style={{margin:"var(--sp-10) 0 var(--sp-5)"}} subject={'du « il saute moins » au suivi de la détente'}>
          Un préparateur physique trouve qu'un volleyeur « saute moins haut qu'en début de saison ». Même situation que Mémé Jacqueline : une impression, précieuse comme signal d'alerte, inutilisable comme donnée. On objective — la détente verticale se mesure en centimètres, par un test standardisé —, on suit la valeur, on cherche la cause, on cible, puis on re-mesure. Seuls changent le public et la grandeur mesurée.
        </Application>
        <FurtherReading style={{margin:"var(--sp-5) 0"}}>
          Objectiver n'exige pas un laboratoire : un chronomètre et un couloir suffisent pour mesurer une vitesse de marche. Les protocoles instrumentés (plateforme de force, capture optoélectronique) apportent de la précision, pas nécessairement de la pertinence clinique.
        </FurtherReading>

        <GlossaryBox style={{margin:"var(--sp-8) 0"}} entries={[
          {term:"Impression",def:"Jugement qualitatif fourni par les sens et la mémoire. Utile comme signal d'alerte, mais non quantifiée et non transmissible."},
          {term:"Objectiver",def:"Transformer une impression en mesure : une grandeur définie, exprimée dans une unité."},
          {term:"Données normatives",def:"Valeurs habituellement mesurées dans un groupe de référence (même âge, même sexe)."},
          {term:"Biais de confirmation",def:"Tendance à interpréter l'information dans le sens de ce que l'on croit déjà. Il fausse l'observation non instrumentée."}]}/>

        <Checklist style={{margin:"var(--sp-8) 0 var(--sp-6)"}} items={[
          "Expliquer ce qu'« objectiver » veut dire et donner deux paramètres biomécaniques avec leur unité.",
          "Citer les quatre limites de l'impression, et pourquoi elle reste utile comme signal d'alerte.",
          "Expliquer pourquoi une mesure est reproductible, transmissible et comparable.",
          "Dérouler la boucle mesurer → interpréter → cibler → intervenir → re-mesurer."]}/>

        <div style={{marginTop:"var(--sp-10)",padding:"var(--sp-6)",border:"1px solid var(--border-subtle)",borderRadius:"var(--radius-lg)",background:"var(--bg-subtle)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"var(--sp-4)",marginBottom:"var(--sp-5)",flexWrap:"wrap"}}>
            <div>
              <div style={{font:"var(--type-eyebrow)",textTransform:"uppercase",letterSpacing:"var(--ls-caps)",color:"var(--accent-strong)"}}>Vérifiez votre compréhension</div>
              <p style={{font:"var(--type-small)",color:"var(--text-muted)",margin:"6px 0 0"}}>Répondez de tête, puis déroulez la réponse. Aucune donnée n'est envoyée.</p>
            </div>
            <Tabs items={[{value:"reveal",label:"Réponses cachées"},{value:"qcm",label:"QCM"}]} value={mode} onChange={setMode} style={{borderBottom:"none"}}/>
          </div>
          {mode==="reveal"?(
            <div style={{display:"flex",flexDirection:"column",gap:"var(--sp-3)"}}>
              <Reveal index="a." question="Quelle est la différence entre une impression et une donnée objectivée ? Donnez un exemple de chacune à propos d'une même marche.">
                L'impression est un jugement qualitatif issu des sens et de la mémoire (« elle marche moins bien ») ; la donnée objectivée est une grandeur mesurée dans une unité définie (« vitesse de marche : 1,12 m/s »). La première alerte, la seconde se compare et se transmet.
              </Reveal>
              <Reveal index="b." question="Vrai ou faux : « une impression n'a aucune valeur professionnelle ». Justifiez.">
                <strong>Faux.</strong> L'impression est le signal d'alerte : c'est l'œil du professionnel qui repère qu'un changement s'est produit. Elle est insuffisante seule, mais c'est elle qui déclenche la mesure.
              </Reveal>
              <Reveal index="c." tone="violet" question="La vitesse de marche d'une résidente est mesurée à 1,0 m/s. Ce chiffre suffit-il à conclure que sa marche se dégrade ?">
                <strong>Non.</strong> Une valeur isolée ne dit rien d'une évolution. Il faut la comparer à ses propres mesures antérieures (de combien, en combien de temps) et aux données normatives de son âge et de son sexe.
              </Reveal>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:"var(--sp-3)"}}>
              <Quiz index="1" question="« Objectiver », c'est :"
                options={[{label:"donner son avis de professionnel sur un mouvement"},{label:"transformer une impression en mesure exprimée dans une unité",correct:true},{label:"comparer deux personnes entre elles"}]}
                explanation="Objectiver = passer d'un jugement qualitatif à une grandeur définie et exprimée dans une unité (m/s, cm, °)."/>
              <Quiz index="2" question="Parmi ces propositions, laquelle N'EST PAS une limite de l'impression ?"
                options={[{label:"elle ne quantifie pas"},{label:"elle est influencée par le contexte"},{label:"elle ne coûte rien à produire",correct:true},{label:"elle ne se transmet pas"}]}
                explanation="Le faible coût est justement un avantage de l'impression : elle reste un excellent signal d'alerte."/>
              <Quiz index="3" question="Une vitesse de marche mesurée une seule fois à 1,0 m/s permet de conclure à un déclin."
                options={[{label:"Vrai"},{label:"Faux — il faut une comparaison dans le temps ou aux données normatives",correct:true}]}
                explanation="C'est la comparaison — évolution personnelle et écart au groupe d'âge — qui constitue l'alerte, pas la valeur brute."/>
            </div>
          )}
        </div>

        <h2 style={{font:"var(--type-h2)",margin:"var(--sp-12) 0 var(--sp-4)"}}>Références</h2>
        {window.REFS.slice(0,3).map(r=><Reference key={r.title} {...r} href="#"/>)}
        <DocNav style={{marginTop:"var(--sp-10)"}} prev={{label:"Section précédente",title:"1.1 Qu'est-ce que la biomécanique ?"}} next={{label:"Section suivante",title:"1.3 Cinématique ou cinétique"}}/>
      </article>

      <div style={{padding:"var(--sp-8) 0"}}>
        <Toc active={1} items={[["1.2.1 L'impression",0],["1.2.2 Objectiver",0],["1.2.3 Quatre usages",0],["Glossaire",1],["Auto-évaluation",1],["Références",1]]}/>
      </div>
    </div>);
}
Object.assign(window,{DocPage});