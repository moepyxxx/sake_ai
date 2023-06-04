import { SakeCard } from "@/components/SakeCard";
import { Title } from "@/components/Title";
import { Database } from "@/types/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export type TSakeEvaluation = 1 | 2 | 3 | 4 | 5;

export type TSakeReview = {
  id: number;
  sake: {
    id: number;
    name: string;
    prefecture: number;
  };
  review: string;
  evaluation: TSakeEvaluation;
  created_at: string;
  updated_at: string;
};

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: rawReviews } = await supabase.from("sake_reviews").select();
  const sakes: any = [];
  const sakeReviews: TSakeReview[] = await Promise.all(
    rawReviews!.map(async (raw) => {
      const alreadyExist = sakes.find((sake: any) => sake.id === raw.sake_id);
      if (alreadyExist) {
        return {
          id: raw.id,
          sake: alreadyExist,
          review: raw.review,
          evaluation: raw.evaluation as TSakeEvaluation,
          created_at: raw.created_at,
          updated_at: raw.updated_at,
        };
      }
      const { data: rawSake } = await supabase
        .from("sakes")
        .select()
        .eq("id", raw.sake_id)
        .limit(1);
      sakes.push(rawSake![0]);
      return {
        id: raw.id,
        sake: rawSake![0],
        review: raw.review,
        evaluation: raw.evaluation as TSakeEvaluation,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      };
    })
  );

  return (
    <main>
      <Title title="sake archive" description="あなたが最近飲んでいたsake" />
      <div>
        {sakeReviews.map((sakeReview) => (
          <SakeCard key={sakeReview.id} sakeReview={sakeReview} />
        ))}
      </div>
    </main>
  );
}
