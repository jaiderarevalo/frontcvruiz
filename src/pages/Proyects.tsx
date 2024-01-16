import pc from "../images/cv-computer.jpg";
import { useEffect } from "react";
import { URL } from "../Config";
import { useProjectContext } from "../context/ProjectContext";
import Swal from "sweetalert2";

function Projects() {
  const { projects, fetchAndSetUsers, deleted } = useProjectContext();

  useEffect(() => {
    fetchAndSetUsers();
  }, []);

  const handleDeleteConfirmation = async (id: number) => {
    async function handleClick() {
      const result = await Swal.fire({
        title: "¿estas seguro de eliminar?",
        text: "No podras recuperar lo eliminado !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si , deseo eliminar!",
      });

      if (result.isConfirmed) {
        await Swal.fire("Eliminado!", "ah sido eliminado", "success");

        deleted(id);
      }
    }

    handleClick();
  };
  return (
    <div
      className="w-full h-full bg-cover rounded-t-lg"
      style={{ backgroundImage: `url(${pc})` }}
    >
      <header className="text-center py-10 text-4xl font-semibold">
        <h1 className="text-white">Mis Proyectos</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto px-6">
        {projects.map((user) => (
          <div className="" key={user.id}>
            <article className="border-2 bg-slate-200 text-center rounded-xl p-4">
              <section className="flex justify-end items-center">
                <article className="">
                  <button className="text-2xl bg-yellow-400  rounded-xl">
                    <i className="bx bx-edit"></i>
                  </button>
                </article>
                <article className="px-2">
                  <button
                    className="text-2xl bg-red-500 rounded-xl  "
                    onClick={() =>
                      user.id !== undefined && handleDeleteConfirmation(user.id)
                    }
                  >
                    <h1>
                      <i className="bx bx-x"></i>
                    </h1>
                  </button>
                </article>
              </section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {user.title}
              </h2>
              <h1></h1>
              <p className="text-gray-600">{user.description}</p>
              <div className="flex justify-center mt-4">
                <img
                  className="w-72 h-36 object-cover"
                  src={`${URL}${user.image}`}
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
