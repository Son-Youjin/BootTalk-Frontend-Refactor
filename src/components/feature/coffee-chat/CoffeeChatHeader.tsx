"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MobileHeader from "@/components/mobile/MobileHeader";

const CoffeeChatHeader: React.FC = () => {
  const router = useRouter();

  const navigateToMyPage = () => {
    router.push("/mypage?tab=mentor");
  };

  return (
    <>
      <div className="hidden md:flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">커피챗</h1>
        <button
          className="btn btn-outline hover:text-amber-900 rounded-lg"
          onClick={navigateToMyPage}
        >
          멘토 프로필 관리
        </button>
      </div>

      <div className="flex-col md:hidden mb-6">
        <MobileHeader
          title="내 커피챗을 한눈에"
          subTitle="신청 · 확정된 커피챗을 관리하세요."
        />
      </div>
    </>
  );
};

export default CoffeeChatHeader;
