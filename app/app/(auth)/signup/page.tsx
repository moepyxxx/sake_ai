import { Title } from "@/components/Title";
import Link from "next/link";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { SignUpForm, TAuthForm } from "@/components/SignUpForm";

export default function SignUp() {
  const handleSignUp = async (authData: TAuthForm) => {
    "use server";

    const supabase = createServerActionClient<TAuthForm>({ cookies });
    await supabase.auth.signUp({
      email: authData.email,
      password: authData.password,
      options: {
        emailRedirectTo: "http://localhost:3000/success",
      },
    });

    revalidatePath("/");
    return true;
  };

  return (
    <>
      <Title title="signup" description="sake aiへようこそ" />
      <SignUpForm handleSignUp={handleSignUp} />
      <div className="text-center pt-3">
        <p>
          サインインは
          <Link href="/signin" className="text-cyan-600 underline">
            こちら
          </Link>
        </p>
      </div>
    </>
  );
}
