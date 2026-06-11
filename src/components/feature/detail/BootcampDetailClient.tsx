"use client";

import { useGetBootcampDetail } from "@/hooks/detail/useGetBootcampDetail";
import BootcampDetailInfo from "@/components/feature/detail/BootcampDetailInfo";
import BootcampSchedule from "@/components/feature/detail/BootcampSchedule";
import BootcampReview from "@/components/feature/detail/BootcampReview";
import BootcampIntro from "./BootcampIntro";
import clsx from "clsx";
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
  return (
    <>
      <main className="mx-auto max-w-screen-xl px-5 py-8 sm:px-6 sm:py-10">
        {/* 제목 영역 */}
        <div className="mb-8 mt-6 overflow-hidden">
          <h1
            className={clsx(
              "text-2xl font-semibold text-amber-950 max-w-full",
              "break-words",
              "sm:line-clamp-2 sm:break-keep",
              "lg:truncate",
            )}
          >
            {data.bootcampName}
          </h1>
          <div className="border-t border-amber-600 mt-4" />
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
