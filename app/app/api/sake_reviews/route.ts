import { Database } from "@/types/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TSakeEvaluation, TSakeReview } from "@/types/app";

export async function GET(): Promise<NextResponse> {
  const supabase = createServerComponentClient<Database>({ cookies });
  console.log(await supabase.auth.getUser());
  const { data: rawReviews } = await supabase.from("sake_reviews").select();
  const sakes: Database["public"]["Tables"]["sakes"]["Row"][] = [];
  const sakeReviews: TSakeReview[] = await Promise.all(
    rawReviews!.map(async (raw) => {
      const alreadyExist = sakes.find((sake) => sake.id === raw.sake_id);
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
  // return sakeReviews;
  console.log(sakeReviews, "sakeReviews");

  return NextResponse.json(sakeReviews);
}
