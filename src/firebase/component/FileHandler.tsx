import React, { ChangeEvent, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Resizer from "react-image-file-resizer";
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

  const fileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      // Redimensionar y convertir la imagen a JPEG
      const resizedImage = await resizeAndConvertToJPEG(file);
console.log("imagen a jpg", resizedImage);

      // Establecer la imagen redimensionada como el archivo seleccionado
      setSelectedFile(resizedImage);
    } catch (err) {
      console.log(err);
    }
  };

  const resizeAndConvertToJPEG = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        64,
        56,
        "JPEG",
        70,
        0,
        (uri) => {
          if (typeof uri === "string") {
            // Convertir la base64 a Blob
            const byteString = atob(uri.split(",")[1]);
            const mimeString = uri
              .split(",")[0]
              .split(":")[1]
              .split(";")[0];
            const arrayBuffer = new ArrayBuffer(byteString.length);
            const intArray = new Uint8Array(arrayBuffer);
            for (let i = 0; i < byteString.length; i++) {
              intArray[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([arrayBuffer], { type: mimeString });
  
            // Crear un nuevo archivo a partir del Blob
            const fileName = `${uuidv4()}.jpg`;
            const resizedFile = new File([blob], fileName, { type: "image/jpeg" });
  
            resolve(resizedFile);
          } else {
            reject(new Error("URI no es una cadena."));
          }
        },
        "base64",
        200,
        200
      );
    });
  };
  

  return (
    <div>
      <Form
        name="skill"
        onChange={fileHandler}
        type="file"
        className="border-2 text-white border-gray-400 rounded-lg w-full px-2"
      />
      <button
        className="bg-gradient-to-tr from-red-500  to-blue-500 my-5  py-2 px-10 rounded-xl"
        onClick={() => handleClick()}
      >
        Guardar
      </button>
    </div>
  );
};

export default FileUploader;
