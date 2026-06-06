"use client";

import { useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Info, ChevronRight } from "lucide-react";
import { useMentorList } from "@/hooks/coffee-chat/useMentorList";
import useOutsideClick from "@/hooks/useOutsideClick";
import MentorsList from "./MentorsList";
import { shuffleArray } from "@/lib/utils";

export default function MobileMentorRecommendation() {
  const router = useRouter();
  const { mentorList } = useMentorList("all");
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useOutsideClick(tooltipRef, () => {
    setIsTooltipOpen(false);
  });

  const randomMentors = useMemo(() => {
    return shuffleArray(mentorList ?? []).slice(0, 2);
  }, [mentorList]);

  return (
    <section className="relative mt-6">
      {isTooltipOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsTooltipOpen(false)}
        />
      )}

      <div className="relative mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h2 className="text-[18px] font-semibold text-gray-900">
            추천 멘토를 만나보세요!
          </h2>

          <div ref={tooltipRef} className="relative">
            <button
              type="button"
              onClick={() => setIsTooltipOpen((prev) => !prev)}
              className="flex items-center"
            >
              <Info size={14} className="cursor-pointer text-gray-400" />
            </button>

            {isTooltipOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-gray-100 bg-white px-3 py-2 text-[12px] text-gray-600 shadow-lg">
                멘토는 랜덤으로 추천됩니다.
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push("/coffee-chat/mentors")}
          className="flex items-center gap-0.5 text-[12px] font-medium text-gray-500"
        >
          더보기
          <ChevronRight size={14} />
        </button>
      </div>

      <MentorsList mentorList={randomMentors} />
    </section>
  );
}
