import { Search, Settings2 } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

interface MobileHomeSearchProps {
  selectedFilters: Record<string, string>;
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  categoryOptions: string[];

  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const MobileFilterDrawer = dynamic(() => import("./MobileFilterDrawer"), {
  ssr: false,
  loading: () => null,
});

export default function MobileHomeSearch({
  selectedFilters,
  setSelectedFilters,
  categoryOptions,
  searchKeyword,
  setSearchKeyword,
}: MobileHomeSearchProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFilterCount = Object.values(selectedFilters).filter(
    (value) => value && value.trim() !== "",
  ).length;

  return (
    <section className="mb-6">
      <div className="relative mt-5">
        <div className="flex h-14 items-center rounded-full border border-gray-200 bg-white px-4 shadow-sm">
          <Search className="h-5 w-5 text-gray-400" />

          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="키워드를 검색해보세요."
            className="ml-3 flex-1 bg-transparent text-base outline-none placeholder:text-gray-400"
          />

          <button
            type="button"
            className="relative ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
            onClick={() => setIsFilterOpen(true)}
            aria-label="필터링"
          >
            <Settings2 className="h-5 w-5 text-gray-600" />
            {activeFilterCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
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
