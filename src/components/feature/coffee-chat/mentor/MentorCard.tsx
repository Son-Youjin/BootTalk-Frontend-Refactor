import { jobCategoryMapping } from "@/constants/jobCategory";
import { mentorCategory } from "@/constants/mentorCategory";
import { Mentor } from "@/types/response";
import Image from "next/image";

interface MentorCardProps {
  mentor: Mentor;
  userId: number;
  onChatRequest: (mentor: Mentor) => void;
}

export default function MentorCard({
  mentor,
  userId,
  onChatRequest,
}: MentorCardProps) {
  const point =
    mentor.mentorType === "PROFESSIONAL"
      ? 3
      : mentor.mentorType === "GRADUATE"
        ? 2
        : 1;

  return (
    <div className=" flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2">
        <h4 className="text-lg font-semibold text-gray-900">
          {mentor.mentorName}
        </h4>

        <span
          className={`
          inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ${
            mentor.mentorType === "PROFESSIONAL"
              ? "bg-stone-100 text-gray-700"
              : "bg-stone-50 text-gray-600"
          }
        `}
        >
          {mentor.mentorType === "PROFESSIONAL" && (
            <Image src="/work.png" alt="work" width={12} height={12} />
          )}

          {mentorCategory[mentor.mentorType] || mentor.mentorType}
        </span>
      </div>

      <div className="mt-3">
        <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-700">
          {jobCategoryMapping[mentor.jobType] || mentor.jobType}
        </span>
      </div>

      <div className="mt-4 min-h-[96px] rounded-xl border border-gray-200 p-4 text-base leading-6 text-gray-600">
        {mentor.introduction || "멘토 소개가 아직 등록되지 않았습니다."}
      </div>

      <button
        onClick={() => onChatRequest(mentor)}
        disabled={mentor.userId === userId}
        className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#E6D1C8] text-sm font-semibold text-gray-900 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Image src="/talk.png" alt="talk" width={18} height={18} />

        <span>커피챗 신청하기 · {point}pt</span>
      </button>
    </div>
  );
}
