import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "../../components/Form";
import appFirebase from "../../firebase/credenciales";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  createProjectUser,
  getProjectUser,
  getSkillUser,
} from "../../Store/actions/projects.actions";
import { projectInterface } from "../../interfaces/interface-project";
import { useAppDispatch } from "../../Store/Slices";
import { useEffect, useState } from "react";
const initialValues = {
  name: "",
  description: "",
  skills: "",
  image: null,
  repository: "",
};
const validationSchema = Yup.object({
  name: Yup.string().required("Nombre requerido"),
  description: Yup.string().required("Descripción requerida"),
  skills: Yup.string().required("Habilidades requeridas"),
});

const db = getFirestore(appFirebase);
const storage = getStorage(appFirebase);

const FormProject = () => {
  const [urlInDesc, setUrlInDesc] = useState<string | null>(null);

  const [projects, setProjects] = useState<any>([]);
  const nuevoUuid = uuidv4();

  const AllProjects = async () => {
    const res = await dispatch(getProjectUser());
    setProjects(res.payload);
  };

  useEffect(() => {
    AllProjects();
  }, []);
  const dispatch = useAppDispatch();
  const onSubmit = async (data: projectInterface) => {
    //detectar el archivo

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
  const { values, handleChange, handleBlur, handleSubmit, resetForm, errors } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema,
      onSubmit,
    });

  return (
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
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormProject;
