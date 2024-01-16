import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../interfaces/interfac";
import { registerUser } from "../Store/actions/auth.actions";

const initial = {
  name: "",
  password: "",
  email: "",
  confirmPassword: "",
};

const FormRegister = () => {
  const schemaValidateRegister = Yup.object({
    email: Yup.string().email("Correo no valido").required("Correo requerido"),
    name: Yup.string().required("Nombre requerido"),
    password: Yup.string().required("Contraseña requerida"),
    confirmPassword: Yup.string().required(
      "Confirmación de Contraseña requerida"
    ),
  });
  const onSubmit = async (data: register) => {
    console.log(data);
    
    const res = await registerUser(data);
    console.log(res);
  };

  const { values, handleChange, handleBlur, handleSubmit, resetForm, errors } =
    useFormik({
      initialValues: initial,
      enableReinitialize: true,
      validationSchema: schemaValidateRegister,
      onSubmit,
    });
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Correo</label>
        <input type="email" value={values.email} onChange={handleChange} name="email"placeholder="example@fmail.com" />
        {errors && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Nombre</label>
        <input type="text" value={values.name} onChange={handleChange} name="name" placeholder="pepito" />
        {errors && <p>{errors.name}</p>}
      </div>
      <div>
        <label>Contraseña</label>
        <input
          type="password"
          value={values.password}
          onChange={handleChange}
          name="password"
          placeholder="*************"
        />
        {errors && <p>{errors.password}</p>}
      </div>
      <div>
        <label>Confirmación contraseña</label>
        <input
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          placeholder="*************"
        />
        {errors && <p>{errors.confirmPassword}</p>}
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormRegister;
