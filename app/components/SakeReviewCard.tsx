import { PREFECTURE_LIST, SAKE_EVALUATION_MAPS } from "@/lib/sake";
import { TSakeReview } from "@/types/app";
import { format, parseISO } from "date-fns";

type Props = {
  sakeReview: TSakeReview;
};

export const SakeReviewCard: React.FC<Props> = ({ sakeReview }) => {
  return (
    <div className="first:mt-0 mt-6 p-6 bg-white rounded-xl">
      <span className="text-sm inline-block py-1 px-3 bg bg-yellow-400 rounded-2xl">
        {SAKE_EVALUATION_MAPS[sakeReview.evaluation]}
      </span>
      <p className="text-lg mt-3">
        {sakeReview.sake.name}（{PREFECTURE_LIST[sakeReview.sake.prefecture]}）
      </p>
      <p className="mt-2">{sakeReview.review}</p>
      <p className="mt-2 text-slate-400">
        {format(parseISO(sakeReview.created_at), "yyyy-MM-dd HH:mm")}
      </p>
    </div>
  );
};
