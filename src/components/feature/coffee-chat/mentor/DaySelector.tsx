import { DayOfWeek } from "../TimeSlotSelectorProps";

interface DaySelectorProps {
  days: DayOfWeek[];
  selectedDays: DayOfWeek[];
  onToggleDay: (day: DayOfWeek) => void;
}

export default function DaySelector({
  days,
  selectedDays,
  onToggleDay,
}: DaySelectorProps) {
  return (
    <div className="mb-4 grid grid-cols-7 gap-2">
      {days.map((day) => (
        <button
          key={day}
          type="button"
          onClick={() => onToggleDay(day)}
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
  );
}
