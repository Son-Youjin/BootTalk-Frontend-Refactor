"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { useGetReviews } from "@/hooks/reviews/useGetReviews";
import ReviewItem from "./ReviewItem";
import type { Review as ResponseReview } from "@/types/response";
import SelectJob from "./SelectJob";
import ReviewFilterButtons from "./ReviewFilterButtons";
import useFilterOptions from "@/hooks/reviews/useFilterOptions";
import EmptyState from "@/components/common/EmptyState";

export default function ReviewList() {
  const [filters, setFilters] = useState<{ category?: string; date?: string }>(
    {},
  );

  const { jobRoles, isLoading, isError } = useFilterOptions();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetReviews(filters);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    const target = observerRef.current;
    if (!target || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          loadingRef.current = true;
          fetchNextPage();
        }
      },
      { rootMargin: "300px", threshold: 0.1 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allReviews = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  const totalCount = useMemo(() => allReviews.length, [allReviews]);

  if (isError) {
    return (
      <p className="text-center text-red-500">리뷰를 불러오지 못했습니다.</p>
    );
  }

  if (isLoading) {
    return <p className="text-center">불러오는 중...</p>;
  }

  return (
    <section className="space-y-6">
      <div className="mt-8">
        <SelectJob
          value={filters.category}
          jobRoles={jobRoles}
          isLoading={isLoading}
          isError={isError}
          onChange={(value) => {
            setFilters((prev) => ({
              ...prev,
              category: value,
            }));
          }}
        />
      </div>

      <ReviewFilterButtons
        totalCount={totalCount}
        selectedFilters={filters}
        onFilterChange={(key, value) =>
          setFilters((prev) => ({ ...prev, [key]: value }))
        }
      />

      {allReviews.length > 0 ? (
        (allReviews as ResponseReview[]).map((review, idx) => (
          <ReviewItem key={`${review.reviewId}-${idx}`} review={review} />
        ))
      ) : (
        <EmptyState
          title="해당 키워드와 일치하는 리뷰가 없어요."
          subTitle="다른 키워드로 다시 시도해주세요."
        />
      )}

      <div ref={observerRef} className="h-32" />
      {isFetchingNextPage && (
        <p className="text-center py-4 text-sm text-gray-500">
          더 많은 리뷰를 불러오는 중...
        </p>
      )}
    </section>
  );
}
