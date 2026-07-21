import { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale/ko";
import styles from "@/components/feature/coffee-chat/mentor/ChatRequestModal.module.css";

interface ChatRequestScheduleStepProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  availableTimes: string[];
  isDateAvailable: (date: Date) => boolean;
  handleDateChange: (date: Date | null) => void;
  setSelectedTime: Dispatch<SetStateAction<string | null>>;
  handleNext: () => void;
}

export default function ChatRequestScheduleStep({
  selectedDate,
  selectedTime,
  availableTimes,
  isDateAvailable,
  handleDateChange,
  setSelectedTime,
  handleNext,
}: ChatRequestScheduleStepProps) {
  return (
    <>
      {/* 날짜 */}
      <section className="space-y-6">
        <div className="rounded-xl bg-white text-center mb-4">
          <div className={styles.datepickerWrapper}>
            <DatePicker
              filterDate={isDateAvailable}
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              locale={ko}
            />
          </div>
        </div>

        {/* 시간 */}
        <label className="mb-2 block text-sm font-semibold text-gray-900">
          상담 가능 시간
        </label>

        {selectedDate && availableTimes.length > 0 ? (
          <div className="grid grid-cols-4 gap-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`h-10 rounded-xl border text-sm font-medium transition ${
                  selectedTime === time
                    ? "border-2 border-amber-900 bg-white text-amber-900 shadow-sm"
                    : "border border-gray-200 bg-white hover:border-gray-300 transition-all"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
            선택 가능한 시간이 없습니다.
          </div>
        )}
      </section>

      {/* 버튼 */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={handleNext}
          className="h-12 w-full rounded-xl bg-amber-900 text-sm font-medium text-white transition-colors hover:bg-amber-800"
        >
          다음
        </button>
      </div>
    </>
  );
}
