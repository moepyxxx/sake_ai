import { SignInForm } from "@/components/SignInForm";
import { Title } from "@/components/Title";
import Link from "next/link";

export default function SignIn() {
  return (
    <>
      <Title title="signup" description="sake aiへようこそ" />
      <SignInForm />
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
