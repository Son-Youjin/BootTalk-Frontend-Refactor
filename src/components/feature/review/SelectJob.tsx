import { X } from "lucide-react";

interface SelectJobProps {
  value?: string;
  jobRoles: string[];
  isLoading: boolean;
  isError: boolean;
  onChange: (value?: string) => void;
}

export default function SelectJob({
  value,
  jobRoles,
  isLoading,
  isError,
  onChange,
}: SelectJobProps) {
  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <label htmlFor="job-select" className="sr-only">
        직무 선택
      </label>

      <select
        id="job-select"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || undefined)}
        className="w-full h-12 rounded-full border border-gray-200 bg-white px-5 text-sm shadow-sm appearance-none"
      >
        <option value="">직무를 선택해주세요.</option>

        {isLoading && <option disabled>불러오는 중...</option>}
        {isError && <option disabled>직무를 불러올 수 없습니다.</option>}

        {!isLoading &&
          !isError &&
          jobRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
      </select>

      {value && (
        <button
          type="button"
          onClick={() => onChange(undefined)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
