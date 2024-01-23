import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../../interfaces/interfac";
import { registerUser } from "../../Store/actions/auth.actions";
import { useAppDispatch } from "../../Store/Slices";

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
            <input
              className="border-2 border-gray-400 rounded-lg px-3"
              type="email"
              value={values.email}
              onChange={handleChange}
              name="email"
              placeholder="example@fmail.com"
            />
          </div>
          {errors && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label>Nombre</label>
          <div>
            <input
              className="border-2 border-gray-400 rounded-lg px-3"
              type="text"
              value={values.name}
              onChange={handleChange}
              name="name"
              placeholder="pepito"
            />
          </div>
          {errors && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label>Contraseña</label>
          <div>
            <input
              className="border-2 border-gray-400 rounded-lg px-3"
              type="password"
              value={values.password}
              onChange={handleChange}
              name="password"
              placeholder="*************"
            />
          </div>
          {errors && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div>
          <label>Confirmación contraseña</label>
          <div>
            <input
              className="border-2 border-gray-400 rounded-lg px-3"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              placeholder="*************"
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
