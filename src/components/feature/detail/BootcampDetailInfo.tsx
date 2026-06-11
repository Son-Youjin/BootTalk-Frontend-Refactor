import { Phone, Mail, MapPin, LinkIcon } from "lucide-react";
import type { BootcampDetail } from "@/types/response";
import DetailSectionCard from "./DetailSectionCard";

type BootcampDetailInfoProps = Pick<
  BootcampDetail,
  | "trainingCenterName"
  | "trainingCenterAddress"
  | "trainingCenterPhoneNumber"
  | "trainingCenterEmail"
  | "trainingCenterUrl"
>;

export default function BootcampDetailInfo({
  trainingCenterName,
  trainingCenterAddress,
  trainingCenterPhoneNumber,
  trainingCenterEmail,
  trainingCenterUrl,
}: BootcampDetailInfoProps) {
  const iconClass = "w-4 h-4 text-gray-500 shrink-0 mt-0.5";

  const infoItems = [
    {
      icon: MapPin,
      value: trainingCenterAddress,
      className: "break-words",
    },
    {
      icon: Phone,
      value: trainingCenterPhoneNumber,
    },
    {
      icon: Mail,
      value: trainingCenterEmail,
      className: "break-all",
    },
  ];

  return (
    <DetailSectionCard title="교육기관 정보">
      <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center">
        <div className="w-full md:pr-6">
          <a
            href={trainingCenterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-lg md:text-xl font-bold text-gray-900 hover:underline break-words mb-4"
          >
            {trainingCenterName}
          </a>

          <div className="space-y-3 text-base text-gray-600">
            {infoItems.map(({ icon: Icon, value, className }) => (
              <div key={value} className="flex items-start gap-3">
                <Icon className={iconClass} />
                <span className={className}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 데스크탑 전용 버튼 */}
        <a
          href={trainingCenterUrl}
          title={`${trainingCenterName} 홈페이지 바로가기`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block shrink-0"
        >
          <button className="btn btn-outline btn-base flex items-center gap-2 border-none bg-gray-100 hover:bg-gray-200 rounded-full whitespace-nowrap">
            <LinkIcon className="w-4 h-4" />
            홈페이지 바로가기
          </button>
        </a>
      </div>
    </DetailSectionCard>
  );
}
