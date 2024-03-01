import { useAppDispatch } from "@/Store/Slices";
import { registerUser } from "@/Store/actions/auth.actions";
import Form from "@/components/Form";
import { register } from "@/interfaces/interfac";
import { useFormik } from "formik";
import * as Yup from "yup";

const initial = {
  name: "",
  password: "",
  email: "",
  confirmPassword: "",
  role: "",
};

const FormRegister = () => {
  const schemaValidateRegister = Yup.object({
    email: Yup.string().email("Correo no valido").required("Correo requerido"),
    name: Yup.string().required("Nombre requerido"),
    password: Yup.string().required("Contraseña requerida"),
    confirmPassword: Yup.string().required(
      "Confirmación de Contraseña requerida"
    ),
    role: Yup.string().required("Es requerido el rol "),
  });
  const dispatch = useAppDispatch();
  const onSubmit = async (data: register) => {
    console.log(data);

    const response = await dispatch(registerUser(data));
    console.log("es la respuesta", response);
  };

  const { values, handleChange, handleBlur, handleSubmit, resetForm, errors } =
    useFormik({
      initialValues: initial,
      enableReinitialize: true,
      validationSchema: schemaValidateRegister,
      onSubmit,
    });
  return (
    <form onSubmit={handleSubmit} className="flex">
      <div className="m-auto border-2 border-black p-10">
        <div></div>
        <div>
          <label>Correo</label>
          <div>
            <Form
              name="email"
              onChange={handleChange}
              placeholder="example@gmail.com"
              type="email"
              value={values.email}
            />
          </div>
          {errors && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label>Nombre</label>
          <div>
            <Form
              name="name"
              onChange={handleChange}
              value={values.name}
              placeholder="Nombre"
            />
          </div>
          {errors && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label>Contraseña</label>
          <div>
            <Form
              name="password"
              onChange={handleChange}
              value={values.password}
              placeholder="Contraseña"
              type="password"
            />
          </div>
          {errors && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div>
          <label>Confirmación contraseña</label>
          <div>
            <Form
              name="confirmPassword"
              onChange={handleChange}
              value={values.confirmPassword}
              placeholder="*************"
              type="password"
            />
          </div>
          {errors && <p className="text-red-500">{errors.confirmPassword}</p>}
        </div>
        <div>
          <select name="role" value={values.role} onChange={handleChange}>
            <option value="user">USER</option>
            <option value="admin">ADMIN</option>
          </select>
        </div>
        <div className="flex py-2">
          <button
            className="m-auto bg-blue-600 w-40 rounded-xl py-1 text-white"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormRegister;
