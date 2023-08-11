
import { useForm } from "react-hook-form";
import { loginInterface } from "../interfaces/interfac";

function Register() {
  const { register, handleSubmit } = useForm<loginInterface>();
  const onSubmit = (data:loginInterface) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <article>
          <h1>Register</h1>
        </article>
        <article>
          <label>name</label>
          <input type="text" {...register("name", { required: true })} />
        </article>
          <article>
          <label>Email</label>
          <input type="email" {...register("email", { required: true })} />
        </article>
        <article>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
          />
        </article>
        <button> enviar</button>
      </form>
    </div>
    
  );
}

export default Register;
