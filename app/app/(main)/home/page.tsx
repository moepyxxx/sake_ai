import { SakeReviewsList } from "@/components/feature/SakeReviewsList";
import { Title } from "@/components/Title";
import { fetchSakeReviewsAction } from "@/lib/actions";

export default async function HomePage() {
  return (
    <>
      <Title title="sake archive" description="あなたが最近飲んでいたsake" />
      <SakeReviewsList fetchSakeReviewsAction={fetchSakeReviewsAction} />
    </>
  );
}
