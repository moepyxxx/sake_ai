import { SignInForm } from "@/components/SignInForm";
import { Title } from "@/components/Title";
import Link from "next/link";

export default function SignIn() {
  return (
    <>
      <Title title="signin" description="sake aiへようこそ" />
      <SignInForm />
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
