export type TSake = {
  name: string;
  prefecture: string;
  review: string;
  date: Date;
  evaluation: TSakeEvaluation;
};

type Props = {
  sake: TSake;
};

type TSakeEvaluation = 1 | 2 | 3 | 4 | 5;
const SAKE_EVALUATION_MAPS: Record<TSakeEvaluation, string> = {
  5: "とても美味しかった",
  4: "美味しかった",
  3: "普通",
  2: "あまり好みではない",
  1: "好みではない",
};
export const SakeCard: React.FC<Props> = ({ sake }) => {
  return (
    <div className="first:mt-0 mt-6 p-6 bg-white rounded-xl">
      <span className="text-sm inline-block py-1 px-3 bg bg-yellow-400 rounded-2xl">
        {SAKE_EVALUATION_MAPS[sake.evaluation]}
      </span>
      <p className="text-lg mt-3">
        {sake.name}（{sake.prefecture}）
      </p>
      <p className="mt-2">{sake.review}</p>
      {/** todo date format */}
      <p className="mt-2 text-slate-400">2023-05-20</p>
    </div>
  );
};
