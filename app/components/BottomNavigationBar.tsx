"use client";
import Link from "next/link";
import { HomeSvg } from "./svg/HomeSvg";
import { ReactNode } from "react";
import { AddSakeSvg } from "./svg/AddSakeSvg";
import { ForYouSvg } from "./svg/ForYouSvg";
import { HistorySvg } from "./svg/HistorySvg";
import { SettingsSvg } from "./svg/SettingsSvg";
import { usePathname } from "next/navigation";

type NavigationItem = {
  name: string;
  path: string;
  icon: ReactNode;
  disabled: boolean;
};

export const BottomNavigationBar: React.FC = () => {
  const pathname = usePathname();

  const NavigationItems: NavigationItem[] = [
    {
      name: "home",
      path: "/home",
      icon: <HomeSvg color="rgb(8 145 178)" size={32} />,
      disabled: false,
    },
    {
      name: "add sake",
      path: "/add_sake",
      icon: <AddSakeSvg color="rgb(8 145 178)" size={32} />,
      disabled: false,
    },
    {
      name: "for you",
      path: "/for_you",
      icon: <ForYouSvg color="rgb(203 213 225)" size={32} />,
      disabled: true,
    },
    {
      name: "history",
      path: "/history",
      icon: <HistorySvg color="rgb(203 213 225)" size={32} />,
      disabled: true,
    },
    {
      name: "settings",
      path: "/settings",
      icon: <SettingsSvg color="rgb(203 213 225)" size={32} />,
      disabled: true,
    },
  ];

  const setColor = (item: NavigationItem) => {
    if (item.disabled) {
      return "text-gray-300";
    } else {
      return "text-cyan-600";
    }
  };
  return (
    <section className="fixed bottom-0 left-0 w-full px-6 py-4 bg-white">
      <div className="flex align-center justify-between	">
        {NavigationItems.map((item, index) => {
          const isActive = pathname.startsWith(item.path);
          return item.disabled ? (
            <div key={index}>
              <div className={`text-center ${setColor(item)} `}>
                {item.icon}
                <p className="text-sm">{item.name}</p>
              </div>
            </div>
          ) : (
            <Link href={item.path} key={index}>
              <div className={`text-center ${setColor(item)}`}>
                {item.icon}
                <p className={`text-sm ${isActive ? "font-bold" : ""}`}>
                  {item.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
