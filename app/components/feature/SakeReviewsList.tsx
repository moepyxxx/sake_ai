"use client";
import { TSakeReview } from "@/types/app";
import { SakeReviewCard } from "../SakeReviewCard";
import { useEffect, useState } from "react";

type Props = {
  fetchSakeReviewsAction: () => Promise<TSakeReview[]>;
};

export const SakeReviewsList: React.FC<Props> = ({
  fetchSakeReviewsAction,
}) => {
  const [sakeReviews, setSakeReviews] = useState<TSakeReview[]>([]);

  useEffect(() => {
    fetchSakeReviewsAction().then((action) => {
      setSakeReviews(action);
    });
  }, [fetchSakeReviewsAction]);

  return (
    <>
      {sakeReviews.map((sakeReview) => (
        <SakeReviewCard key={sakeReview.id} sakeReview={sakeReview} />
      ))}
    </>
  );
};
