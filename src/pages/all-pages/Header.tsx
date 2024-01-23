import foto from "../../images/fotoDeveloper.jpeg";
import space from "../../images/star.jpg";
import logo from "../../images/logoo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex">
      <header
        className="flex w-full h-96 bg-cover rounded-t-lg"
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
            Hola, mi nombre es Jaider Ruiz
          </h1>
          <p className="mt-2 w-96 text-white">
            "Programador Full Stack con una pasión por crear soluciones desde
            cero y perfeccionar las existentes, siempre en búsqueda de la
            excelencia técnica."
          </p>
        </article>
        <Link to="/login">ing</Link>
      </header>
    </div>
  );
}

export default Header;
