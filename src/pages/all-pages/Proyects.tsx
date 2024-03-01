import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../Store/Slices";
import {
  DeleteProjectUser,
  createProjectUser,
  getOneProjectUser,
  getProjectUser,
  updateProjectUser,
} from "@/Store/actions/projects.actions";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { faEdit, faPlus, faRemove } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { useFormik } from "formik";
import IconsFont from "@/components/IconsFont";
import { setIsEdit } from "@/Store/Slices/projects.slice";
import appFirebase from "@/firebase/credenciales";
import { UpdateprojectInterface } from "@/interfaces/interface-project";
import Form from "@/components/Form";

const validationSchema = Yup.object({
  name: Yup.string().required("Nombre requerido"),
  description: Yup.string().required("Descripción requerida"),
});

const storage = getStorage(appFirebase);
const inialValuesState = {
  name: "",
  description: "",
  skills: "",
  image: "",
  repository: "",
};

const Proyects = () => {
  const { project, isEdit } = useSelector((root: RootState) => root.project);

  const { user } = useSelector((root: RootState) => root.auth);
  const [urlInDesc, setUrlInDesc] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] =
    useState<UpdateprojectInterface | null>(null);
  console.log("namessss", selectedProject);
  const inialValuesEdit = {
    name: selectedProject?.name,
    description: selectedProject?.description,
    skills: selectedProject?.skills,
    image: selectedProject?.image,
    repository: selectedProject?.repository,
  };
  const nuevoUuid = uuidv4();

  const dispatch = useAppDispatch();
  const ProjectsUserData = async () => {
    await dispatch<any>(getProjectUser());
  };
  useEffect(() => {
    ProjectsUserData();
  }, []);

  const removeSkill = async (id: string, imageUrl: string) => {
    // Eliminar la imagen de Firebase Storage
    await deleteImageFromFirebase(imageUrl);

    // Despachar la acción para eliminar la habilidad en la base de datos
    await dispatch(DeleteProjectUser(id));
    await dispatch(getProjectUser());
    // Si la eliminación en la base de datos es exitosa, actualizar el estado local
  };
  const deleteImageFromFirebase = async (imageUrl: string) => {
    const storage = getStorage();
    const imageRef = ref(storage, imageUrl);

    try {
      await deleteObject(imageRef);
    } catch (error) {
      console.error("Error al eliminar la imagen de Firebase Storage", error);
    }
  };

  const AllProjects = async () => {
    await dispatch(getProjectUser());
  };

  useEffect(() => {
    AllProjects();
  }, []);
  const onSubmit = async (data: any) => {
    if (isEdit) {
      const projectUpdate = {
        id: selectedProject?.id,
        name: data.name,
        description: data.description,
        skills: data.skills,
        image: urlInDesc || "",
        repository: data.repository,
      };
      const res = await dispatch(updateProjectUser({ body: projectUpdate }));
      if (res.meta.requestStatus === "fulfilled") {
        resetForm();
        await dispatch(getProjectUser());
        await dispatch(setIsEdit(false));
      }
    }

    if (!isEdit) {
      const projectData = {
        name: data.name,
        description: data.description,
        skills: data.skills,
        image: urlInDesc,
        repository: data.repository,
      };

      const res = await dispatch(createProjectUser(projectData));

      if (res.meta.requestStatus === "fulfilled") {
        resetForm();
        await dispatch(getProjectUser());
      }
    }

    //detectar el archivo
  };
  const fileHandler = async (e: any) => {
    const archivo = e.target.files[0] || '';
    if (archivo) {
      //cargarlo al storage de firebase
      const nameArch = `${nuevoUuid}`;
      const refArchivo = ref(storage, `documentos/${nameArch}`);

      try {
        //transformar el archivo a blob
        await uploadBytes(refArchivo, archivo);
        //obtener la url de la imagen
        const imageUrl = await getDownloadURL(refArchivo);
        setUrlInDesc(imageUrl);
      } catch (error) {
        console.error("Error al cargar y obtener la URL de la imagen", error);
      }
    }
  };
  const { values, handleChange, handleSubmit, resetForm, errors } = useFormik({
    initialValues: isEdit ? inialValuesEdit : inialValuesState,
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });
  const getOne = async (id: string) => {
    await dispatch(setIsEdit(true));
    const res = await dispatch(getOneProjectUser(id));
    setSelectedProject(res.payload as any);
  };
  return (
    <div className=" bg-cover rounded-t-lg my-10">
      {user?.role === "admin" && (
        <div className="flex items-center justify-center  xl:pt-10">
          <form
            onSubmit={handleSubmit}
            className="border-2 border-gray-400 shadow-xl shadow-gray-800 w-2/6 md:mx-32  px-12 rounded-lg py-10 "
          >
            <div className="flex">
              <h1 className=" py-4 m-auto text-3xl md:text-4xl font-extrabold">Proyecto</h1>
            </div>
            <div className="">
              <label className="md:text-xl">Nombre del Proyecto</label>
              <Form
                name="name"
                onChange={handleChange}
                placeholder="Nombre Proyecto"
                value={values.name}
                className="border-2 py-2  border-gray-400 rounded-lg w-full px-2"
              />
              <p>{errors && <p className="text-red-500">{errors.name}</p>}</p>
            </div>
            <div>
              <label className="md:text-xl">Descripción</label>
              <Form
                name="description"
                onChange={handleChange}
                placeholder="Descripcion"
                value={values.description}
                className="border-2 py-2  border-gray-400 rounded-lg w-full px-2"
              />
              <p>
                {errors && <p className="text-red-500">{errors.description}</p>}
              </p>
            </div>
            <div>
              <label className="md:text-xl">Habilidades</label>
              <Form
                name="skills"
                onChange={handleChange}
                placeholder="Habilidades"
                value={values.skills}
                className="border-2 py-2 border-gray-400 rounded-lg w-full px-2"
              />
              <p>{errors && <p className="text-red-500">{errors.skills}</p>}</p>
            </div>
            <div>
              <label className="md:text-xl">Repositorio</label>
              <Form
                name="repository"
                onChange={handleChange}
                placeholder="www.github.com/etc"
                value={values.repository as string}
                className="border-2 py-2 border-gray-400 rounded-lg w-full px-2"
              />
              <p>{errors && <p className="text-red-500">{errors.skills}</p>}</p>
            </div>
            <div>
              <label className="md:text-xl" >Imagen</label>
              <Form
                name="image"
                onChange={fileHandler}
                type="file"
                className="border-2 py-2  border-gray-400 rounded-lg w-full px-2"
              />
              <p>{errors && <p className="text-red-500">{errors.skills}</p>}</p>
            </div>
            <div className="flex mt-5">
              <button
                className="m-auto bg-gradient-to-tr from-red-500 to-blue-500 px-14 py-2 rounded-lg"
                type="submit"
              >
                {isEdit ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        </div>
      )}
      <div>
        <div className="my-10">
          <h1 className="text-center text-3xl font-extrabold">
            Proyectos Realizados
          </h1>
          {user?.role === "admin" && (
            <div className=" xl:pl-20 pl-10 py-2">
              <button
                className="flex"
                onClick={() => {
                  dispatch(setIsEdit(false));
                }}
              >
                <div className=" justify-center items-center ">
                  <IconsFont
                    className="bg-blue-600 ml-1 text-white 
                       h-7 w-7 rounded-full mt-2  "
                    icon={faPlus}
                  />
                </div>
                <div className=" pl-2 h-10 flex justify-center items-center ">
                  <p className="font-bold ">Crear</p>
                </div>
              </button>
            </div>
          )}
        </div>
        <div className="xl:grid xl:grid-cols-5 xl:gap-5 xl:mx-20 md:grid md:grid-cols-2 md:gap-5 mx-10">
          {Array.isArray(project) && project.length > 0 ? (
            project.map((project) => (
              <div className="py-3">
                {user?.role === "admin" && (
                  <div>
                    <button
                      onClick={() => {
                        removeSkill(project.id, project.image);
                      }}
                    >
                      <IconsFont
                        className="bg-red-600 w-5 h-5 rounded-full mt-2  "
                        icon={faRemove}
                      />
                    </button>
                    <button
                      onClick={() => {
                        getOne(project.id);
                      }}
                    >
                      <IconsFont
                        className="bg-yellow-600 w-5 h-5 rounded-full mx-2 mt-2  "
                        icon={faEdit}
                      />
                    </button>
                  </div>
                )}
                <div
                  key={project.id}
                  className="hover:bg-gray-300 py-5 h-96 px-3 rounded-xl border border-slate-600 shadow shadow-slate-600"
                >
                  <label className="font-bold text-base ">
                    Nombre del proyecto
                  </label>
                  <p>{project.name}</p>
                  <label className="font-bold text-base ">Habilidades</label>
                  <p>{project.skills}</p>
                  <label className="font-bold text-base ">Descripción</label>
                  <p>{project.description}</p>

                  <img
                    className="xl:w-64 xl:h-36 h-40 w-full rounded-lg pt-2"
                    alt="project o no hay imagen"
                    src={project.image}
                  />
                  <p className="flex pt-3">
                    <a
                      className="hover:text-red-500 m-auto duration-700"
                      href={project.repository}
                    >
                      Ver Repositorio
                    </a>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-4xl xl:text-xl">No tienes proyectos</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Proyects;
