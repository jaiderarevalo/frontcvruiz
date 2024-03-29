import { getStorage, ref, deleteObject } from "firebase/storage";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "@/Store/Slices";
import {
  DeleteSkillUser,
  getSkillUser,
} from "@/Store/actions/projects.actions";
import { useSelector } from "react-redux";
import IconsFont from "@/components/IconsFont";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { SkillImages } from "@/firebase/component/ImagesFirebase";
import FileUploader from "@/firebase/component/FileHandler";
import code from "@/images/code.jpg";
const Skills = () => {
  const { user } = useSelector((root: RootState) => root.auth);
  const [skilles, setSkilles] = useState([]);
  const { skill } = useSelector((root: RootState) => root.project);
  const dispatch = useAppDispatch();
  useEffect(() => {
    SkillImages();
  }, []);

  const getProjects = async () => {
    return await dispatch<any>(getSkillUser());
  };

  useEffect(() => {
    getProjects();
  }, []);

  const removeSkill = async (id: string, imageUrl: string) => {
    // Eliminar la imagen de Firebase Storage
    await deleteImageFromFirebase(imageUrl);

    // Despachar la acción para eliminar la habilidad en la base de datos
    const res = await dispatch(DeleteSkillUser(id));

    // Si la eliminación en la base de datos es exitosa, actualizar el estado local
    if (res.meta.requestStatus === "fulfilled") {
      const response = await dispatch(getSkillUser());
      return response;
    }
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

  return (
    <div className="h-full ">
      <div
        className="h-2/3  py-10 "
        style={{ backgroundImage: `url(${code})` }}
      >
        {user?.role === "admin" && (
          <div className="xl:flex xl:my-50 xl:mt-10 border-2 border-gray-500 shadow-lg shadow-slate-600 xl:mx-80  rounded-xl">
            <div className=" m-auto w-2/5  text-center ">
              <p className="font-extrabold  xl:text-2xl text-lg text-white text-center py-2  ">
                Elegir imagen de Habilidades
              </p>
              <FileUploader newFileFirebase="ImageSkill" />
            </div>
          </div>
        )}
        <div className="">
          <div className="flex py-5">
            <h1 className=" m-auto shadow-xl shadow-red-700 px-20 font-bold text-2xl text-white">Habilidades</h1>
          </div>
          {Array.isArray(skill) && skill.length > 0 ? (
            <div className="xl:grid xl:grid-cols-5 md:grid md:grid-cols-2 gap-10 px-10">
              {skill.map((image) => (
                <div key={image.id} className=" xl:h-56 xl:w-64">
                  {user?.role === "admin" && (
                    <div className=" flex justify-end items-end">
                      <button
                        onClick={() => {
                          removeSkill(image.id, image.skill);
                        }}
                      >
                        <IconsFont
                          className="bg-red-600 w-5 h-5 rounded-full mt-2  "
                          icon={faRemove}
                        />
                      </button>
                    </div>
                  )}
                  <img
                    className="rounded-xl border-2 xl:w-full xl:h-full h-64 w-96 md:w-full border-gray-600 shadow-xl shadow-gray-600"
                    alt="imagen en ejecución"
                    src={image.skill}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h1 className="text-white text-3xl text-center ">No tienes habilidades</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
