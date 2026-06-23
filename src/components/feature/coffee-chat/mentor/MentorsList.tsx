import { Mentor } from "@/types/response";
import MentorCard from "./MentorCard";
import EmptyState from "@/components/common/EmptyState";

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
    <EmptyState
      title=" 해당 직무와 일치하는 멘토가 없어요."
      subTitle="다른 직무로 다시 시도해주세요."
    />
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
