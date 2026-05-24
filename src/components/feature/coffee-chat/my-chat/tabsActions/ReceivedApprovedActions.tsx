import { CoffeeChat } from "@/types/response";

interface ApprovedListTabProps {
  received: CoffeeChat;
  isNow: Date;
  handleCancel: (
    coffeeChatAppId: string,
    coffeeChatStartTime: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

export default function ReceivedApprovedActions({
  received,
  isNow,
  handleCancel,
}: ApprovedListTabProps) {
  return (
    isNow < new Date(received.coffeeChatStartTime) && (
      <button
        className="btn btn-sm btn-active"
        onClick={(e) =>
          handleCancel(
            received.coffeeChatAppId,
            received.coffeeChatStartTime,
            e,
          )
        }
      >
        취소하기
      </button>
    )
  );
}
