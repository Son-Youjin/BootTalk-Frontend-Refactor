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
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    region: true,
    duration: true,
    minRating: true,
    category: true,
  });

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

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({});
  };
  // TODO: 모바일 사이즈 확인

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[100] bg-black/40" onClick={onClose} />

      {/* Bottom Sheet */}
      <div
        className="fixed inset-x-0 bottom-0 z-[101] rounded-t-3xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center py-3">
          <div className="h-1 w-12 rounded-full bg-gray-300" />
        </div>

        <div className="max-h-[75vh] overflow-y-auto px-6 pb-6">
          {allFilters.map((filter) => {
            const isSectionOpen = openSections[filter.key];

            return (
              <section
                key={filter.key}
                className="border-b border-gray-100 py-5"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(filter.key)}
                  className="flex w-full items-center justify-between"
                >
                  <h3 className="font-semibold text-gray-900">
                    {filter.label}
                  </h3>

                  {isSectionOpen ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </button>

                {isSectionOpen && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {filter.options.map((option) => {
                      const selected =
                        selectedFilters[filter.key] === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleSelect(filter.key, option.value)}
                          className={`rounded-full border px-3 py-1.5 text-xs transition ${
                            selected
                              ? "border-[#E3CDC3] bg-[#F4E4DE] text-gray-900"
                              : "border-gray-200 bg-white text-gray-600"
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

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={clearFilters}
              className="h-12 flex-1 rounded-xl bg-gray-100 font-medium"
            >
              초기화
            </button>

            <button
              type="button"
              onClick={onClose}
              className="h-12 flex-1 rounded-xl bg-[#E3CDC3] font-medium"
            >
              적용하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
