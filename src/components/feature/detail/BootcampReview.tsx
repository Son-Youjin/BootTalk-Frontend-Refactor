"use client";

import type { Review } from "@/types/response";
import DetailSectionCard from "./DetailSectionCard";
import ReviewItem from "../review/ReviewItem";

interface BootcampReviewProps {
  reviews: Review[];
}

export default function BootcampReview({ reviews }: BootcampReviewProps) {
  return (
    <DetailSectionCard title="부트캠프 리뷰">
      <div className="space-y-3">
        {reviews?.length > 0 ? (
          reviews.map((review) => (
            <ReviewItem
              key={`${review.reviewId}-${review.trainingProgramId}`}
              review={review}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">아직 등록된 리뷰가 없습니다.</p>
        )}
      </div>
    </DetailSectionCard>
  );
}
