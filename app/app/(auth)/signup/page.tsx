import { Title } from "@/components/Title";
import Link from "next/link";
import { SignUpForm } from "@/components/feature/SignUpForm";
import { signUpAction } from "@/lib/actions";

export default function SignUpPage() {
  return (
    <>
      <Title title="signup" description="sake aiへようこそ" />
      <SignUpForm signUpAction={signUpAction} />
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
