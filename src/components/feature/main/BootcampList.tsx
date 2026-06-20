"use client";

import { useEffect, useRef } from "react";
import { useGetBootcamps } from "@/hooks/main-page/useGetBootcamps";
import BootcampCard from "./BootcampCard";
import { Search } from "lucide-react";

interface BootcampListProps {
  filters: Record<string, string>;
  searchKeyword: string;
}

const BootcampList = ({ filters, searchKeyword }: BootcampListProps) => {
  const { bootcamps, fetchNextPage, hasNextPage, isLoading, isError } =
    useGetBootcamps(filters, searchKeyword);

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, bootcamps.length]);

  if (isLoading && bootcamps.length === 0)
    return <div className="text-center py-8">로딩 중...</div>;
  if (isError)
    return (
      <div className="text-center py-8 text-red-500">
        데이터를 불러오는데 실패했습니다.
      </div>
    );
  if (!bootcamps || bootcamps.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Search className="mb-3 text-gray-500" size={28} />

        <p className="font-semibold text-gray-800">
          해당 키워드와 일치하는 부트캠프가 없어요.
        </p>

        <p className="text-sm text-gray-500">
          다른 키워드로 다시 시도해주세요.
        </p>
      </div>
    );

  return (
    <section className="max-w-[1200px] mx-auto ">
      <div className="hidden md:grid grid-cols-6 gap-4 px-4 py-2 font-semibold text-sm text-gray-600 border-b border-t border-slate-300 bg-slate-50">
        <span>교육과정 명</span>
        <span className="flex justify-start pl-4">학습기간</span>
        <span className="flex justify-start pl-10">프로그램 과정</span>
        <span className="flex justify-start pl-16">지역</span>
        <span className="flex justify-start pl-10">정원</span>
        <span>평점 및 리뷰</span>
      </div>

      <ul>
        {bootcamps.map((bootcamp, index) => (
          <li key={`${bootcamp.bootcampId}-${index}`}>
            <BootcampCard {...bootcamp} />
          </li>
        ))}
      </ul>

      {/* 무한 스크롤 감지 */}
      <div ref={observerRef} className="py-4 text-center">
        {hasNextPage && (
          <div className="w-8 h-8 mx-auto border-t-2 border-b-2 border-amber-950 rounded-full animate-spin"></div>
        )}
      </div>
    </section>
  );
};

export default BootcampList;
