import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full p-4">
      <Link href="/" className="text-2xl">
        sake ai
      </Link>
    </header>
  );
};
