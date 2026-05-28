// CoffeeChatActionModal.tsx
import Modal from "@/components/common/modal/CommonModal";
import { X } from "lucide-react";
import React from "react";

export type ActionType = "APPROVE" | "REJECT" | "CANCEL";
export type UserRole = "MENTOR" | "MENTEE";

interface CoffeeChatActionModalProps {
  isOpen: boolean;
  actionType: ActionType;
  isPenalty: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  userRole: UserRole;
  targetName?: string;
  coffeeChatStartTime?: string;
}

const CoffeeChatActionModal: React.FC<CoffeeChatActionModalProps> = ({
  isOpen,
  actionType,
  isPenalty,
  onClose,
  onConfirm,
  isLoading = false,
  userRole = "MENTOR",
  targetName = "",
  coffeeChatStartTime = "",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} hideHeader size="md">
      <div className="px-5 py-6 sm:px-6 sm:py-7">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-[20px] font-bold tracking-[-0.02em]">
            {actionType === "APPROVE" && "커피챗 승인"}
            {actionType === "REJECT" && "커피챗 거절"}
            {actionType === "CANCEL" && "커피챗 취소"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X />
          </button>
        </div>

        <div className="text-center mb-6 px-2">
          <p className="text-[16px] font-bold leading-[1.45] text-gray-900 break-keep">
            {targetName} {userRole === "MENTEE" ? "멘토" : "멘티"} -{" "}
            {coffeeChatStartTime}
          </p>

          <p className="mt-2 text-[15px] text-gray-500 leading-relaxed">
            {actionType === "APPROVE" && "커피챗을 승인하시겠습니까?"}
            {actionType === "REJECT" && "커피챗을 거절하시겠습니까?"}
            {actionType === "CANCEL" && "커피챗을 취소하시겠습니까?"}
          </p>
        </div>

        {/* 패널티 경고 메시지 */}
        {actionType === "CANCEL" && isPenalty && (
          <div className="mb-7 rounded-2xl bg-red-50 px-4 py-4">
            <p className="mb-1 text-[14px] font-bold text-red-500">주의!</p>
            <p className="text-[14px] leading-relaxed text-red-400">
              {userRole === "MENTOR"
                ? `커피챗 시작 1일 전 이후 취소 시, 멘토 활동이 1개월간 제한됩니다.`
                : `커피챗 시작 1일 전 이후 취소 시, 환불이 불가합니다. `}
            </p>
          </div>
        )}

        {/* 버튼 영역 */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="h-12 flex-1 rounded-2xl bg-gray-100 text-[15px] font-semibold text-gray-700"
            disabled={isLoading}
          >
            돌아가기
          </button>
          <button
            onClick={onConfirm}
            className={`h-12 flex-1 rounded-2xl bg-[#E8D1C7] text-[15px] font-semibold text-gray-900
            ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {actionType === "APPROVE" && "승인하기"}
            {actionType === "REJECT" && "거절하기"}
            {actionType === "CANCEL" && "취소하기"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CoffeeChatActionModal;
