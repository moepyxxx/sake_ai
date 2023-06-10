import { Title } from "@/components/Title";
import { fetchRecommendSakeAction } from "@/lib/actions";

export default async function ForYouPage() {
  const { recommend, analytics } = await fetchRecommendSakeAction();
  return (
    <>
      <Title title="for you" description="あなたのsakeをaiが解説するよ" />
      <div className="p-4 text-white bg-cyan-600 rounded-lg mb-4">
        <div className="text-center pb-3">
          <p className="text-lg">あなたに次におすすめのsake</p>
        </div>
        <p className="leading-7">{recommend}</p>
      </div>
      <div className="p-4 text-white bg-cyan-600 rounded-lg">
        <div className="text-center pb-3">
          <p className="text-lg">あなたのsake嗜好</p>
        </div>
        <p className="leading-7">{analytics}</p>
      </div>
    </>
  );
}
