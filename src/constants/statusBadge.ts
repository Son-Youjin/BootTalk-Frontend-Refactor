export const STATUS_BADGE = {
  APPROVED: {
    bgColor: "bg-orange-100",
    textColor: "text-stone-700",
    text: "승인",
  },
  PENDING: {
    bgColor: "bg-sky-100",
    textColor: "text-slate-700",
    text: "대기",
  },
  REJECTED: {
    bgColor: "bg-neutral-200",
    textColor: "text-stone-700",
    text: "거절",
  },
  CANCEL: {
    bgColor: "bg-neutral-200",
    textColor: "text-gray-500",
    text: "취소",
  },
  default: {
    bgColor: "bg-neutral-200",
    textColor: "text-gray-500",
    text: "",
  },
} as const;
