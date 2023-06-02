import { Lato } from "next/font/google";
import { BottomNavigationBar } from "@/components/BottomNavigationBar";
import { Header } from "@/components/Header";

const inter = Lato({ weight: ["400", "700"], subsets: ["latin-ext"] });

export const metadata = {
  title: "sake ai",
  description: "sake ai desu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="p-4 mb-24">{children}</div>
      <BottomNavigationBar />
    </>
  );
}
