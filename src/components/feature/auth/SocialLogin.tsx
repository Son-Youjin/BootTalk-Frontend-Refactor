"use client";

import Image from "next/image";
import { END_POINT } from "@/constants/endPoint";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const handleNaverLogin = () => {
    try {
      window.location.href = END_POINT.NAVER_REDIRECT;
    } catch {
      toast.error("로그인 실패. 관리자에게 문의하세요.");
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-md flex-col items-center px-6 pt-44 md:pt-28">
      <Image
        src="/logo.svg"
        alt="BootTalk"
        width={280}
        height={80}
        priority
        className="h-auto w-[220px] md:w-[280px]"
      />

      <p className="mt-3 text-center text-xs text-gray-500">
        실제 수강생들의 이야기를 만나보세요
      </p>

      <button
        onClick={handleNaverLogin}
        className="mt-10 transition-transform active:scale-[0.98]"
      >
        <Image
          src="/NAVER_login.png"
          alt="네이버 로그인"
          width={280}
          height={56}
          className="h-auto w-full max-w-[280px]"
          priority
        />
      </button>
    </main>
  );
};

export default SocialLogin;
