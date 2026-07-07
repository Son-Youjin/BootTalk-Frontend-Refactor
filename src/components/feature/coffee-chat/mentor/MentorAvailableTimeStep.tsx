import TimeSlotSelector, { TimeSlot } from "../TimeSlotSelectorProps";

interface MentorAvailableTimeStepProps {
  timeSlots: TimeSlot[];
  onTimeSlotChange: (updatedTimeSlots: TimeSlot[]) => void;
  onPrev: () => void;
  isPending: boolean;
  loadingButtonText: string;
  submitButtonText: string;
}

export default function MentorAvailableTimeStep({
  timeSlots,
  onTimeSlotChange,
  onPrev,
  isPending,
  loadingButtonText,
  submitButtonText,
}: MentorAvailableTimeStepProps) {
  return (
    <>
      <div>
        <TimeSlotSelector timeSlots={timeSlots} onChange={onTimeSlotChange} />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="h-12 flex-1 rounded-xl border border-gray-300 bg-white font-medium text-gray-700 transition hover:bg-gray-50"
        >
          이전
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="h-12 flex-1 rounded-xl bg-amber-900 font-semibold text-white transition-colors hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? loadingButtonText : submitButtonText}
        </button>
      </div>
    </>
  );
}
