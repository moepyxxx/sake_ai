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
