import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useFormProjectContext } from "../context/FormProjectContext";
import { typeProject } from "../interfaces/interfac";

function FormProyect() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeProject>();
  const { postProject } = useFormProjectContext();
  const [image, setImage] = useState<File>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
    }
  };

  const onSubmit = async (data: typeProject) => {
    // Llamar a la función del contexto para enviar el proyecto con la imagen
    if (image) {
      await postProject(data, image);
    }
  };

  return (
    <div className="flex items-center justify-center h-2/6 bg-gradient-to-tr from-black to-gray-700 text-white">
      <form
        className="bg-gray-600 p-6 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="mb-4">
          <label className="block text-lg font-bold mb-2">Título</label>
          <input
            {...register("title", { required: true })}
            className="w-full p-2 rounded-md bg-gray-300 text-gray-900"
            type="text"
            placeholder="Escribe tu título"
          />
          {errors.title && <span className="text-red-500">Campo requerido</span>}
        </section>
        <section className="mb-4">
          <label className="block text-lg font-bold mb-2">Descripción</label>
          <input
            {...register("description", { required: true })}
            className="w-full p-2 rounded-md bg-gray-300 text-gray-900"
            type="text"
            placeholder="Escribe tu descripción"
          />
          {errors.description && <span className="text-red-500">Campo requerido</span>}
        </section>
        <section className="mb-4">
          <label className="block text-lg font-bold mb-2">Imagen</label>
          <input
            className="bg-gray-300 p-2 rounded-md text-gray-900"
            type="file"
            onChange={handleImageChange}
          />
        </section>
        <section>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            type="submit"
          >
            Guardar
          </button>
        </section>
      </form>
    </div>
  );
}

export default FormProyect;
