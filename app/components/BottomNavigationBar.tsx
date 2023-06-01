import Link from "next/link";
import Image from "next/image";

export const BottomNavigationBar: React.FC = () => {
  return (
    <section className="fixed bottom-0 left-0 w-full px-6 py-4 bg-white">
      <div className="flex align-center justify-between	">
        <Link href="/">
          <Image src="icon/home.svg" alt="home" width={32} height={32} />
          <p className="text-sm">home</p>
        </Link>
        <Link href="/" className="text-center">
          <Image
            src="icon/add_sake.svg"
            alt="add_sake"
            width={32}
            height={32}
            className="inline"
          />
          <p className="text-sm">add sake</p>
        </Link>
        <Link href="/" className="text-center">
          <Image
            src="icon/for_you.svg"
            alt="for_you"
            width={32}
            height={32}
            className="inline"
          />
          <p className="text-sm">for you</p>
        </Link>
        <Link href="/" className="text-center">
          <Image
            src="icon/history.svg"
            alt="history"
            width={32}
            height={32}
            className="inline"
          />
          <p className="text-sm">history</p>
        </Link>
        <Link href="/" className="text-center">
          <Image
            src="icon/logout.svg"
            alt="logout"
            width={32}
            height={32}
            className="inline"
          />
          <p className="text-sm">logout</p>
        </Link>
      </div>
    </section>
  );
};
