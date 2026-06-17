"use client";

import { useRouter } from "next/navigation";
import type { Bootcamp } from "@/types/response";
import BootcampMobile from "./BootcampMobile";
import clsx from "clsx";
import { Star } from "lucide-react";

const BootcampCard = ({
  bootcampId,
  trainingCenterName,
  bootcampName,
  bootcampRegion,
  bootcampStartDate,
  bootcampEndDate,
  bootcampCategory,
  bootcampCapacity,
  courseAverageRating,
  courseReviewCount,
}: Bootcamp) => {
  const router = useRouter();
  const primaryRegion = bootcampRegion.split(" ")[0];

  const wrapperClass = clsx(
    "relative cursor-pointer bg-white transition-all",

    // Mobile
    "flex flex-col gap-4 px-5 py-5",
    "rounded-2xl border border-gray-200 shadow-sm hover:shadow-md",

    // Desktop
    "lg:grid lg:grid-cols-6 lg:items-center",
    "lg:gap-6",
    "lg:px-6 lg:py-5",
    "lg:rounded-none",
    "lg:border-x-0 lg:border-t-0",
    "lg:shadow-none",
    "lg:hover:bg-gray-50",
  );

  return (
    <div
      className={clsx(wrapperClass, "mb-3 md:mb-4 lg:mb-0")}
      onClick={() => router.push(`/bootcamps/${bootcampId}`)}
    >
      {/* 교육 기관명 + 교육 과정명 */}
      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-400">{trainingCenterName}</span>

        <h2 className="text-[18px] font-semibold leading-[1.35] text-gray-900 line-clamp-2">
          {bootcampName}
        </h2>
      </div>

      {/* 모바일: 평점 + 기간 */}
      <div className="flex flex-wrap items-center gap-1.5 text-[13px] text-gray-500 lg:hidden">
        <Star className="h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" />

        <span>
          {courseAverageRating.toFixed(1)} | {courseReviewCount}명
        </span>

        <span className="text-gray-400">•</span>

        <span>
          {bootcampStartDate} ~ {bootcampEndDate}
        </span>
      </div>

      {/* 학습 기간 */}
      <div className="hidden lg:block text-sm text-gray-600">
        <div>{bootcampStartDate}</div>
        <div>{bootcampEndDate}</div>
      </div>

      {/* 프로그램 과정 */}
      <div className="hidden lg:flex">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
          {bootcampCategory}
        </span>
      </div>

      {/* 지역 */}
      <div className="hidden lg:flex">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
          {primaryRegion}
        </span>
      </div>

      {/* 정원 */}
      <div className="hidden lg:block text-sm text-gray-600">
        {bootcampCapacity}명
      </div>

      {/* 데스크탑: 평점 및 리뷰 */}
      <div className="hidden lg:flex items-center gap-1 text-sm text-gray-600">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

        <span>
          {courseAverageRating.toFixed(1)} | {courseReviewCount}명
        </span>
      </div>

      <BootcampMobile
        category={bootcampCategory}
        region={primaryRegion}
        capacity={bootcampCapacity}
      />
    </div>
  );
};

export default BootcampCard;
