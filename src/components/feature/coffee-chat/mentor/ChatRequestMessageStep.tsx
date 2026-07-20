import { Dispatch, SetStateAction } from "react";
import { CalendarDays, Clock, MessageCircle } from "lucide-react";
import { selectedDateText } from "@/lib/utils";

interface ChatRequestMessageStepProps {
  selectedDate: Date | null;
  selectedTime: string | null;

  message: string;
  setMessage: Dispatch<SetStateAction<string>>;

  handlePrev: () => void;

  isLoading: boolean;
  isSubmitting: boolean;
}

export default function ChatRequestMessageStep({
  selectedDate,
  selectedTime,
  message,
  setMessage,
  handlePrev,
  isLoading,
  isSubmitting,
}: ChatRequestMessageStepProps) {
  return (
    <>
      {/* 선택 일정 */}
      <section className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">
          선택한 일정
        </h3>

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            <span>{selectedDateText(selectedDate)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{selectedTime}</span>
          </div>
        </div>
      </section>

      {/* 메시지 */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 font-medium text-gray-900">
          <MessageCircle size={18} />
          궁금한 점이나 이야기하고 싶은 내용을 작성해주세요.
        </label>

        <textarea
          className="textarea textarea-bordered min-h-[140px] w-full rounded-xl"
          placeholder="예) 프론트엔드 취업 준비 과정이 궁금합니다."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
        />

        <p className="text-right text-sm text-gray-500">
          {message.length} / 500자
        </p>
      </div>

      {/* 버튼 */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={handlePrev}
          className="h-12 flex-1 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          이전
        </button>

        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="h-12 flex-1 rounded-xl bg-amber-900 text-sm font-medium text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          신청하기
        </button>
      </div>
    </>
  );
}
