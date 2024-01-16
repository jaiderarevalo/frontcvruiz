import { useForm } from "react-hook-form";
import { login } from "../interfaces/interfac";
import { usePostLoginContext } from "../context/LoginContext";
//import { useAuthContext } from "../context/AuthContext";
function Login() {
    const { userLogin } = usePostLoginContext();
  // const{token}= useAuthContext()
   //console.log(token);
   
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<login>();
  const onsubmit = (data: login) => { 
    userLogin(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <section>
          <label>Usuario</label>
          <input type="text" {...register("username", { required: true })} />
          {errors.username && <span>campo requerido</span>}
        </section>
        <section>
          <label>password</label>
          <input
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>campo requerido</span>}
        </section>
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default Login;
