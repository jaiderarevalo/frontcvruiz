import { useFormik } from "formik";
import * as Yup from "yup";
const initialValues = {
  name: '',
  description:'',
  skills:'',
  image:''
};

const validationSchema = Yup.object({
  name: Yup.string().required("Nombre requerido"),
});
const Proyects = () => {
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const { values, handleChange, handleBlur, handleSubmit, resetForm, errors } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema,
      onSubmit,
    });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            onChange={handleChange}
            name="name"
            placeholder="nombre"
          />
          <p>{errors && <p>{errors.name}</p>}</p>
        </div>
        <div>
          <input
            type="text"
            onChange={handleChange}
            name="description"
            placeholder="descripcion"
          />
          <p>{errors && <p>{errors.description}</p>}</p>
        </div>
        <div>
          <input
            type="text"
            onChange={handleChange}
            name="description"
            placeholder="descripcion"
          />
          <p>{errors && <p>{errors.description}</p>}</p>
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default Proyects;
