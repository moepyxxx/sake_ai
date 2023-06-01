"use client";
import { useForm } from "react-hook-form";

type TLoginForm = {
  email: string;
  password: string;
};
export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TLoginForm>();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <label className="text-base mb-3 block">user id ( email )</label>
        <input className="w-full p-4 rounded-lg" {...register("email")} />
        <p>{errors.email?.message}</p>
      </div>
      <div className="mb-6">
        <label className="text-base mb-3 block">password</label>
        <input
          className="w-full p-4 rounded-lg bg-white"
          type="password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
      </div>
      <div className="text-center">
        <input
          className="inline-block w-60 py-3 px-4 bg-cyan-600 rounded-lg text-white"
          type="submit"
          value="login"
        />
      </div>
    </form>
  );
};
