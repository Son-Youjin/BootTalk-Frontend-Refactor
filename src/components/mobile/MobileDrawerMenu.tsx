"use client";

import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import Image from "next/image";
import { useGetMyInfo } from "@/hooks/my-page/useGetMyInfo";
import toast from "react-hot-toast";
import { mobileDrawerProfileItems } from "@/constants/mobileDrawerMenu";
import { CircleAlert, MessageCircle } from "lucide-react";
import WithdrawalButton from "../feature/mypage/WithdrawalButton";

interface MobileDrawerMenuProps {
  pathname: string;
}

const MobileDrawerMenu = ({ pathname }: MobileDrawerMenuProps) => {
  const { logout, isAuthenticated } = useUserStore();
  const queryClient = useQueryClient();

  const { myInfo, isMyInfoLoading, isMyInfoError } = useGetMyInfo();

  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById(
      "mobile-drawer",
    ) as HTMLInputElement;
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axiosDefault.post(END_POINT.LOGOUT);
    },
    onSuccess: () => {
      logout();
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
      toast.error("로그아웃 중 오류가 발생했습니다. 다시 시도해주세요");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
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
        </ul>

        <WithdrawalButton className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-rose-500 hover:bg-gray-100" />
      </div>

      <div className="shrink-0 border-t border-gray-200 p-6">
        {isAuthenticated && myInfo ? (
          <button
            className="w-full rounded-xl bg-gray-100 py-3 font-medium"
            onClick={() => {
              handleLogout();
              closeDrawer();
            }}
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
