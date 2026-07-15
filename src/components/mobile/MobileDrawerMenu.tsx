"use client";

import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";
import { useGetMyInfo } from "@/hooks/my-page/useGetMyInfo";
import { mobileDrawerProfileItems } from "@/constants/mobileDrawerMenu";
import { CircleAlert, MessageCircle } from "lucide-react";
import WithdrawalButton from "../feature/mypage/WithdrawalButton";
import { useLogout } from "@/hooks/useLogout";

interface MobileDrawerMenuProps {
  pathname: string;
  closeDrawer: () => void;
  onWithdrawalClick: () => void;
}

const MobileDrawerMenu = ({
  pathname,
  closeDrawer,
  onWithdrawalClick,
}: MobileDrawerMenuProps) => {
  const { isAuthenticated } = useUserStore();
  const { myInfo, isMyInfoLoading, isMyInfoError } = useGetMyInfo();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
    closeDrawer();
  };

  return (
    <div className="menu flex h-full w-80 flex-col bg-white text-slate-900">
      <div className="flex-1 overflow-y-auto p-6">
        {/* 프로필 카드 */}
        {isAuthenticated && myInfo && (
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4 mb-8">
            <Image
              src="/profile-default.png"
              alt="프로필"
              width={48}
              height={48}
              className="rounded-full"
            />

            <div>
              <div className="font-bold">{myInfo.name}님</div>
              <div className="text-sm text-gray-500">
                포인트 : {myInfo.currentPoint}P
              </div>
            </div>
          </div>
        )}

        {/* 프로필 메뉴 */}
        <p className="text-sm text-gray-400 mb-3">프로필</p>

        <ul className="space-y-2">
          {mobileDrawerProfileItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center rounded-xl px-4 py-3 font-medium hover:bg-gray-100 ${
                    pathname === item.href ? "bg-gray-100" : ""
                  }`}
                  onClick={closeDrawer}
                >
                  <Icon size={20} className="mr-2" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="my-6" />

        {/* 설정 / 지원 */}
        <p className="text-sm text-gray-400 mt-6 mb-3">설정 / 지원</p>

        <ul className="space-y-2">
          <li key={"/mypage?tab=service"}>
            <Link
              href={"/mypage?tab=service"}
              className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium hover:bg-gray-100"
              onClick={closeDrawer}
            >
              <CircleAlert size={20} />
              <span>서비스 안내</span>
            </Link>
          </li>
          <li key={"googleForm"}>
            <a
              href={"https://forms.gle/U5D8Jxpst4vdbbQi6"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium hover:bg-gray-100"
            >
              <MessageCircle size={20} />
              <span>피드백 보내기</span>
            </a>
          </li>
          <li>
            <WithdrawalButton
              onClick={onWithdrawalClick}
              className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-rose-500 hover:bg-gray-100"
            />
          </li>
        </ul>
      </div>

      <div className="shrink-0 border-t border-gray-200 p-6">
        {isAuthenticated && myInfo ? (
          <button
            className="w-full rounded-xl bg-gray-100 py-3 font-medium"
            onClick={handleLogout}
            disabled={isMyInfoLoading || isMyInfoError}
          >
            로그아웃
          </button>
        ) : (
          <Link
            href="/login"
            className="block w-full rounded-xl bg-gray-100 py-3 text-center font-medium"
            onClick={closeDrawer}
          >
            로그인 / 회원가입
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileDrawerMenu;
