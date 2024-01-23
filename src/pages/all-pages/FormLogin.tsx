import { useFormik } from "formik";
import { useAppDispatch } from "../../Store/Slices";
import * as Yup from "yup";
import { login } from "../../interfaces/interfac";
import { LoginUser } from "../../Store/actions/auth.actions";
import { useNavigate, useNavigation } from "react-router-dom";

const initial = {
  email: "",
  password: "",
};
const FormLogin = () => {
  const schemaValidateRegister = Yup.object({
    email: Yup.string().email("Correo no valido").required("Correo requerido"),
    password: Yup.string().required("Contraseña requerida"),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data: login) => {
    console.log(data);

    const response = await dispatch(LoginUser(data));
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
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
          {errors && <p>{errors.email}</p>}
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
          {errors && <p>{errors.password}</p>}
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

export default FormLogin;
