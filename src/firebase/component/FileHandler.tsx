import React, { ChangeEvent, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import appFirebase from "../credenciales";
import { useAppDispatch } from "../../Store/Slices";
import {
  createSkillUser,
  getSkillUser,
} from "../../Store/actions/projects.actions";
import Form from "../../components/Form";
interface FileUploaderProps {
  newFileFirebase: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ newFileFirebase }) => {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const handleClick = async () => {
    if (selectedFile) {
      const storage = getStorage(appFirebase);
      const nuevoUuid = uuidv4();
      const nameArch = `${nuevoUuid}`;

      try {
        const refArchivo = ref(storage, `${newFileFirebase}/${nameArch}`);
        await uploadBytes(refArchivo, selectedFile);
        const imageUrl = await getDownloadURL(refArchivo);

        const res = await dispatch(createSkillUser({ skill: imageUrl.toString() }));
        if (res.meta.requestStatus === "fulfilled") {
          const response = await dispatch(getSkillUser());
          return response.meta.requestStatus;
        }
        console.log("respuesta del Skillsss", res.meta.requestStatus);
      } catch (error) {
        console.error("Error al cargar y obtener la URL de la imagen", error);
      }
    } else {
      console.log("No se ha seleccionado ninguna imagen.");
    }
  };

  const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (archivo) {
      setSelectedFile(archivo);
    }
  };

  return (
    <div>
      <Form name="skill" onChange={fileHandler} type="file" />
      <button
        className="bg-gradient-to-tr from-red-500 to-blue-500 my-5 py-2 px-10 rounded-xl"
        onClick={() => handleClick()}
      >
        Guardar
      </button>
    </div>
  );
};

export default FileUploader;
