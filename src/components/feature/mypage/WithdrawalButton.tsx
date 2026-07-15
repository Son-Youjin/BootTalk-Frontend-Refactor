import { LogOut } from "lucide-react";

interface WithdrawalButtonProps {
  onClick: () => void;
  className?: string;
}

const WithdrawalButton = ({ onClick, className }: WithdrawalButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 transition-colors ${className ?? ""}`}
    >
      <LogOut size={18} />
      <span>회원탈퇴</span>
    </button>
  );
};

export default WithdrawalButton;
