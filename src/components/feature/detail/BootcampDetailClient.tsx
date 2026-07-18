"use client";

import { useGetBootcampDetail } from "@/hooks/detail/useGetBootcampDetail";
import BootcampDetailInfo from "@/components/feature/detail/BootcampDetailInfo";
import BootcampSchedule from "@/components/feature/detail/BootcampSchedule";
import BootcampReview from "@/components/feature/detail/BootcampReview";
import BootcampIntro from "./BootcampIntro";
import BootcampSummary from "./BootcampSummary";
import { getBootcampDuration, getReviewSummary } from "@/lib/utils";
interface Props {
  id: string;
}

const BootcampDetailClient = ({ id }: Props) => {
  const { data, isLoading, isError } = useGetBootcampDetail(id);

  if (isLoading)
    return <p className="p-10 text-center text-gray-500">불러오는 중...</p>;
  if (isError || !data)
    return (
      <p className="p-10 text-center text-gray-500">
        데이터를 불러오지 못했습니다.
      </p>
    );

  const duration = getBootcampDuration(
    data.bootcampStartDate,
    data.bootcampEndDate,
  );

  const { averageRating, reviewCount } = getReviewSummary(data.reviews);

  return (
    <>
      <main className="mx-auto max-w-screen-xl">
        {/* 제목 영역 */}
        <div className="mb-8 overflow-hidden">
          <h1 className="text-2xl font-bold leading-snug text-amber-950">
            {data.bootcampName}
          </h1>

          <div className="border-t border-amber-600 mt-4 mb-3" />

          <BootcampSummary
            rating={averageRating}
            reviewsCount={reviewCount}
            region={data.bootcampRegion}
            duration={duration}
            isFree={!data.bootcampCost}
            jobCategory={data.bootcampCategory}
          />
        </div>

        {/* 상세 정보 카드 */}
        <BootcampDetailInfo
          trainingCenterName={data.trainingCenterName}
          trainingCenterAddress={data.trainingCenterAddress}
          trainingCenterPhoneNumber={data.trainingCenterPhoneNumber || "-"}
          trainingCenterEmail={data.trainingCenterEmail || "-"}
          trainingCenterUrl={data.trainingCenterUrl}
        />
        <BootcampSchedule
          bootcampStartDate={data.bootcampStartDate}
          bootcampEndDate={data.bootcampEndDate}
          bootcampCapacity={data.bootcampCapacity}
          bootcampDegree={data.bootcampDegree}
          bootcampCost={data.bootcampCost}
        />

        <BootcampIntro />

        <BootcampReview reviews={data.reviews ?? []} />
      </main>
    </>
  );
};
export default BootcampDetailClient;
