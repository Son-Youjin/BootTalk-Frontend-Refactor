import Modal from "@/components/common/modal/CommonModal";
import { useDeleteAccount } from "@/hooks/useDeleteAccount";

interface WithdrawalConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WithdrawalConfirmModal({
  isOpen,
  onClose,
}: WithdrawalConfirmModalProps) {
  const deleteAccount = useDeleteAccount();

  const handleWithdraw = () => {
    deleteAccount.mutate(undefined, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="회원 탈퇴" size="xs">
      <div className="pt-4">
        <p className="text-center text-base font-semibold text-gray-900">
          정말 탈퇴하시겠습니까?
        </p>

        <p className="mt-4 text-center text-sm text-gray-500">
          탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
        </p>

        <div className="mt-8 px-4 pb-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={deleteAccount.isPending}
              className="h-12 flex-1 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              취소
            </button>

            <button
              type="button"
              onClick={handleWithdraw}
              disabled={deleteAccount.isPending}
              className="h-12 flex-1 rounded-xl border border-red-200 bg-white text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
            >
              {deleteAccount.isPending ? "처리 중..." : "탈퇴하기"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
