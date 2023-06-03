import { Lato } from "next/font/google";
import { BottomNavigationBar } from "@/components/BottomNavigationBar";
import { Header } from "@/components/Header";
import { SignOutButton } from "@/components/SignOutButton";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

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
  const handleSignOut = async () => {
    "use server";
    const supabase = createServerActionClient<any>({ cookies });
    await supabase.auth.signOut();
  };

  return (
    <>
      <Header>
        <SignOutButton handleSignOut={handleSignOut} />
      </Header>
      <div className="p-4 mb-24">{children}</div>
      <BottomNavigationBar />
    </>
  );
}
