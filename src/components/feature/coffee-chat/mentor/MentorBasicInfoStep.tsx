import { MentorFormFormData } from "../MentorFormModal";

interface MentorBasicInfoStepProps {
  formData: MentorFormFormData;
  jobCategoryOptions: {
    value: string;
    label: string;
  }[];

  onJobCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onProfessionalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIntroductionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onNext: () => void;
}
export default function MentorBasicInfoStep({
  formData,
  jobCategoryOptions,
  onJobCategoryChange,
  onProfessionalChange,
  onIntroductionChange,
  onNext,
}: MentorBasicInfoStepProps) {
  return (
    <>
      {/* 직무 */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-gray-800">
          직무 선택
        </label>

        <select
          className="select select-bordered h-12 w-full rounded-xl border-gray-300 bg-white text-sm"
          value={formData.info.jobType}
          onChange={onJobCategoryChange}
          required
        >
          <option value="" disabled>
            직무를 선택해주세요
          </option>

          {jobCategoryOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* 현업 종사자 */}
      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-stone-50 px-4 py-4 transition-colors hover:bg-stone-100">
        <input
          type="checkbox"
          className="checkbox checkbox-sm mt-0.5"
          checked={formData.info.mentorType === "PROFESSIONAL"}
          onChange={onProfessionalChange}
        />

        <div>
          <p className="text-sm font-semibold text-gray-800">현업 종사자</p>

          <p className="mt-1 text-xs text-gray-500">
            현재 관련 업계에서 근무 중인 경우 선택해주세요.
          </p>
        </div>
      </label>

      {/* 소개글 */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-gray-800">
          멘토 소개글
        </label>

        <textarea
          className="h-32 md:h-36 w-full resize-none rounded-xl border border-gray-300 bg-white p-4 text-sm leading-6 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
          placeholder="멘티에게 보여질 자기소개와 도움을 줄 수 있는 영역에 대해 작성해주세요. (최소 10자 이상)"
          value={formData.info.introduction}
          onChange={onIntroductionChange}
          required
        />

        <div className="mt-2 text-right text-xs text-gray-400">
          {formData.info.introduction.length} / 500
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="h-12 w-full rounded-xl bg-amber-900 text-sm font-semibold text-white transition-colors hover:bg-amber-800"
      >
        다음
      </button>
    </>
  );
}
