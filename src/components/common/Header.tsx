"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import { Menu, MessageCircleCode } from "lucide-react";
import { useDrawerScrollLock } from "@/hooks/useDrawerScrollLock";
import { useUserStore } from "@/store/useUserStore";
import { useGetMyInfo } from "@/hooks/my-page/useGetMyInfo";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { headerNavItems } from "@/constants/headerNavItem";
import { useLogout } from "@/hooks/useLogout";
import WithdrawalConfirmModal from "../feature/mypage/WithdrawalConfirmModal";

const MobileDrawerMenu = dynamic(
  () => import("@/components/mobile/MobileDrawerMenu"),
  {
    ssr: false,
    loading: () => null,
  },
);

const NotificationDropdown = dynamic(
  () => import("@/components/notification/NotificationDropdown"),
  {
    ssr: false,
    loading: () => null,
  },
);

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const { user, isAuthenticated, setUser } = useUserStore();
  const pathname = usePathname();
  const logout = useLogout();

  const handleWithdrawalClick = () => {
    setIsDrawerOpen(false);

    setTimeout(() => {
      setIsWithdrawalModalOpen(true);
    }, 200);
  };

  useDrawerScrollLock();

  const { myInfo, isMyInfoLoading, isMyInfoError } = useGetMyInfo();

  useEffect(() => {
    if (myInfo && !isMyInfoLoading && !isMyInfoError) {
      setUser(myInfo);
    }
  }, [myInfo, isMyInfoLoading, isMyInfoError, setUser]);

  return (
    <>
      <input
        id="mobile-drawer"
        type="checkbox"
        className="drawer-toggle hidden"
        checked={isDrawerOpen}
        onChange={(e) => setIsDrawerOpen(e.target.checked)}
      />
      <header className="sticky top-0 z-60 shadow-m bg-[#F8F7F5] shadow-md">
        <div className="navbar max-w-[1200px] mx-auto px-4 md:px-6 items-center justify-between">
          <div className="w-12 flex items-center md:w-auto">
            <button
              className="btn btn-ghost md:hidden"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="메뉴 열기"
            >
              <Menu size={24} />
            </button>
          </div>

          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/logo.PNG"
                alt="로고"
                width={160}
                height={20}
                className="w-[120px] md:w-[160px]"
              />
            </Link>
          </div>

          <nav className="hidden md:block text-md">
            <div className="max-w-screen-xl mx-auto px-4">
              <ul className="flex justify-around gap-12 py-3">
                {headerNavItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={pathname === item.href ? "font-semibold" : ""}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="w-12 flex justify-end items-center md:w-auto">
            <div className="flex items-center gap-4">
              {isAuthenticated && user ? (
                <div className="flex items-center gap-3">
                  <div className="flex">
                    <div className="relative">
                      <button
                        className="btn btn-ghost btn-circle"
                        aria-label="알림"
                      >
                        <NotificationDropdown />
                      </button>
                    </div>
                    <Link
                      href="/chat"
                      className="hidden btn btn-ghost btn-circle"
                      aria-label="채팅"
                    >
                      <MessageCircleCode size={18} />
                    </Link>
                  </div>

                  <div className="hidden md:block">
                    <Link
                      href="/mypage"
                      className="text-sm font-medium hover:underline"
                    >
                      {`${myInfo?.name}님`}
                    </Link>

                    <span className="text-sm font-medium ml-3">
                      {myInfo?.currentPoint}P
                    </span>

                    <button
                      className="btn bg=[#F8F7F5] border-none text-sm hover:text-amber-950 transition-colors "
                      onClick={() => logout.mutate()}
                      disabled={isMyInfoLoading || isMyInfoError}
                    >
                      로그아웃
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="btn bg-base-100 border-none text-sm hover:text-amber-950 transition-colors"
                  >
                    로그인 / 회원가입
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="drawer-side z-100 md:hidden fixed">
        <label
          className="drawer-overlay"
          onClick={() => setIsDrawerOpen(false)}
        />
        <MobileDrawerMenu
          pathname={pathname}
          closeDrawer={() => setIsDrawerOpen(false)}
          onWithdrawalClick={handleWithdrawalClick}
        />
      </div>

      <WithdrawalConfirmModal
        isOpen={isWithdrawalModalOpen}
        onClose={() => setIsWithdrawalModalOpen(false)}
      />
    </>
  );
};

export default Header;
