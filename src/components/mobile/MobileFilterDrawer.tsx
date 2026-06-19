"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { STATIC_FILTER_OPTIONS } from "../feature/main/bootcampFilters";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: Record<string, string>;
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  categoryOptions: string[];
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  selectedFilters,
  setSelectedFilters,
  categoryOptions,
}: MobileFilterDrawerProps) {
  const [openSection, setOpenSection] = useState<string>("category");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const allFilters = [
    ...STATIC_FILTER_OPTIONS.map((filter) => ({
      key: filter.key,
      label: filter.label,
      options: filter.options.map((option) =>
        typeof option === "string" ? { label: option, value: option } : option,
      ),
    })),
    {
      key: "category",
      label: "직무",
      options: categoryOptions.map((category) => ({
        label: category,
        value: category,
      })),
    },
  ];

  const handleSelect = (filterKey: string, value: string) => {
    setSelectedFilters((prev) => {
      const next = { ...prev };

      if (next[filterKey] === value) {
        delete next[filterKey];
      } else {
        next[filterKey] = value;
      }

      return next;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[100] bg-black/40" onClick={onClose} />

      <div
        className="fixed inset-x-0 bottom-0 z-[101] flex h-[70vh] flex-col rounded-t-3xl bg-white shadow-xl py-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 스크롤 */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          {allFilters.map((filter) => {
            const isSectionOpen = openSection === filter.key;

            return (
              <section
                key={filter.key}
                className="border-b border-gray-100 py-4 last:border-none"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenSection(isSectionOpen ? "" : filter.key)
                  }
                  className="flex w-full items-center justify-between py-1"
                >
                  <h3 className="font-semibold text-gray-900">
                    {filter.label}
                  </h3>

                  {isSectionOpen ? (
                    <ChevronDown size={18} className="text-gray-500" />
                  ) : (
                    <ChevronRight size={18} className="text-gray-500" />
                  )}
                </button>

                {isSectionOpen && (
                  <div className="mt-4 flex flex-wrap gap-2 pb-2">
                    {filter.options.map((option) => {
                      const selected =
                        selectedFilters[filter.key] === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleSelect(filter.key, option.value)}
                          className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                            selected
                              ? "border-[#E3CDC3] bg-[#F4E4DE] text-gray-900"
                              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* 하단 고정 버튼 영역 */}
        <div className="flex gap-3 border-t border-gray-100 bg-white px-6 py-4 pb-6 flex-shrink-0">
          <button
            type="button"
            onClick={clearFilters}
            className="h-12 flex-1 rounded-xl bg-gray-100 font-medium text-gray-600 active:bg-gray-200 transition"
          >
            초기화
          </button>

          <button
            type="button"
            onClick={onClose}
            className="h-12 flex-[2] rounded-xl bg-[#E3CDC3] text-base font-semibold text-gray-900 active:opacity-90 transition shadow-sm"
          >
            적용하기
          </button>
        </div>
      </div>
    </>
  );
}
