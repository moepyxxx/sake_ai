"use client";
import { useRouter } from "next/navigation";

type Props = {
  handleSignOut: () => Promise<void>;
};
export const SignOutButton: React.FC<Props> = ({ handleSignOut }) => {
  // see: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#custom-invocation-using-starttransition
  // const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="pb-52">
      <button
        onClick={async () => {
          await handleSignOut();
          alert("サインアウトしました");
          router.push("/signin");
        }}
      >
        sign out
      </button>
    </div>
  );
};
