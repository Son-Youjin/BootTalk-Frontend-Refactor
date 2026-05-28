"use client";

import { CoffeeChat } from "@/types/response";
import getStatusBadge from "../getStatusBadge";
import { formatDate } from "@/lib/utils";

interface SentCoffeeChatCardProps {
  sent: CoffeeChat;
  onClick: (coffeeChat: CoffeeChat) => void;
  onCancel: (
    coffeeChatAppId: string,
    coffeeChatStartTime: string,
    mentorName: string,
    e?: React.MouseEvent,
  ) => void;
  isCanceling: boolean;
}

export default function SentCoffeeChatCard({
  sent,
  onClick,
}: SentCoffeeChatCardProps) {
  return (
    <div
      className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
      onClick={() => onClick(sent)}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-sm truncate max-w-xs">
          {sent.content.length > 30
            ? sent.content.substring(0, 30) + "..."
            : sent.content}
        </h4>

        {getStatusBadge({ status: sent.status })}
      </div>

      <div className="flex items-center text-xs text-gray-500 gap-4 mb-2">
        <p>멘토: {sent.mentorName}</p>
        <p>신청일: {formatDate(sent.coffeeChatStartTime)}</p>
      </div>
    </div>
  );
}
