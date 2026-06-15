"use client";

import { ArrowDown, ArrowUp } from "lucide-react";

interface FilterType {
  category?: string;
  date?: string;
}

interface Props {
  totalCount: number;
  selectedFilters: FilterType;
  onFilterChange: (key: "category" | "date", value?: string) => void;
}

export default function ReviewFilterButtons({
  totalCount,
  selectedFilters,
  onFilterChange,
}: Props) {
  const isLatest = selectedFilters.date !== "오래된순";

  const handleToggleSort = () => {
    const nextValue = isLatest ? "오래된순" : "최신순";

    onFilterChange("date", nextValue);
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500 whitespace-nowrap mt-2 sm:mt-0">
        총 {totalCount}개
      </span>

      <button
        type="button"
        onClick={handleToggleSort}
        className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black transition-colors"
      >
        <span>정렬</span>

        {isLatest ? (
          <ArrowDown className="w-3.5 h-3.5" />
        ) : (
          <ArrowUp className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
}
