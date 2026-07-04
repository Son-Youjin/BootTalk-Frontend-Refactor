import { Trash2, X } from "lucide-react";
import { DayOfWeek, TimeSlot } from "../TimeSlotSelectorProps";

interface SelectedTimeSectionProps {
  days: DayOfWeek[];
  timeSlots: TimeSlot[];
  onRemoveTime: (day: DayOfWeek, time: string) => void;
  onClearAll: () => void;
}

export default function SelectedTimeSection({
  days,
  timeSlots,
  onRemoveTime,
  onClearAll,
}: SelectedTimeSectionProps) {
  const getSelectedTimesCount = (day: DayOfWeek): number => {
    const daySlot = timeSlots.find((slot) => slot.day === day);
    return daySlot ? daySlot.times.length : 0;
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">선택된 시간</h2>

        <button
          type="button"
          onClick={onClearAll}
          className="btn btn-ghost btn-sm h-8 min-h-8 border-none px-2 text-gray-500 hover:scale-105 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {days.map((day) => (
          <div key={day} className="rounded-lg bg-base-200 p-4">
            <div className="mb-3">
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
                      key={`${day}-${time}`}
                      className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1"
                    >
                      <span className="text-xs font-medium text-amber-800">
                        {time}
                      </span>

                      <button
                        type="button"
                        onClick={() => onRemoveTime(day, time)}
                        className="rounded-full p-0.5 text-amber-800 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))
              ) : (
                <span className="text-xs italic text-gray-400">
                  선택된 시간 없음
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
