import { SignInForm, TAuthForm } from "@/components/SignInForm";
import { Title } from "@/components/Title";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { cookies } from "next/headers";
import { isAuthError } from "@supabase/supabase-js";
import { Database } from "@/types/schema";

export default function SignIn() {
  const handleSignIn = async (formData: TAuthForm): Promise<boolean> => {
    "use server";

    const supabase = createServerActionClient<Database>({ cookies });
    const res = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (res.error) {
      if (isAuthError(res.error)) {
        return false;
      } else {
        throw Error("予期しないエラー");
      }
    }

    revalidatePath("/");
    return true;
  };
  return (
    <>
      <Title title="signin" description="sake aiへようこそ" />
      <SignInForm handleSignIn={handleSignIn} />
      <div className="text-center pt-3">
        <p>
          サインアップは
          <Link href="/signup" className="text-cyan-600 underline">
            こちら
          </Link>
        </p>
      </div>
    </>
  );
}
