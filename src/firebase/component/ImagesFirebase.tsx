import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import appFirebase from "../credenciales";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../../Store/Slices";
import { getSkillUser } from "../../Store/actions/projects.actions";
export const fileHandler = async (e: any) => {
  const archivo = e.target.files[0];
  if (archivo) {
    //cargarlo al storage de firebase
    const nameArch = `${nuevoUuid}`;
    const refArchivo = ref(storage, `skills/${nameArch}`);

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
export const SkillImages = async () => {
  const dispatch = useAppDispatch();
  await dispatch(getSkillUser());
};
const ImagesFirebase = ({ file }: { file: any }) => {
  const db = getFirestore(appFirebase);
  const storage = getStorage(appFirebase);
  const nuevoUuid = uuidv4();
  const [urlInDesc, setUrlInDesc] = useState<string | null>(null);

  return <div>ImagesFirebase</div>;
};

export default ImagesFirebase;
