import "./App.css";
import FormProyect from "./pages/FormProyect";
import FormRegister from "./pages/FormRegister";
import Header from "./pages/Header";
import Login from "./pages/Login";
import Proyects from "./pages/Proyects";
import Skills from "./pages/skills";


function App() {

  return (
    <div>
      <Header />
      <FormRegister/>
      <FormProyect />
      <Proyects />
      <Skills />
    </div>
  );
}

export default App;
