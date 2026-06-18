import { Search, Settings2 } from "lucide-react";
import MobileFilterDrawer from "./MobileFilterDrawer";
import { useState } from "react";

interface MobileHomeSearchProps {
  selectedFilters: Record<string, string>;
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  categoryOptions: string[];
}

// TODO: 모바일 사이즈 확인
export default function MobileHomeSearch({
  selectedFilters,
  setSelectedFilters,
  categoryOptions,
}: MobileHomeSearchProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFilterCount = Object.values(selectedFilters).filter(
    (value) => value && value.trim() !== "",
  ).length;

  return (
    <section className="mb-6">
      <div className="relative mt-5">
        <div className="flex h-12 items-center rounded-full border border-gray-200 bg-white px-4 shadow-sm">
          <Search className="h-4 w-4 text-gray-400" />

          <input
            type="text"
            placeholder="부트캠프명 또는 키워드를 검색해보세요"
            className="ml-3 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />

          <button
            type="button"
            className="relative ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
            onClick={() => setIsFilterOpen(true)}
          >
            <Settings2 className="h-4 w-4 text-gray-600" />
            {activeFilterCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          {isFilterOpen && (
            <MobileFilterDrawer
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              categoryOptions={categoryOptions}
            />
          )}
        </div>
      </div>
    </section>
  );
}
