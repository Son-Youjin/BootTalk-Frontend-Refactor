"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/common/modal/CommonModal";
import { RatingSelector } from "@/components/feature/review/RatingSelector";
import { END_POINT } from "@/constants/endPoint";
import { axiosDefault } from "@/api/axiosInstance";
import type { ReviewBootcamp } from "@/types/response";
import toast from "react-hot-toast";

interface ReviewModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  bootcamp: ReviewBootcamp;
  mode?: "create" | "edit";
  reviewId?: number;
  defaultRating?: number;
  defaultContent?: string;
  refetch?: () => Promise<unknown>;
}

export default function ReviewModal({
  isOpen,
  onCloseAction,
  bootcamp,
  mode = "create",
  reviewId,
  defaultRating = 0,
  defaultContent = "",
  refetch,
}: ReviewModalProps) {
  const [rating, setRating] = useState(defaultRating);
  const [content, setContent] = useState(defaultContent);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRating(defaultRating);
      setContent(defaultContent);
    } else {
      setRating(0);
      setContent("");
    }
  }, [isOpen, defaultRating, defaultContent]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!bootcamp.trainingProgramId) {
      toast.error("부트캠프 정보를 불러오지 못했습니다.");
      setIsSubmitting(false);
      return;
    }
    if (rating === 0 || content.trim() === "") {
      toast.error("별점과 후기를 모두 작성해주세요!");
      setIsSubmitting(false);
      return;
    }

    const payload = { rating, content };

    try {
      if (mode === "edit" && reviewId != null) {
        await axiosDefault.put(END_POINT.UPDATE_REVIEW(reviewId), payload);
        toast.success("리뷰가 수정되었습니다!");
      } else {
        await axiosDefault.post(END_POINT.REVIEWS, {
          trainingProgramId: bootcamp.trainingProgramId,
          rating,
          content,
        });
        toast.success("리뷰가 등록되었습니다!");
      }

      if (refetch) {
        await refetch();
      }

      onCloseAction();
    } catch (err) {
      console.error("리뷰 저장 에러:", err);
      toast.error("리뷰 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseAction}
      title={mode === "edit" ? "리뷰 수정" : "리뷰 작성"}
      size="lg"
    >
      <div className="space-y-5 p-5">
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <div className="mb-2 flex items-start gap-1">
            <span className="text-sm font-medium text-gray-500 shrink-0">
              부트캠프 :
            </span>

            <p className="text-sm font-semibold text-gray-900 leading-5 break-words break-keep">
              {bootcamp.courseName}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 shrink-0">
              별점 :
            </span>

            <RatingSelector value={rating} onChange={setRating} />
          </div>
        </div>

        <div>
          <textarea
            placeholder="수강 경험과 느낀 점을 자유롭게 작성해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={500}
            className="w-full h-36 resize-none rounded-xl border border-gray-300 bg-white p-4 text-base leading-6 transition-colors placeholder:text-gray-400 focus:border-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-100"
          />
          <div className="mt-2 text-right text-xs text-gray-400">
            {content.length} / 500
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            className="flex-1 h-12 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium transition hover:bg-gray-50"
            onClick={onCloseAction}
          >
            취소
          </button>
          <button
            className="flex-1 h-12 rounded-xl bg-amber-900 text-white font-semibold transition-colors hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {mode === "edit" ? "수정하기" : "작성하기"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
