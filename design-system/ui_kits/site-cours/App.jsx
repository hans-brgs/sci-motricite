function App(){
  const [route,setRoute]=React.useState("home");
  const [theme,setTheme]=React.useState("light");
  React.useEffect(()=>{document.documentElement.dataset.theme=theme;},[theme]);
  React.useEffect(()=>{window.scrollTo(0,0);},[route]);
  const {Header,Footer,Home,Catalog,DocPage,TDPage,Glossary}=window;
  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <Header route={route} go={setRoute} theme={theme} setTheme={setTheme}/>
      <main style={{flex:1}}>
        {route==="home"&&<Home go={setRoute}/>}
        {route==="catalog"&&<Catalog go={setRoute}/>}
        {route==="doc"&&<DocPage go={setRoute}/>}
        {route==="td"&&<TDPage/>}
        {route==="glossary"&&<Glossary/>}
      </main>
      <Footer/>
    </div>);
}
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);