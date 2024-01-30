import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../Store/Slices";
import {
  DeleteProjectUser,
  createProjectUser,
  getOneProjectUser,
  getProjectUser,
  updateProjectUser,
} from "../../Store/actions/projects.actions";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import IconsFont from "../../components/IconsFont";
import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import code from "../../images/code.jpg";
import appFirebase from "../../firebase/credenciales";
import {
  UpdateprojectInterface,
  projectInterface,
} from "../../interfaces/interface-project";
import { useFormik } from "formik";
import Form from "../../components/Form";
import { setIsEdit } from "../../Store/Slices/projects.slice";

const validationSchema = Yup.object({
  name: Yup.string().required("Nombre requerido"),
  description: Yup.string().required("Descripción requerida"),
  skills: Yup.string().required("Habilidades requeridas"),
});

const storage = getStorage(appFirebase);

const Proyects = () => {
  const { project, isEdit } = useSelector((root: RootState) => root.project);
  const [urlInDesc, setUrlInDesc] = useState<string | null>(null);

  const [projects, setProjects] = useState<any>([]);
  const [selectedProject, setSelectedProject] =
    useState<UpdateprojectInterface | null>(null);
  console.log("namessss", selectedProject?.id);
  const initialValues = {
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
    console.log("soy el id de removeprojects", id);

    // Eliminar la imagen de Firebase Storage
    await deleteImageFromFirebase(imageUrl);

    // Despachar la acción para eliminar la habilidad en la base de datos
    const res = await dispatch(DeleteProjectUser(id));

    // Si la eliminación en la base de datos es exitosa, actualizar el estado local
    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(getProjectUser());
    }

    console.log("respuesta de eliminacion", res);
  };
  const deleteImageFromFirebase = async (imageUrl: string) => {
    const storage = getStorage();
    const imageRef = ref(storage, imageUrl);

    try {
      await deleteObject(imageRef);
      console.log("Imagen eliminada de Firebase Storage");
    } catch (error) {
      console.error("Error al eliminar la imagen de Firebase Storage", error);
    }
  };

  const AllProjects = async () => {
    const res = await dispatch(getProjectUser());
    setProjects(res.payload);
  };

  useEffect(() => {
    AllProjects();
  }, []);
  const onSubmit = async (data: any) => {
    console.log("es la data update", data);
    if (isEdit) {
      const projectUpdate = {
        id: selectedProject?.id,
        name: data.name,
        description: data.description,
        skills: data.skills,
        image: urlInDesc,
        repository: data.repository,
      };
      console.log("proyectos todos campos", project);

      const res = await dispatch(updateProjectUser({body:projectUpdate}));
      console.log("respuesta al actualizar", res.payload);

      if (res.meta.requestStatus === "fulfilled") {
        await dispatch(getProjectUser());
      }
    } else {
      const project = {
        name: data.name,
        description: data.description,
        skills: data.skills,
        image: urlInDesc,
        repository: data.repository,
      };

      const res = await dispatch(createProjectUser(project));

      if (res.meta.requestStatus === "fulfilled") {
        await dispatch(getProjectUser());
      }
    }
    //detectar el archivo
  };
  const fileHandler = async (e: any) => {
    const archivo = e.target.files[0];
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
  const {
    values,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    resetForm,
    errors,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });
  const getOne = async (id: string) => {
    const res = await dispatch(getOneProjectUser(id));
    await dispatch(setIsEdit(true));
    setSelectedProject(res.payload);
  };
  return (
    <div className=" bg-cover rounded-t-lg my-10">
      <div className="flex pt-10 ">
        <form
          onSubmit={handleSubmit}
          className="m-auto border-2 border-gray-400 shadow-xl shadow-gray-800 w-2/6  px-12 rounded-lg py-10 "
        >
          <div className="flex">
            <h1 className=" py-4 m-auto text-3xl font-extrabold">Proyecto</h1>
          </div>
          <div className="">
            <label className="">Nombre del Proyecto</label>
            <Form
              name="name"
              onChange={handleChange}
              placeholder="Nombre Proyecto"
              value={values.name}
            />
            <p>{errors && <p>{errors.name}</p>}</p>
          </div>
          <div>
            <label>Descripción</label>
            <Form
              name="description"
              onChange={handleChange}
              placeholder="Descripcion"
              value={values.description}
            />
            <p>{errors && <p>{errors.description}</p>}</p>
          </div>
          <div>
            <label>Habilidades</label>
            <Form
              name="skills"
              onChange={handleChange}
              placeholder="Habilidades"
              value={values.skills}
            />
            <p>{errors && <p>{errors.skills}</p>}</p>
          </div>
          <div>
            <label>Repositorio</label>
            <Form
              name="repository"
              onChange={handleChange}
              placeholder="www.github.com/etc"
              value={values.repository}
            />
            <p>{errors && <p>{errors.skills}</p>}</p>
          </div>
          <div>
            <label>Imagen</label>
            <Form name="image" onChange={fileHandler} type="file" />
            <p>{errors && <p>{errors.skills}</p>}</p>
          </div>
          <div className="flex mt-5">
            <button
              className="m-auto bg-gradient-to-tr from-red-500 to-blue-500 px-14 py-2 rounded-lg"
              type="submit"
            >
              {isEdit ? "crear" : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
      <div className="my-10">
        <h1 className="text-center text-3xl font-extrabold">
          Proyectos Realizados
        </h1>
      </div>
      <div className="grid grid-cols-5 gap-5  mx-20">
        {Array.isArray(project) && project.length > 0 ? (
          project.map((project) => (
            <div>
              <button
                onClick={() => {
                  console.log("soy el id del onclick project", project.id);
                  removeSkill(project.id, project.image);
                }}
              >
                <IconsFont
                  className="bg-red-600 w-5
                         h-5 rounded-full mt-2  "
                  icon={faRemove}
                />
              </button>
              <button
                onClick={() => {
                  console.log("soy el id del onclick project", project.id);
                  getOne(project.id);
                }}
              >
                <IconsFont
                  className="bg-yellow-600 w-5
                         h-5 rounded-full mx-2 mt-2  "
                  icon={faEdit}
                />
              </button>
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
                <label className="font-bold text-base ">Descripcion</label>
                <p>{project.description}</p>

                <img
                  className="w-64 h-36 rounded-lg pt-2"
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
          <p>No project available</p>
        )}
      </div>
    </div>
  );
};

export default Proyects;
