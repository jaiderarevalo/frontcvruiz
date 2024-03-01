import foto from "@/images/fotoDeveloper.jpeg";
import space from "@/images/star.jpg";
import logo from "@/images/logoo.png";
import git from "@/images/github.png";
import { Link } from "react-router-dom";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import IconsFont from "@/components/IconsFont";

function Header() {
  return (
    <div className="xl:flex">
      <header
        className=" xl:w-full xl:h-96 xl:flex bg-cover rounded-t-lg   shadow-xl shadow-gray-700"
        style={{ backgroundImage: `url(${space})` }}
      >
        <div className="xl:flex grid grid-cols-2 h-56 xl:w-full   ">
          <div className="xl:p-10 h-52 md:justify-start md:pl-10 flex justify-center pt-10 ">
            <img className="xl:w-44 xl:h-32 rounded-full h-20 xl:p-1  " src={logo} />
          </div>
          <div className="  xl:h-96 flex items-center m-auto">
            <img
              className="xl:rounded-full md:rounded-full md:h-96 md:w-96 rounded-xl xl:h-80 h-40 w-40 xl:w-72"
              src={foto}
              alt="Foto de perfil"
            />
          </div>
        </div>
        <article className="xl:m-auto py-10 justify-center ml-4">
          <h1 className=" font-semibold md:pl-5 text-white text-3xl">
            Hola, Soy Jaider <Link to="/login">Ruiz</Link>
          </h1>
          <p className="mt-2  w-96 md:pl-5 md:px-20 text-white">
            "Programador Full Stack con una pasión por crear soluciones desde
            cero y perfeccionar las existentes, siempre en búsqueda de la
            excelencia técnica."
          </p>
          <div className="text-white md:pl-5 pt-2">
            <h1>
              {" "}
              <IconsFont icon={faPhone} className="pr-2" />
              +57 3154420690
            </h1>
          </div>
          <div className="pt-2 md:pl-5 text-white flex">
            <div>
              <img src={git} className="h-6 w-6 rounded-full bg-white" />
            </div>
            <a href="https://github.com/jaiderarevalo">/jaiderarevalo</a>
          </div>
        </article>
        
      </header>
    </div>
  );
}

export default Header;
