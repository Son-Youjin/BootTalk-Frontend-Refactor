import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatTimeToString, parseTimeString } from "@/lib/utils";
import DaySelector from "./mentor/DaySelector";
import toast from "react-hot-toast";
import SelectedTimeSection from "./mentor/SelectedTimeSection";

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

  const handleToggleDay = (day: DayOfWeek) => {
    if (selectedDays.includes(day) && selectedDays.length === 1) {
      toast.error("최소 하나의 요일을 선택해주세요.");
      return;
    }

    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* 시간 추가 */}
      <section className="rounded-xl">
        <h2 className="text-base font-semibold text-gray-900">시간 추가</h2>

        <p className="mb-4 text-xs text-gray-500">
          여러 요일을 선택하면 한 번에 추가됩니다.
        </p>

        {/* 요일 선택 */}
        <DaySelector
          days={days}
          selectedDays={selectedDays}
          onToggleDay={handleToggleDay}
        />

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
      <SelectedTimeSection
        days={days}
        timeSlots={timeSlots}
        onRemoveTime={handleRemoveTime}
        onClearAll={clearAll}
      />
    </div>
  );
};

export default TimeSlotSelector;
