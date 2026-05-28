import { CoffeeChat } from "@/types/response";
import toast from "react-hot-toast";

interface useCoffeeChatCardActionProps {
  userRole: "MENTOR" | "MENTEE";

  handleApprove: (
    coffeeChatAppId: string,
    targetName: string,
    coffeeChatStartTime: string,
    e?: React.MouseEvent,
  ) => void;

  handleCancel: (
    coffeeChatAppId: string,
    coffeeChatStartTime: string,
    targetName: string,
    e?: React.MouseEvent,
  ) => void;
}

export const useCoffeeChatCardAction = ({
  userRole,
  handleApprove,
  handleCancel,
}: useCoffeeChatCardActionProps) => {
  const handleCardClick = (coffeechat: CoffeeChat) => {
    switch (coffeechat.status) {
      // pending이면 승인/거절 모달
      case "PENDING":
        if (userRole === "MENTOR") {
          handleApprove(
            coffeechat.coffeeChatAppId,
            userRole === "MENTOR"
              ? coffeechat.menteeName
              : coffeechat.mentorName,
            coffeechat.coffeeChatStartTime,
          );
        } else {
          toast("멘토의 승인을 기다리는 중입니다.");
        }
        break;

      case "APPROVED":
        // approved면 취소 모달
        handleCancel(
          coffeechat.coffeeChatAppId,
          coffeechat.coffeeChatStartTime,
          userRole === "MENTOR" ? coffeechat.menteeName : coffeechat.mentorName,
        );
        break;

      case "REJECTED":
      case "CANCEL":
        toast("이미 처리된 커피챗입니다.");
        break;
    }
  };

  return {
    handleCardClick,
  };
};
