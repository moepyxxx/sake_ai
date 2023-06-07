"use server";
import { TSakeEvaluation, TSakeReview } from "@/types/app";
import { Database } from "@/types/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const fetchSakeReviewsAction = async (): Promise<TSakeReview[]> => {
  const supabase = createServerComponentClient<Database>({ cookies });
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
  return sakeReviews;
};

export const addSakeReviewAction = async (
  sakeReview: any
): Promise<boolean> => {
  "use server";
  // ないsakeの銘柄は先に追加
  const supabase = createServerComponentClient({ cookies });
  const result = await supabase.from("sake_reviews").insert({
    sake_id: sakeReview.sake_id,
    user_id: sakeReview.user_id,
    // user_id: "c5350670-28e4-483e-83c3-939158687d97",
    evaluation: sakeReview.evaluation,
    review: sakeReview.review,
  });

  if (result.status === 201) {
    return true;
  }
  return false;
};
