import type { BootcampDetail } from "@/types/response";
import DetailSectionCard from "./DetailSectionCard";

type BootcampScheduleProps = Pick<
  BootcampDetail,
  | "bootcampStartDate"
  | "bootcampEndDate"
  | "bootcampCapacity"
  | "bootcampDegree"
  | "bootcampCost"
>;

export default function BootcampSchedule({
  bootcampStartDate,
  bootcampEndDate,
  bootcampCapacity,
  bootcampDegree,
  bootcampCost,
}: BootcampScheduleProps) {
  const scheduleItems = [
    {
      label: "훈련 기간",
      value: `${bootcampStartDate} ~ ${bootcampEndDate}`,
    },
    {
      label: "총 정원",
      value: `${bootcampCapacity}명`,
    },
    {
      label: "개설 회차",
      value: `${bootcampDegree}회차`,
    },
    {
      label: "교육비",
      value: bootcampCost ? "유료" : "무료",
    },
  ];

  return (
    <DetailSectionCard title="일정 & 훈련 정보">
      <div className="space-y-4">
        {scheduleItems.map(({ label, value }) => (
          <div key={label} className="flex items-start">
            <span className="w-20 shrink-0 text-sm font-medium text-gray-800">
              {label}
            </span>

            <span className="break-word text-sm text-gray-600">{value}</span>
          </div>
        ))}
      </div>
    </DetailSectionCard>
  );
}
