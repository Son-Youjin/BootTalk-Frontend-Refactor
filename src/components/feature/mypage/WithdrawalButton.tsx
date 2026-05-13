import Modal from "@/components/common/modal/CommonModal";
import { useDeleteAccount } from "@/hooks/useDeleteAccount";
import { LogOut } from "lucide-react";
import React, { useState } from "react";

interface WithdrawalButtonProps {
  className?: string;
}

const WithdrawalButton = ({ className }: WithdrawalButtonProps) => {
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const deleteAccount = useDeleteAccount();

  return (
    <>
      <button
        className={`flex items-center gap-2 transition-colors ${className ?? ""}`}
      >
        <LogOut size={18} />
        <span>회원탈퇴</span>
      </button>

      {/* 회원탈퇴 확인 모달 */}
      <Modal
        isOpen={isWithdrawalModalOpen}
        onClose={() => setIsWithdrawalModalOpen(false)}
        title="회원탈퇴"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            정말 탈퇴하시겠습니까? 탈퇴 시 모든 데이터가 삭제되며 이 작업은
            되돌릴 수 없습니다.
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <button
              className="btn btn-outline"
              onClick={() => setIsWithdrawalModalOpen(false)}
            >
              취소
            </button>
            <button
              className="btn btn-neutral"
              onClick={() => deleteAccount.mutate()}
              disabled={deleteAccount.isPending}
            >
              {deleteAccount.isPending ? "처리 중..." : "탈퇴하기"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WithdrawalButton;
