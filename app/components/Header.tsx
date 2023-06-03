import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};
export const Header: React.FC<Props> = ({ children }) => {
  return (
    <header className="fixed top-0 left-0 w-full p-4 flex justify-between">
      <Link href="/" className="text-2xl">
        sake ai
      </Link>
      {children}
    </header>
  );
};
