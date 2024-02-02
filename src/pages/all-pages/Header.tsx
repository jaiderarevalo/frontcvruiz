import foto from "../../images/fotoDeveloper.jpeg";
import space from "../../images/star.jpg";
import logo from "../../images/logoo.png";
import git from "../../images/github.png";
import { Link } from "react-router-dom";
import IconsFont from "../../components/IconsFont";
import { faPhone } from "@fortawesome/free-solid-svg-icons";


function Header() {
  return (
    <div className="flex">
      <header
        className="flex w-full h-96 bg-cover rounded-t-lg  shadow-xl shadow-gray-700"
        style={{ backgroundImage: `url(${space})` }}
      >
        <article className="p-10">
          <img className="w-44 h-32 rounded-full" src={logo} />
        </article>
        <article className="h-96 flex items-center m-auto">
          <img
            className="rounded-full h-80 w-72"
            src={foto}
            alt="Foto de perfil"
          />
        </article>
        <article className="m-auto  justify-center ml-4">
          <h1 className=" font-semibold text-white text-3xl">
            Hola, Soy Jaider Ruiz
          </h1>
          <p className="mt-2 w-96 text-white">
            "Programador Full Stack con una pasión por crear soluciones desde
            cero y perfeccionar las existentes, siempre en búsqueda de la
            excelencia técnica."
          </p>
          <div className="text-white pt-2">
          <h1> <IconsFont icon={faPhone} className="pr-2"/>+57 3154420690</h1>
          </div>
          <div className="pt-2 text-white flex">
            <div><img src={git} className="h-6 w-6 rounded-full bg-white" /></div>
            <a href="https://github.com/jaiderarevalo">/jaiderarevalo</a>
          </div>
        </article>
        <Link to="/login">ing</Link>
      </header>
    </div>
  );
}

export default Header;
