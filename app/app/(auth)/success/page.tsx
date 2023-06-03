import { Title } from "@/components/Title";
import Link from "next/link";

export default function Success() {
  return (
    <>
      <Title title="success" description="sign up が完了しました" />
      <div className="text-center pt-3">
        <p>
          <Link href="/signin" className="text-cyan-600 underline">
            サインイン
          </Link>
          して、sake aiをはじめましょう
        </p>
      </div>
    </>
  );
}
