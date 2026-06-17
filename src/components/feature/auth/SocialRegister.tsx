"use client";

import { axiosDefault } from "@/api/axiosInstance";
import { useRouter } from "next/navigation";
import { END_POINT } from "@/constants/endPoint";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";

const SocialRegister = () => {
  const [job, setJob] = useState("");
  const router = useRouter();

  const { data: jobRoles = [] } = useQuery({
    queryKey: ["jobRoles"],
    queryFn: async () => {
      const res = await axiosDefault.get(END_POINT.BOOTCAMP_JOB_ROLES);
      if (Array.isArray(res.data)) {
        return res.data;
      }
      throw new Error("직무 데이터를 불러올 수 없습니다.");
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (jobRole: string) => {
      const res = await axiosDefault.put(END_POINT.MY_INFO, {
        profileImage: "",
        desiredCareer: jobRole,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다!");
      router.replace("/");
    },
    onError: () => {
      toast.error("회원가입에 실패했습니다.");
    },
  });

  const handleSave = () => {
    if (!job) {
      toast.error("관심 직무를 선택해주세요.");
      return;
    }

    updateUserMutation.mutate(job);
  };

  return (
    <main className="mx-auto flex w-full max-w-lg flex-col items-center px-6 pt-24 md:pt-28">
      <h1 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
        관심 직무를 선택해주세요
      </h1>

      <p className="mt-3 max-w-sm text-center text-sm leading-6 text-gray-500 md:text-base">
        가입을 완료하기 위해 관심 직무를 선택해주세요.
      </p>

      <div className="mt-10 w-full">
        <select
          value={job}
          onChange={(e) => setJob(e.target.value)}
          className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-4 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5c4033]/20"
        >
          <option value="" disabled hidden>
            직무를 선택하세요
          </option>

          {jobRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSave}
        disabled={!job || updateUserMutation.isPending}
        className="mt-8 h-14 w-full rounded-2xl bg-[#5c4033] text-base font-semibold text-white transition-all disabled:cursor-not-allowed disabled:bg-gray-300 active:scale-[0.98]"
      >
        시작하기
      </button>
    </main>
  );
};

export default SocialRegister;
