export const STATUS_BADGE = {
  APPROVED: {
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-700",
    text: "승인",
  },
  PENDING: {
    bgColor: "bg-sky-100",
    textColor: "text-sky-700",
    text: "대기",
  },
  REJECTED: {
    bgColor: "bg-rose-100",
    textColor: "text-rose-700",
    text: "거절",
  },
  CANCELED: {
    bgColor: "bg-gray-100",
    textColor: "text-gray-500",
    text: "취소",
  },
  default: {
    bgColor: "bg-gray-100",
    textColor: "text-gray-500",
    text: "종료",
  },
} as const;
