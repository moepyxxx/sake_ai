import { SignInForm } from "@/components/feature/SignInForm";
import { Title } from "@/components/Title";
import Link from "next/link";
import { signInAction } from "@/lib/actions";

export default function SignInPage() {
  return (
    <>
      <Title title="signin" description="sake aiへようこそ" />
      <SignInForm signInAction={signInAction} />
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
