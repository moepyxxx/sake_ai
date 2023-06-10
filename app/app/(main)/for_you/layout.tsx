import { Title } from "@/components/Title";

export default function ForYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Title
        title="for you"
        description="あなたのsakeのこのみをaiが解説するよ"
      />
      {children}
    </>
  );
}
