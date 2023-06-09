"use client";
import { signOutAction } from "@/lib/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SignOutButton: React.FC = () => {
  // see: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#custom-invocation-using-starttransition
  // const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await signOutAction();
        alert("サインアウトしました");
        router.push("/signin");
      }}
    >
      <span className="flex flex-col items-center">
        <Image src="/icon/signout.svg" width={28} height={28} alt="sign out" />
        <span className="text-xs">sign out</span>
      </span>
    </button>
  );
};
