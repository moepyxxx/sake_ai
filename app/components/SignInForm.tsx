"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const authSchema = yup
  .object({
    email: yup
      .string()
      .required("必須です")
      .email("メール形式で入力してください"),
    password: yup
      .string()
      .required("必須です")
      .min(8, "8文字以上入力してください"),
  })
  .required();

export type TAuthForm = {
  email: string;
  password: string;
};

type Props = {
  handleSignIn: (data: TAuthForm) => Promise<boolean>;
};

export const SignInForm: React.FC<Props> = ({ handleSignIn }) => {
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAuthForm>({
    resolver: yupResolver(authSchema),
  });

  useEffect(() => {
    if (isSuccess === true) {
      router.push("/home");
    }
    if (isSuccess === false) {
      alert("認証に失敗しました");
      reset();
    }
  }, [isSuccess, router, reset]);

  const onSubmit = handleSubmit(async (data) => {
    const result = await handleSignIn(data);
    setIsSuccess(result);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label className="text-base mb-3 block">user id ( email )</label>
          <input
            className="w-full p-4 rounded-lg"
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email")}
          />
          <p className="text-sm text-rose-600 mt-2">{errors.email?.message}</p>
        </div>
        <div className="mb-6">
          <label className="text-base mb-3 block">password</label>
          <input
            className="w-full p-4 rounded-lg bg-white"
            type="password"
            {...register("password")}
          />
          <p className="text-sm text-rose-600 mt-2">
            {errors.password?.message}
          </p>
        </div>
        <div className="text-center">
          <input
            className="inline-block w-60 py-3 px-4 bg-cyan-600 rounded-lg text-white"
            type="submit"
            value="signin"
          />
        </div>
      </form>
    </>
  );
};
