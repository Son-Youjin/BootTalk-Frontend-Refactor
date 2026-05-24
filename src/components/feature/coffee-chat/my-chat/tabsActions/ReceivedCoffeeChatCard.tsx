import { CoffeeChat } from "@/types/response";
import ReceivedPendingActions from "./ReceivedPendingActions";
import ReceivedApprovedActions from "./ReceivedApprovedActions";
import getStatusBadge from "../getStatusBadge";
import { formatDate } from "@/lib/utils";

interface ReceivedCoffeeChatCardProps {
  received: CoffeeChat;
  handleCoffeeChatClick: (received: CoffeeChat) => void;

  handleApprove: (
    coffeeChatAppId: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  handleReject: (
    coffeeChatAppId: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  handleCancel: (
    coffeeChatAppId: string,
    coffeeChatStartTime: string,
    e?: React.MouseEvent,
  ) => void;
}

export default function ReceivedCoffeeChatCard({
  received,
  handleCoffeeChatClick,
  handleApprove,
  handleReject,
  handleCancel,
}: ReceivedCoffeeChatCardProps) {
  const isNow = new Date();

  return (
    <div
      className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
      onClick={() => handleCoffeeChatClick(received)}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-sm truncate max-w-xs">
          {received.content.length > 30
            ? received.content.substring(0, 30) + "..."
            : received.content}
        </h4>
        {received.status !== "PENDING" &&
          getStatusBadge({ status: received.status })}
      </div>
      <div className="flex items-center text-xs text-gray-500 gap-4 mb-2">
        <p>신청자: {received.menteeName}</p>
        <p>신청일: {formatDate(received.coffeeChatStartTime)}</p>
      </div>

      {/* 승인/거절 버튼 (PENDING 상태일 때만 표시) */}
      <div className="flex mt-2 space-x-2">
        {received.status === "PENDING" && (
          <ReceivedPendingActions
            received={received}
            handleApprove={handleApprove}
            handleReject={handleReject}
          />
        )}

        {received.status === "APPROVED" && (
          <ReceivedApprovedActions
            received={received}
            isNow={isNow}
            handleCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}
