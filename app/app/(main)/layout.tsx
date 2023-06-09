"use client";
import { Lato } from "next/font/google";
import { BottomNavigationBar } from "@/components/BottomNavigationBar";
import { Header } from "@/components/Header";
import { SignOutButton } from "@/components/SignOutButton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Lato({ weight: ["400", "700"], subsets: ["latin-ext"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header>
        <SignOutButton />
      </Header>
      <div className="p-4 mb-24">{children}</div>
      <BottomNavigationBar />
    </QueryClientProvider>
  );
}
