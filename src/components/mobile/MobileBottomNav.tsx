"use client";

import { mobileBottomNavItems } from "@/constants/mobileBottomNavItems";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileBottomNav = () => {
  const pathname = usePathname();

  // 채팅방에서는 BottomNav 숨김
  if (pathname.startsWith("/chat/")) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-full max-w-[768px] border-t border-gray-200 bg-[#F8F7F5] md:hidden">
      <ul className="flex h-16 items-center justify-around">
        {mobileBottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex flex-col items-center gap-1 py-2 text-xs"
              >
                <Icon
                  size={20}
                  className={isActive ? "text-slate-900" : "text-gray-500"}
                />

                <span
                  className={
                    isActive ? "font-semibold text-slate-900" : "text-gray-500"
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
