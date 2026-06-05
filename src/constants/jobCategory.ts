export const jobCategoryMapping: Record<string, string> = {
  FRONTEND: "프론트엔드",
  BACKEND: "백엔드",
  PM: "PM",
  UIUX: "UI/UX 디자인",
  DATA_ANALYSIS: "데이터분석",
  ETC: "기타",
};

export const jobFilterOptions = [
  { value: "all", label: "모든 분야" },
  { value: "FRONTEND", label: "프론트엔드" },
  { value: "BACKEND", label: "백엔드" },
  { value: "PM", label: "PM" },
  { value: "UIUX", label: "UI/UX" },
  { value: "DATA_ANALYSIS", label: "데이터분석" },
  { value: "ETC", label: "기타" },
];
