import { AddSakeReviewForm } from "@/components/feature/AddSakeReviewForm";
import { Title } from "@/components/Title";
import { AddSakeReviewAction } from "@/lib/actions";

export default async function AddSakePage() {
  return (
    <>
      <Title title="add sake" description="飲んだsakeを追加して" />
      <AddSakeReviewForm AddSakeReviewAction={AddSakeReviewAction} />
    </>
  );
}
