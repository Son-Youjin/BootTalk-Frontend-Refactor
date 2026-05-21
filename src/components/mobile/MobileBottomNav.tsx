"use client";

import { mobileBottomNavItems } from "@/constants/mobileBottomNavItems";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileBottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-[768px] z-50 w-full border-t border-gray-200 bg-white md:hidden">
      <ul className="flex h-16 items-center justify-around">
        {mobileBottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex flex-col items-center gap-1 text-xs py-2"
              >
                <Icon
                  size={20}
                  className={isActive ? "text-slate-900" : "text-gray-400"}
                />

                <span
                  className={
                    isActive ? "font-semibold text-slate-900" : "text-gray-400"
                  }
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
