"use client";

import { useState, Suspense } from "react";
import SearchSection from "@/components/common/SearchSection";
import FilterButtons from "@/components/feature/main/FilterButtons";
import BootcampList from "@/components/feature/main/BootcampList";
import { useGetBootcampCategories } from "@/hooks/main-page/useGetBootcampCategories";
import MobileHomeSearch from "@/components/mobile/MobileHomeSearch";
import MobileHeader from "@/components/mobile/MobileHeader";

export default function Home() {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});
  const { data: categories = [] } = useGetBootcampCategories();

  // TODO: 모바일 사이즈 확인
  return (
    <main>
      <Suspense fallback={<p>검색어 로딩 중...</p>}>
        {/* 데스크탑 */}
        <div className="hidden md:block -mx-6">
          <SearchSection />
          <FilterButtons
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            categoryOptions={categories}
          />
        </div>

        {/* 모바일 */}
        <div className="md:hidden">
          <MobileHeader
            title="부트캠프를 한눈에"
            subTitle="나에게 맞는 교육과정을 찾아보세요."
          />
          <MobileHomeSearch
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            categoryOptions={categories}
          />
        </div>
      </Suspense>
      <BootcampList filters={selectedFilters} />
    </main>
  );
}
