import { SakeReviewCard } from "@/components/SakeReviewCard";
import { Title } from "@/components/Title";
import { fetchSakeReviewsAction } from "@/lib/actions";

export const revalidate = 10;
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // const sakeReviews: TSakeReview[] = await (
  //   await fetch(process.env.NEXT_PUBLIC_API_URL + "/sake_reviews", {
  //     next: { revalidate: 3 },
  //   })
  // ).json();

  // console.log(sakeReviews);

  // console.log(res, "sake");
  const sakeReviews = await fetchSakeReviewsAction();
  return (
    <>
      <Title title="sake archive" description="あなたが最近飲んでいたsake" />
      {/* <SakeReviewsList fetchSakeReviewsAction={fetchSakeReviewsAction} /> */}
      {sakeReviews?.map((sakeReview) => (
        <SakeReviewCard key={sakeReview.id} sakeReview={sakeReview} />
      ))}
    </>
  );
}
