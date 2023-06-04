import { TSakeEvaluation, TSakeReview } from "@/app/(main)/page";

type Props = {
  sakeReview: TSakeReview;
};

const SAKE_EVALUATION_MAPS: Record<TSakeEvaluation, string> = {
  5: "とても美味しかった",
  4: "美味しかった",
  3: "普通",
  2: "あまり好みではない",
  1: "好みではない",
};
export const SakeCard: React.FC<Props> = ({ sakeReview }) => {
  return (
    <div className="first:mt-0 mt-6 p-6 bg-white rounded-xl">
      <span className="text-sm inline-block py-1 px-3 bg bg-yellow-400 rounded-2xl">
        {SAKE_EVALUATION_MAPS[sakeReview.evaluation]}
      </span>
      <p className="text-lg mt-3">
        {sakeReview.sake.name}（{sakeReview.sake.prefecture}）
      </p>
      <p className="mt-2">{sakeReview.review}</p>
      {/** todo date format */}
      <p className="mt-2 text-slate-400">2023-05-20</p>
    </div>
  );
};
