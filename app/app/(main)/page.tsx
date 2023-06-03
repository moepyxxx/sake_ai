import { SakeCard, TSake } from "@/components/SakeCard";
import { SignOutButton } from "@/components/SignOutButton";
import { Title } from "@/components/Title";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default function Home() {
  const handleSignOut = async () => {
    "use server";
    const supabase = createServerActionClient<any>({ cookies });
    await supabase.auth.signOut();
    revalidatePath("/signin");
  };

  const sake: TSake[] = [
    {
      name: "雪の茅舎",
      prefecture: "秋田",
      review:
        "感想が入ります。感想が入ります。感想が入ります。感想が入ります。感想が入ります。感想が入ります。感想が入ります。",
      date: new Date(),
      evaluation: 5,
    },
    {
      name: "寫楽",
      prefecture: "福島",
      review:
        "感想が入ります。感想が入ります。感想が入ります。感想が入ります。感想が入ります。感想が入ります。感想が入ります。",
      date: new Date(),
      evaluation: 5,
    },
    {
      name: "緑川",
      prefecture: "新潟",
      review:
        "感想が入ります。感想が入ります。感想が入ります。感想が入ります。感想が入ります。感想が入ります。感想が入ります。",
      date: new Date(),
      evaluation: 4,
    },
    {
      name: "新政 No.6",
      prefecture: "秋田",
      review:
        "感想が入ります。感想が入ります。感想が入ります。感想が入ります。感想が入ります。感想が入ります。感想が入ります。",
      date: new Date(),
      evaluation: 3,
    },
  ];
  return (
    <main>
      <Title title="sake archive" description="あなたが最近飲んでいたsake" />
      <div>
        {sake.map((sake) => (
          <SakeCard key={sake.name} sake={sake} />
        ))}
      </div>
    </main>
  );
}
