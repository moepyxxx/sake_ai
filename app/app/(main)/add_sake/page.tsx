import { AddSakeReviewForm } from "@/components/AddSakeReviewForm";
import { Title } from "@/components/Title";
import { PREFECTURE_LIST } from "@/lib/sake";
import { TSakeEvaluation } from "@/types/app";
import { Database } from "@/types/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export type TAddSakeReview = {
  name: string;
  prefecture: keyof typeof PREFECTURE_LIST;
  evaluation: TSakeEvaluation;
  review: string;
};

export default async function AddSake() {
  const handleAddSakeReview = async (formData: TAddSakeReview) => {
    "use server";

    const getSakeByName = async (
      name: string
    ): Promise<Database["public"]["Tables"]["sakes"]["Row"][] | null> => {
      const { data: sakes } = await supabase
        .from("sakes")
        .select()
        .eq("name", formData.name)
        .limit(1);
      return sakes;
    };

    const supabase = createServerComponentClient<Database>({ cookies });
    let sakeId: number = 0;
    const sakes = await getSakeByName(formData.name);

    // TODO: もうちょっとやりようある
    // 銘柄と県名のところを工夫する
    if (sakes == null || sakes.length === 0) {
      await supabase.from("sakes").insert({
        name: formData.name,
        prefecture: formData.prefecture,
      });
      const sakes = await getSakeByName(formData.name);
      if (sakes == null || sakes.length === 0) {
        throw new Error("何かがおかしいです");
      }
      sakeId = sakes[0].id;
    } else {
      sakeId = sakes[0].id;
    }

    await supabase.from("sake_reviews").insert({
      sake_id: sakeId,
      review: formData.review,
      evaluation: formData.evaluation,
      // TODO: とってこれるようにする
      user_id: "c5350670-28e4-483e-83c3-939158687d97",
    });
    return true;
  };

  return (
    <>
      <Title title="add sake" description="飲んだsakeを追加して" />
      <AddSakeReviewForm handleAddSakeReview={handleAddSakeReview} />
    </>
  );
}
