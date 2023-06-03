import { SignInForm, TAuthForm } from "@/components/SignInForm";
import { Title } from "@/components/Title";
import Link from "next/link";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default function SignUp() {
  const handleSignUp = async (authData: TAuthForm) => {
    "use server";

    const supabase = createServerActionClient<TAuthForm>({ cookies });
    const res = await supabase.auth.signUp({
      email: authData.email,
      password: authData.password,
      options: {
        emailRedirectTo: "http://localhost:3000/success",
      },
    });
    console.log(res);

    revalidatePath("/");
  };

  // const handleSignOut = async () => {
  //   "use server";
  //   const supabase = createServerActionClient<Database>({ cookies });
  //   await supabase.auth.signOut();
  //   revalidatePath("/signin");
  // };

  return (
    <>
      <Title title="signup" description="sake aiへようこそ" />
      <SignInForm handleAuth={handleSignUp} type="signup" />
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
