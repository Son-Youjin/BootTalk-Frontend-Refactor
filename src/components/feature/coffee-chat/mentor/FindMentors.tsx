import { useState } from "react";
import { useMentorList } from "@/hooks/coffee-chat/useMentorList";
import { Mentor } from "@/types/response";
import ChatRequestModal from "./ChatRequestModal";
import { useUserStore } from "@/store/useUserStore";
import MentorsList from "./MentorsList";
import { jobFilterOptions } from "@/constants/jobCategory";
import useMentorFilter from "@/hooks/coffee-chat/useMentorFilter";

const FindMentors = () => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);

  const { jobTypeFilter, handleFilterChange } = useMentorFilter();
  const { mentorList, isLoading, isError } = useMentorList(jobTypeFilter);

  const userId = useUserStore((state) => state.user?.userId) || 0;

  const handleChatRequest = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsChatModalOpen(true);
  };

  const closeChatModal = () => {
    setIsChatModalOpen(false);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h3 className="text-lg font-semibold">멘토 리스트</h3>
          <div className="flex flex-wrap gap-2">
            {/* 기타 옵션은 필요 시 추가 예정 */}
            <select
              value={jobTypeFilter}
              onChange={handleFilterChange}
              className="select rounded-lg text-base"
            >
              {jobFilterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <MentorsList
          mentorList={mentorList ?? []}
          userId={userId}
          onChatRequest={handleChatRequest}
        />
      </div>

      {/* 커피챗 신청 모달 */}
      {isChatModalOpen && (
        <ChatRequestModal
          isOpen={true}
          onClose={closeChatModal}
          mentor={selectedMentor}
        />
      )}
    </>
  );
};

export default FindMentors;
