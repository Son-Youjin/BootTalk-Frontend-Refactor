import { CoffeeChat } from "@/types/response";

interface ReceivedPendingActionsProps {
  received: CoffeeChat;

  handleApprove: (
    coffeeChatAppId: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  handleReject: (
    coffeeChatAppId: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

export default function ReceivedPendingActions({
  received,
  handleApprove,
  handleReject,
}: ReceivedPendingActionsProps) {
  return (
    <>
      <button
        className="btn btn-sm btn-active bg-amber-900 text-white"
        onClick={(e) => handleApprove(received.coffeeChatAppId, e)}
      >
        승인하기
      </button>
      <button
        className="btn btn-sm btn-active"
        onClick={(e) => handleReject(received.coffeeChatAppId, e)}
      >
        거절하기
      </button>
    </>
  );
}
