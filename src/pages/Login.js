import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username", { required: true })} />
      {errors.username && <span>This field is required</span>}
      <input {...register("password", { required: true })} />
      {errors.password && <span>Password is requried</span>}
      <input type="submit" />
    </form>
  );
};

export default Login;
