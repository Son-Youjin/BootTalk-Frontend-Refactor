import { Dispatch, SetStateAction } from "react";
import { CalendarDays, Clock } from "lucide-react";
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
      <section className="rounded-xl border border-gray-200 bg-gray-50 p-4 mb-8">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">
          선택한 일정
        </h3>

        <div className="flex items-center gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="shrink-0" />
            <span>{selectedDateText(selectedDate)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} className="shrink-0" />
            <span>{selectedTime}</span>
          </div>
        </div>
      </section>

      {/* 메시지 */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900">
          상담받고 싶은 내용
        </label>

        <textarea
          className="textarea textarea-bordered min-h-36 w-full rounded-xl text-base mt-2"
          placeholder="실무 경험, 취업 준비, 포트폴리오 등 궁금한 내용을 작성해주세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
        />

        <p className="text-xs text-gray-400 text-right">
          {message.length} / 500
        </p>
      </div>

      {/* 버튼 */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={handlePrev}
          className="h-12 flex-1 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          이전
        </button>

        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="h-12 flex-1 rounded-xl bg-amber-900 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          신청하기
        </button>
      </div>
    </>
  );
}
