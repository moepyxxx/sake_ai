"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export type TAuthForm = {
  email: string;
  password: string;
};

type Props = {
  handleAuth: (data: TAuthForm) => Promise<boolean>;
  type: "signin" | "signup";
};

export const SignInForm: React.FC<Props> = ({ handleAuth, type }) => {
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TAuthForm>();

  useEffect(() => {
    if (isSuccess === true) {
      router.push("/");
    }
    if (isSuccess === false) {
      alert("認証に失敗しました");
      reset();
    }
  }, [isSuccess, router, reset]);

  const onSubmit = handleSubmit(async (data) => {
    const result = await handleAuth(data);
    setIsSuccess(result);
  });

  return (
    <>
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
            value={type}
          />
        </div>
      </form>
    </>
  );
};
