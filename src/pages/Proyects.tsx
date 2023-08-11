import website from "../images/website.png";
import pc from "../images/cv-computer.jpg"
import login from "../images/login.png"
import pelis from "../images/peliculas.png"
import calculadora from "../images/calculadora.png"

function Projects() {
  return (
    <div   className=" w-full h-full bg-cover rounded-t-lg"
    style={{ backgroundImage: `url(${pc})` }} >
      <header className="text-center py-10 text-4xl font-semibold">
        <h1 className="text-white">Mis Proyectos</h1>
      </header>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <article className="border-2 bg-slate-200 text-center rounded-xl p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Página website.com
            </h2>
            <p className="text-gray-600">Hecho con HTML y CSS</p>
            <div className="flex justify-center mt-4">
              <img
                className="w-72 h-36 object-cover"
                src={website}
                alt="Website"
              />
            </div>
            <div className="py-5">
              <a 
                href="https://github.com/jaiderarevalo/first-page-html-css.git"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 bg-blue-600 rounded-2xl hover:bg-black duration-500 hover:text-white px-14 py-2 hover:underline"
              >
                Ver
              </a>
            </div>
          </article>

          <article className="border-2 bg-slate-200 text-center rounded-xl p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Página login basico
            </h2>
            <p className="text-gray-600">Hecho con HTML y CSS</p>
            <div className="flex justify-center mt-4">
              <img
                className="w-72 h-36 object-cover"
                src={login}
                alt="login"
              />
            </div>
            <div className="py-5">
              <a 
                href="https://github.com/jaiderarevalo/login-1.git"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 bg-blue-600 rounded-2xl hover:bg-black duration-500 hover:text-white px-14 py-2 hover:underline"
              >
                Ver
              </a>
            </div>
          </article>

        <article className="border-2 bg-slate-200 text-center rounded-xl p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Calculadora
            </h2>
            <p className="text-gray-600">Hecho con TypeScript,JavaScript,HTML,vite,tailwindcss </p>
            <div className="flex justify-center mt-4">
              <img
                className="w-72 h-36 object-cover"
                src={calculadora}
                alt="calculadora"
              />
            </div>
            <div className="py-5">
              <a 
                href="https://github.com/jaiderarevalo/Calculadora.git"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 bg-blue-600 rounded-2xl hover:bg-black duration-500 hover:text-white px-14 py-2 hover:underline"
              >
                Ver
              </a>
            </div>
          </article>
        <article className="border-2 bg-slate-200 text-center rounded-xl p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Buscador de peliculas 
            </h2>
            <p className="text-gray-600">Hecho con HTML,tailwind y CSS</p>
            <div className="flex justify-center mt-4">
              <img
                className="w-72 h-36 object-cover"
                src={pelis}
                alt="peliculas"
              />
            </div>
            <div className="py-5">
       
              <a 
                href="https://github.com/jaiderarevalo/first-page-html-css.git"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 bg-blue-600 rounded-2xl hover:bg-black duration-500 hover:text-white px-14 py-2 hover:underline"
              >
                Ver
              </a>
            </div>
          </article>
           <article className="border-2 bg-slate-200 text-center rounded-xl p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Replica de la web zapatoca
            </h2>
            <p className="text-gray-600">Hecho con HTML,tailwindcss</p>
            <div className="flex justify-center mt-4">
              <img
                className="w-72 h-36 object-cover"
                src={pelis}
                alt="peliculas"
              />
            </div>
            <div className="py-5">
       
              <a 
                href="https://github.com/jaiderarevalo/first-page-html-css.git"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 bg-blue-600 rounded-2xl hover:bg-black duration-500 hover:text-white px-14 py-2 hover:underline"
              >
                Ver
              </a>
            </div>
          </article>
      
      
        </div>
      </div>
    </div>
  );
}

export default Projects;
