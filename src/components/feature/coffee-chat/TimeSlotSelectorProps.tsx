import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

export type DayOfWeek = "월" | "화" | "수" | "목" | "금" | "토" | "일";

export interface TimeSlot {
  day: DayOfWeek;
  times: string[];
}

interface TimeSlotSelectorProps {
  timeSlots: TimeSlot[];
  onChange: (timeSlots: TimeSlot[]) => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  timeSlots,
  onChange,
}) => {
  const days: DayOfWeek[] = ["월", "화", "수", "목", "금", "토", "일"];

  // 현재 확장된 요일
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>(["월"]);
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    return date;
  });

  // 시간을 HH:mm 형식의 문자열로 변환
  const formatTimeToString = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // 문자열을 Date 객체로 변환 (비교용)
  const parseTimeString = (timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // DatePicker 값 변경 핸들러
  const handleTimeChange = (date: Date | null) => {
    if (!date) return;

    // 선택한 시간을 문자열로 변환
    const timeString = formatTimeToString(date);

    // 선택한 시간 저장
    setSelectedDate(date);

    // 시간 추가
    const updatedTimeSlots = [...timeSlots];
    selectedDays.forEach((day) => {
      const slotIndex = updatedTimeSlots.findIndex((slot) => slot.day === day);

      if (slotIndex >= 0) {
        if (!updatedTimeSlots[slotIndex].times.includes(timeString)) {
          updatedTimeSlots[slotIndex] = {
            ...updatedTimeSlots[slotIndex],
            times: [...updatedTimeSlots[slotIndex].times, timeString].sort(),
          };
        }
      } else {
        updatedTimeSlots.push({
          day,
          times: [timeString],
        });
      }
    });

    onChange(updatedTimeSlots);
  };

  // 시간 삭제 핸들러
  const handleRemoveTime = (day: DayOfWeek, time: string) => {
    const updatedTimeSlots = timeSlots.map((slot) => {
      if (slot.day === day) {
        return { ...slot, times: slot.times.filter((t) => t !== time) };
      }
      return slot;
    });

    onChange(updatedTimeSlots);
  };

  // 해당 요일의 선택된 시간 수 가져오기
  const getSelectedTimesCount = (day: DayOfWeek): number => {
    const daySlot = timeSlots.find((slot) => slot.day === day);
    return daySlot ? daySlot.times.length : 0;
  };

  // 모든 시간 초기화
  const clearAll = () => {
    onChange(days.map((day) => ({ day, times: [] })));
  };

  // 현재 확장된 요일의 시간 슬롯
  const excludedTimes = timeSlots
    .filter((slot) => selectedDays.includes(slot.day))
    .flatMap((slot) => slot.times)
    .filter((time, index, arr) => arr.indexOf(time) === index)
    .map(parseTimeString);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* 시간 추가 */}
      <section className="rounded-xl">
        <h2 className="text-base font-semibold text-gray-900">시간 추가</h2>

        <p className="mb-4 text-xs text-gray-500">
          여러 요일을 선택하면 한 번에 추가됩니다.
        </p>

        {/* 요일 선택 */}
        <div className="mb-4 grid grid-cols-7 gap-2">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => {
                if (selectedDays.includes(day) && selectedDays.length === 1) {
                  toast.error("최소 하나의 요일을 선택해주세요.");
                  return;
                }

                setSelectedDays((prev) =>
                  prev.includes(day)
                    ? prev.filter((d) => d !== day)
                    : [...prev, day],
                );
              }}
              className={`flex h-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors
              ${
                selectedDays.includes(day)
                  ? "border-amber-700 bg-amber-700 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <DatePicker
          className="input input-bordered h-12 w-full rounded-lg"
          selected={selectedDate}
          onChange={handleTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="시간"
          dateFormat="HH:mm"
          timeFormat="HH:mm"
          excludeTimes={excludedTimes}
          placeholderText="시간 선택"
          popperClassName="react-datepicker-right"
          popperPlacement="right-start"
          shouldCloseOnSelect={false}
        />
      </section>

      {/* 선택된 시간 */}
      <section className="rounded-xl border border-gray-200 bg-white p-4 ">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">선택된 시간</h2>

          <button
            type="button"
            onClick={clearAll}
            className="btn btn-ghost btn-sm h-8 min-h-8 px-2 text-gray-500 border-none hover:scale-105 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {days.map((day) => (
            <div key={day} className="bg-base-200 p-4 rounded-lg">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-800">
                  {day}요일
                </span>
              </div>

              <div className="flex min-h-[28px] flex-wrap gap-2">
                {getSelectedTimesCount(day) > 0 ? (
                  timeSlots
                    .find((slot) => slot.day === day)
                    ?.times.map((time) => (
                      <div
                        key={`selected-${day}-${time}`}
                        className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1"
                      >
                        <span className="text-xs font-medium text-amber-800">
                          {time}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleRemoveTime(day, time)}
                          className="rounded-full p-0.5 text-amber-800 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))
                ) : (
                  <span className="text-xs text-gray-400 italic">
                    선택된 시간 없음
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TimeSlotSelector;
