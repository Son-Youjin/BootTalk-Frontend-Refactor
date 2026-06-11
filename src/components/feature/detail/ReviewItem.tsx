import { Star } from "lucide-react";
import type { Review } from "@/types/response";

interface ReviewItemProps {
  review: Review;
}

export default function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      <div className="flex items-center overflow-hidden">
        <div className="flex items-center gap-0.5 shrink-0">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>

        <span className="ml-2 min-w-0 truncate text-sm font-medium text-gray-800">
          {review.userName}
        </span>

        <span className="shrink-0 text-xs text-gray-400">
          &nbsp;· {review.createdAt}
        </span>
      </div>

      <p className="mt-3 break-words text-sm text-gray-700 whitespace-pre-wrap">
        {review.content}
      </p>

      <div className="mt-2 flex justify-end">
        <button
          onClick={() => alert("신고 접수 기능은 준비 중입니다.")}
          className="text-xs text-gray-400 hover:text-red-400"
        >
          신고하기
        </button>
      </div>
    </div>
  );
}
