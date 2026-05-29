import { CoffeeChat } from "@/types/response";
import getStatusBadge from "../getStatusBadge";
import { formatDate } from "@/lib/utils";

interface ReceivedCoffeeChatCardProps {
  received: CoffeeChat;
  handleCoffeeChatClick: (received: CoffeeChat) => void;
}

export default function ReceivedCoffeeChatCard({
  received,
  handleCoffeeChatClick,
}: ReceivedCoffeeChatCardProps) {
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

        {getStatusBadge({ status: received.status })}
      </div>
      <div className="flex items-center text-xs text-gray-500 gap-4 mb-2">
        <p>신청자: {received.menteeName}</p>
        <p>신청일: {formatDate(received.coffeeChatStartTime)}</p>
      </div>
    </div>
  );
}
