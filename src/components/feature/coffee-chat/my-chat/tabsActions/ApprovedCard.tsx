import { formatDate } from "@/lib/utils";
import { CoffeeChat } from "@/types/response";
import { differenceInDays } from "date-fns";

interface ApprovedCardProps {
  approved: CoffeeChat;
  onCancel: (coffeeChat: CoffeeChat) => void;
}

export default function ApprovedCard({
  approved,
  onCancel,
}: ApprovedCardProps) {
  const startDate = new Date(approved.coffeeChatStartTime);
  const diffDays = differenceInDays(startDate, new Date());

  const dayText =
    diffDays === 0
      ? "D-Day"
      : diffDays > 0
        ? `D-${diffDays}`
        : `D+${Math.abs(diffDays)}`;

  return (
    <div
      onClick={() => onCancel(approved)}
      className="bg-white border border-gray-200 rounded-2xl px-5 py-4 cursor-pointer hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="font-semibold text-sm text-gray-900 truncate">
              {approved.mentorName} 멘토
            </h3>

            <span className="text-xs text-gray-500 whitespace-nowrap shrink-0">
              {formatDate(approved.coffeeChatStartTime)}
            </span>
          </div>

          <p className="text-sm text-gray-700 break-words leading-relaxed">
            {approved.content}
          </p>
        </div>

        <div className="shrink-0 min-w-[52px] rounded-full bg-gray-100 px-3 py-1.5 text-center text-[11px] font-semibold text-gray-700">
          {dayText}
        </div>
      </div>
    </div>
  );
}
