import { STATUS_BADGE } from "@/constants/statusBadge";

interface getStatusBadgeProps {
  status: string;
}

export default function getStatusBadge({ status }: getStatusBadgeProps) {
  const { bgColor, textColor, text } =
    STATUS_BADGE[status as keyof typeof STATUS_BADGE] || STATUS_BADGE.default;

  return (
    <div
      className={`
        inline-flex items-center justify-center
        rounded-full px-2.5 py-1
        text-[11px] font-semibold
        whitespace-nowrap
        ${bgColor} ${textColor}
      `}
    >
      {text}
    </div>
  );
}
