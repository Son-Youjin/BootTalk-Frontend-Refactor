"use client";

import { Star } from "lucide-react";
import type { Review } from "@/types/response";
import toast from "react-hot-toast";

interface ReviewItemProps {
  review: Review;
}

export default function ReviewItem({ review }: ReviewItemProps) {
  const handleReport = () => {
    toast("신고 기능은 추후 제공될 예정입니다.");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-2xl px-5 py-4 shadow-sm ">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-0.5 shrink-0">
          {renderStars(review.rating)}
        </div>

        <h3 className="text-sm font-medium text-gray-900 truncate">
          {review.trainingCenterName}
        </h3>
      </div>

      <p className="text-sm font-medium text-gray-800 line-clamp-2 break-keep mb-3">
        {review.content}
      </p>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400 truncate">
          {review.userName} | {review.createdAt}ㄴ
        </p>

        <button
          onClick={handleReport}
          className="shrink-0 px-2 py-1 text-sm text-gray-400"
        >
          신고
        </button>
      </div>
    </div>
  );
}
