"use server";
import { TAuthForm } from "@/components/feature/SignInForm";
import { TAddSakeReview, TSakeEvaluation, TSakeReview } from "@/types/app";
import { Database } from "@/types/schema";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { isAuthError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const fetchSakeReviewsAction = async (): Promise<TSakeReview[]> => {
  //   await new Promise((resolve) => setTimeout(resolve, 3000));

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

export const AddSakeReviewAction = async (
  formData: TAddSakeReview
): Promise<boolean> => {
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

export const signInAction = async (formData: TAuthForm): Promise<boolean> => {
  const supabase = createServerActionClient<Database>({ cookies });
  const res = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (res.error) {
    if (isAuthError(res.error)) {
      return false;
    } else {
      throw Error("予期しないエラー");
    }
  }

  revalidatePath("/");
  return true;
};

export const signUpAction = async (authData: TAuthForm) => {
  const supabase = createServerActionClient<Database>({ cookies });
  await supabase.auth.signUp({
    email: authData.email,
    password: authData.password,
    options: {
      emailRedirectTo: "http://localhost:3000/success",
    },
  });

  revalidatePath("/");
  return true;
};
