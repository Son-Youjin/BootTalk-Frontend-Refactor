"use client";

import { useGetMyReviews } from "@/hooks/my-page/useGetMyReviews";
import { useGetMyInfo } from "@/hooks/my-page/useGetMyInfo";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useState } from "react";
import ReviewModal from "@/components/feature/review/ReviewModal";
import WriteReviewButton from "@/components/feature/review/WriteReviewButton";
import Modal from "@/components/common/modal/CommonModal";
import type { ReviewBootcamp, Review } from "@/types/response";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import ReviewItem from "../review/ReviewItem";

export default function MyReviews() {
  const {
    myReviews = [],
    isMyReviewsLoading,
    isMyReviewsError,
    refetch,
  } = useGetMyReviews();
  const { myInfo, isMyInfoLoading, isMyInfoError } = useGetMyInfo();

  const [editTarget, setEditTarget] = useState<{
    bootcamp: ReviewBootcamp;
    reviewId: number;
    rating: number;
    content: string;
  } | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await axiosDefault.delete(END_POINT.DELETE_REVIEW(deleteTargetId));
      toast.success("리뷰가 삭제되었습니다.");
      await refetch?.();
    } catch (err: unknown) {
      const error = err as AxiosError;

      if (error.response?.status === 403) toast.error("삭제 권한이 없습니다.");
      else if (error.response?.status === 400)
        toast.error("잔여 포인트가 부족합니다.");
      else toast.error("리뷰 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteTargetId(null);
    }
  };

  if (isMyReviewsLoading || isMyInfoLoading) return <div>Loading...</div>;
  if (isMyReviewsError || isMyInfoError) return <div>Error loading data</div>;

  const getCategoryName = (programId: string) =>
    myInfo?.certifications?.find((c) => c.trainingProgramId === programId)
      ?.categoryName ?? "";

  return (
    <div className="mx-auto min-h-[450px] flex flex-col justify-between">
      <div className="space-y-4">
        {myReviews.length === 0 ? (
          <p className="text-gray-500 text-center">작성된 리뷰가 없습니다.</p>
        ) : (
          myReviews.map((review: Review) => (
            <ReviewItem
              key={review.reviewId}
              review={{
                ...review,
                trainingCenterName: review.courseName,
                createdAt: new Date(review.createdAt).toLocaleDateString(),
              }}
              actionType="manage"
              showUserName={false}
              onEdit={() =>
                setEditTarget({
                  bootcamp: {
                    courseName: review.courseName,
                    userName: myInfo?.name ?? review.userName,
                    trainingProgramId: review.trainingProgramId,
                    categoryName: getCategoryName(review.trainingProgramId),
                  },
                  reviewId: review.reviewId,
                  rating: review.rating,
                  content: review.content,
                })
              }
              onDelete={() => {
                setDeleteTargetId(review.reviewId);
                setIsDeleteModalOpen(true);
              }}
            />
          ))
        )}
      </div>

      <div className="flex justify-end mt-6">
        <WriteReviewButton refetch={refetch} />
      </div>

      {editTarget && (
        <ReviewModal
          isOpen={!!editTarget}
          onCloseAction={() => setEditTarget(null)}
          bootcamp={editTarget.bootcamp}
          mode="edit"
          reviewId={editTarget.reviewId}
          defaultRating={editTarget.rating}
          defaultContent={editTarget.content}
          refetch={refetch}
        />
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="리뷰 삭제"
        size="sm"
      >
        <div className="text-gray-700 py-4">리뷰를 삭제하시겠습니까?</div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="btn btn-outline border-gray-400 rounded-lg"
          >
            취소
          </button>
          <button
            onClick={handleDelete}
            className="btn rounded-lg border border-gray-400 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
          >
            삭제
          </button>
        </div>
      </Modal>
    </div>
  );
}
