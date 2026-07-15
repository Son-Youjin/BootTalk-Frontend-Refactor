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

  // TODO: 디자인 수정
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="회원탈퇴" size="xs">
      <div className="space-y-4">
        <p className="text-gray-600">
          정말 탈퇴하시겠습니까?
          <br />
          탈퇴 시 모든 데이터가 삭제되며 이 작업은 되돌릴 수 없습니다.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onClose}
            disabled={deleteAccount.isPending}
          >
            취소
          </button>

          <button
            type="button"
            className="btn btn-neutral"
            onClick={handleWithdraw}
            disabled={deleteAccount.isPending}
          >
            {deleteAccount.isPending ? "처리 중..." : "탈퇴하기"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
