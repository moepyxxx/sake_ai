import { Title } from "@/components/Title";
import { fetchRecommendSakeAction } from "@/lib/actions";

export default async function ForYouPage() {
  const { recommend, analytics } = await fetchRecommendSakeAction();
  return (
    <>
      <Title title="for you" description="あなたのsakeをaiが解説するよ" />
      <p>あなたに次におすすめのsake</p>
      <p>{recommend}</p>
      <p>あなたのsake嗜好</p>
      <p>{analytics}</p>
    </>
  );
}
