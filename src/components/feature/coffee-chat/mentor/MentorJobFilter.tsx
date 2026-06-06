import { jobFilterOptions } from "@/constants/jobCategory";

interface MentorJobFilterProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function MentorJobFilter({
  value,
  onChange,
}: MentorJobFilterProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <select
        value={value}
        onChange={onChange}
        className="w-full h-12 rounded-full border border-gray-200 bg-white px-5 text-base text-center shadow-sm appearance-none"
      >
        {jobFilterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
