/* Résolution paresseuse des composants du design system.
   Chaque nom est un wrapper qui va chercher le composant réel au moment du
   rendu ; s'il n'est pas encore là (bundle en cours de compilation), il
   réessaie jusqu'à ce qu'il apparaisse, puis se re-rend tout seul. */
(function(){
  var names=["Admonition","Application","ChapterHeader","Checklist","FurtherReading","SectionLead","Badge","Breadcrumb","Button","Card","Checkbox","CodeBlock","Definition","DocNav","Figure","FigurePanel","GlossaryBox","GlowSurface","Icon","Input","Quiz","Reference","Reveal","Select","SidebarNav","Stat","StepList","Tabs","Tag","ThemeToggle"];
  var g={};
  names.forEach(function(n){
    function C(props){
      var tick=React.useState(0);
      var R=(window.MotricitDesignSystem_ea5604||{})[n];
      React.useEffect(function(){
        if(R) return;
        var t=setInterval(function(){
          if((window.MotricitDesignSystem_ea5604||{})[n]){clearInterval(t);tick[1](function(v){return v+1});}
        },250);
        return function(){clearInterval(t)};
      },[R]);
      if(!R) return null;
      return React.createElement(R,props,props&&props.children);
    }
    C.displayName=n;
    g[n]=C;
  });
  window.DS=g;
})();