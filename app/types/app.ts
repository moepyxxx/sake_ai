import { PREFECTURE_LIST } from "@/lib/sake";

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

export type TAddSakeReview = {
  name: string;
  prefecture: keyof typeof PREFECTURE_LIST;
  evaluation: TSakeEvaluation;
  review: string;
};
