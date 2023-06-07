import { SakeReviewCard } from "@/components/SakeReviewCard";
import { SakeReviewsList } from "@/components/SakeReviewsList";
import { Title } from "@/components/Title";
import { fetchSakeReviewsAction } from "@/lib/actions";
import { TSakeEvaluation, TSakeReview } from "@/types/app";
import { Database } from "@/types/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";

export default async function Home() {
  return (
    <>
      <Title title="sake archive" description="あなたが最近飲んでいたsake" />
      <SakeReviewsList fetchSakeReviewsAction={fetchSakeReviewsAction} />
    </>
  );
}
