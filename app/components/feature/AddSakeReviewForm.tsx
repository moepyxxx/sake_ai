"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PREFECTURE_LIST, SAKE_EVALUATION_MAPS } from "@/lib/sake";
import { TAddSakeReview, TSakeEvaluation } from "@/types/app";

export const schema = yup
  .object({
    name: yup.string().required("必須です"),
    prefecture: yup.string().required("必須です"),
    evaluation: yup.string().required("必須です"),
    review: yup.string().required("必須です"),
  })
  .required();

export type TAddSakeReviewForm = {
  name: string;
  prefecture: string;
  evaluation: string;
  review: string;
};

type Props = {
  AddSakeReviewAction: (data: TAddSakeReview) => Promise<boolean>;
};

export const AddSakeReviewForm: React.FC<Props> = ({ AddSakeReviewAction }) => {
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAddSakeReviewForm>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isSuccess === true) {
      alert("投稿が完了しました！");
      router.push("/home");
    }
    if (isSuccess === false) {
      alert("投稿に失敗しました…");
      reset();
    }
  }, [isSuccess, router, reset]);

  const onSubmit = handleSubmit(async (data) => {
    const result = await AddSakeReviewAction({
      name: data.name,
      prefecture: Number(data.prefecture),
      evaluation: Number(data.evaluation) as TSakeEvaluation,
      review: data.review,
    });
    setIsSuccess(result);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label className="text-base mb-3 block">銘柄名</label>
          <input
            placeholder="銘柄を検索"
            className="w-full p-4 rounded-lg"
            {...register("name")}
          />
          <p className="text-sm text-rose-600 mt-2">{errors.name?.message}</p>
        </div>
        <div className="mb-6">
          <label className="text-base mb-3 block">産地（都道府県）</label>
          <select {...register("prefecture")} className="w-full p-4 rounded-lg">
            <option value="">選んでください</option>
            {Object.keys(PREFECTURE_LIST).map((prefectureId) => {
              return (
                <option key={`prefecture-${prefectureId}`} value={prefectureId}>
                  {PREFECTURE_LIST[Number(prefectureId)]}
                </option>
              );
            })}
          </select>
          <p className="text-sm text-rose-600 mt-2">
            {errors.prefecture?.message}
          </p>
        </div>
        <div className="mb-6">
          <label className="text-base mb-3 block">ひと言感想</label>
          <select {...register("evaluation")} className="w-full p-4 rounded-lg">
            <option value="">選んでください</option>
            {Object.keys(SAKE_EVALUATION_MAPS).map((evaluationId) => {
              return (
                <option key={`evaluation-${evaluationId}`} value={evaluationId}>
                  {
                    SAKE_EVALUATION_MAPS[
                      Number(evaluationId) as TSakeEvaluation
                    ]
                  }
                </option>
              );
            })}
          </select>
          <p className="text-sm text-rose-600 mt-2">
            {errors.evaluation?.message}
          </p>
        </div>
        <div className="mb-6">
          <label className="text-base mb-3 block">感想</label>
          <textarea
            className="w-full p-4 rounded-lg bg-white"
            {...register("review")}
          />
          <p className="text-sm text-rose-600 mt-2">{errors.review?.message}</p>
        </div>
        <div className="text-center">
          <input
            className="inline-block w-60 py-3 px-4 bg-cyan-600 rounded-lg text-white"
            type="submit"
            value="add sake review"
          />
        </div>
      </form>
    </>
  );
};
