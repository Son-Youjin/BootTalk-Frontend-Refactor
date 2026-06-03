import { Mentor } from "@/types/response";
import MentorCard from "./MentorCard";

interface MentorsListProps {
  mentorList: Mentor[];
  userId: number;
  onChatRequest: (mentor: Mentor) => void;
}

export default function MentorsList({
  mentorList,
  userId,
  onChatRequest,
}: MentorsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mentorList.map((mentor) => (
        <MentorCard
          key={mentor.mentorUserId}
          mentor={mentor}
          userId={userId}
          onChatRequest={onChatRequest}
        />
      ))}
    </div>
  );
}
