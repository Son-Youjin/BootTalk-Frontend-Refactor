import { Mentor } from "@/types/response";
import MentorCard from "./MentorCard";
import { Search } from "lucide-react";

interface MentorsListProps {
  mentorList: Mentor[];
  userId?: number;
  onChatRequest?: (mentor: Mentor) => void;
}

export default function MentorsList({
  mentorList,
  userId,
  onChatRequest,
}: MentorsListProps) {
  const handleChatRequest = onChatRequest ?? (() => {});

  return mentorList.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <Search className="mb-3 text-gray-500" size={28} />

      <p className="font-semibold text-gray-800">
        해당 직무와 일치하는 멘토가 없어요.
      </p>

      <p className="text-sm text-gray-500">다른 직무로 다시 시도해주세요.</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mentorList.map((mentor) => (
        <MentorCard
          key={mentor.userId}
          mentor={mentor}
          userId={userId ?? 0}
          onChatRequest={handleChatRequest}
        />
      ))}
    </div>
  );
}
