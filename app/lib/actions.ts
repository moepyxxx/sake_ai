import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const fetchSakeReviewsAction = async (
  supabase: SupabaseClient
): Promise<any> => {
  "use server";
  const { data } = await supabase.from("sake_reviews").select();
  return data;
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
