"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export type TAuthForm = {
  email: string;
  password: string;
};

type Props = {
  handleSignUp: (data: TAuthForm) => Promise<boolean>;
};

export const SignUpForm: React.FC<Props> = ({ handleSignUp }) => {
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
      alert(
        "お使いのメールアドレス当てに確認メールを送信しました。メール確認後、ログイン画面からログインしてください"
      );
      router.push("/signin");
    }
    if (isSuccess === false) {
      alert("サインアップに失敗しました");
      reset();
    }
  }, [isSuccess, router, reset]);

  const onSubmit = handleSubmit(async (data) => {
    const result = await handleSignUp(data);
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
            value="signup"
          />
        </div>
      </form>
    </>
  );
};
