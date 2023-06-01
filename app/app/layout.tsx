import "./globals.css";
import { Lato } from "next/font/google";

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
    <html lang="ja">
      <body className="bg-slate-100">{children}</body>
    </html>
  );
}
