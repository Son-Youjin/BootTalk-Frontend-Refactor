import React, { useEffect, useState } from "react";

import useMentorRegistration from "@/hooks/coffee-chat/useMentorRegistration";
import TimeSlotSelector, { DayOfWeek, TimeSlot } from "./TimeSlotSelectorProps";
import Modal from "@/components/common/modal/CommonModal";
import { jobCategoryMapping } from "@/constants/jobCategory";
import { dayMapping } from "@/constants/dayMapping";
import { MentorInfoData } from "@/types/request";
import { useUserStore } from "@/store/useUserStore";
import toast from "react-hot-toast";

interface MentorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: MentorInfoData;
  mode: "create" | "edit";
}

export interface MentorFormFormData {
  info: {
    jobType: string;
    mentorType: string;
    introduction: string;
  };
  timeSlots: TimeSlot[];
}

const jobCategoryOptions = Object.entries(jobCategoryMapping).map(
  ([eng, kor]) => ({ value: eng, label: kor }),
);

const MentorFormModal: React.FC<MentorFormModalProps> = ({
  isOpen,
  onClose,
  initialData,
  mode,
}) => {
  const {
    createMentorMutation,
    updateMentorMutation,
    isCreatePending,
    isUpdatePending,
  } = useMentorRegistration();
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  const userCertifications = useUserStore(
    (state) => state.user?.certifications,
  );

  const DEFAULT_MENTOR_TYPE =
    userCertifications && userCertifications.length > 0
      ? "GRADUATE"
      : "GENERAL";

  // 기본 타임슬롯 생성 함수
  const createDefaultTimeSlots = (): TimeSlot[] => {
    return [
      { day: "월" as DayOfWeek, times: [] },
      { day: "화" as DayOfWeek, times: [] },
      { day: "수" as DayOfWeek, times: [] },
      { day: "목" as DayOfWeek, times: [] },
      { day: "금" as DayOfWeek, times: [] },
      { day: "토" as DayOfWeek, times: [] },
      { day: "일" as DayOfWeek, times: [] },
    ];
  };

  const [formData, setFormData] = useState<MentorFormFormData>({
    info: {
      jobType: "",
      mentorType: DEFAULT_MENTOR_TYPE,
      introduction: "",
    },
    timeSlots: createDefaultTimeSlots(),
  });

  // 초기 데이터가 있는 경우(수정 모드)
  useEffect(() => {
    if (mode === "edit" && initialData) {
      // time 객체를 timeSlots 배열로 변환
      const timeSlots = Object.entries(dayMapping).map(([koDay, enDay]) => {
        return {
          day: koDay as DayOfWeek,
          times: initialData.time[enDay] || [],
        };
      });

      setFormData({
        info: {
          jobType: initialData.info.jobType || "",
          mentorType: initialData.info.mentorType || DEFAULT_MENTOR_TYPE,
          introduction: initialData.info.introduction || "",
        },
        timeSlots: timeSlots,
      });
    } else {
      // 생성 모드일 때는 초기화
      setFormData({
        info: {
          jobType: "",
          mentorType: DEFAULT_MENTOR_TYPE,
          introduction: "",
        },
        timeSlots: createDefaultTimeSlots(),
      });
    }
  }, [initialData, mode, isOpen, DEFAULT_MENTOR_TYPE]);

  // 직군 선택 핸들러
  const handleJobCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      info: {
        ...formData.info,
        jobType: e.target.value,
      },
    });
  };

  // 현업자 체크박스 핸들러
  const handleProfessionalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setFormData({
      ...formData,
      info: {
        ...formData.info,
        mentorType: isChecked ? "PROFESSIONAL" : DEFAULT_MENTOR_TYPE,
      },
    });
  };

  // 소개글 핸들러
  const handleIntroductionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      info: {
        ...formData.info,
        introduction: e.target.value,
      },
    });
  };

  // 시간 슬롯 변경 핸들러
  const handleTimeSlotChange = (updatedTimeSlots: TimeSlot[]) => {
    setFormData({
      ...formData,
      timeSlots: updatedTimeSlots,
    });
  };

  // 등록 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 시간 선택 확인
      const hasSelectedTimes = formData.timeSlots.some(
        (slot) => slot.times.length > 0,
      );
      if (!hasSelectedTimes) {
        toast.error("최소 한 개 이상의 가능한 시간을 선택해주세요.");
        return;
      }

      // 소개글 길이 확인
      if (formData.info.introduction.trim().length < 10) {
        toast.error("소개글은 최소 10자 이상 작성해주세요.");
        return;
      }

      // 필터링된 시간 슬롯 (빈 배열 제거)
      const filteredTimeSlots = formData.timeSlots.filter(
        (slot) => slot.times.length > 0,
      );

      const availableTimes: Record<string, string[]> = {};

      console.log("Filtered Time Slots:", filteredTimeSlots);

      filteredTimeSlots.forEach((slot) => {
        if (slot.times.length > 0) {
          // 한글 요일을 영어로 변환
          const day = dayMapping[slot.day];
          availableTimes[day] = slot.times;
        }
      });

      const mentorInfoData = {
        info: {
          jobType: formData.info.jobType,
          mentorType: formData.info.mentorType,
          introduction: formData.info.introduction,
        },
        time: availableTimes,
      };

      if (mode === "create") {
        // 멘토 정보 등록 API 호출
        await createMentorMutation.mutateAsync(mentorInfoData);

        toast.success("커피챗 멘토로 성공적으로 등록되었습니다!");
      } else {
        // 멘토 정보 수정 API 호출
        await updateMentorMutation.mutateAsync(mentorInfoData);
        toast.success("멘토 정보가 성공적으로 수정되었습니다!");
      }

      onClose();
    } catch (error) {
      toast.error(
        mode === "create"
          ? "멘토 등록 중 오류가 발생했습니다."
          : "멘토 정보 수정 중 오류가 발생했습니다.",
      );
      console.error(
        mode === "create" ? "Registration error:" : "Update error:",
        error,
      );
    }
  };

  const isPending = mode === "create" ? isCreatePending : isUpdatePending;
  const modalTitle =
    mode === "create" ? "커피챗 멘토 등록" : "멘토 프로필 수정";
  const submitButtonText = mode === "create" ? "등록하기" : "수정하기";

  const handleNext = () => {
    if (!formData.info.jobType) {
      toast.error("직무를 선택해주세요.");
      return;
    }

    if (formData.info.introduction.trim().length < 10) {
      toast.error("소개글은 최소 10자 이상 작성해주세요.");
      return;
    }

    setStep(2);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modalTitle} size="lg">
      <div className="px-5 pt-4 pb-5 md:px-6 md:pt-5 md:pb-6">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* 진행 상태 */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {step === 1 ? "기본 정보" : "멘토링 가능 시간"}
              </p>
            </div>

            <span className="text-sm font-medium text-gray-400">
              {step} / 2
            </span>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              {/* 직무 */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-800">
                  직무 선택
                </label>

                <select
                  className="select select-bordered h-12 w-full rounded-xl border-gray-300 bg-white text-sm"
                  value={formData.info.jobType}
                  onChange={handleJobCategoryChange}
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
                  onChange={handleProfessionalChange}
                />

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    현업 종사자
                  </p>

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
                  onChange={handleIntroductionChange}
                  required
                />

                <div className="mt-2 text-right text-xs text-gray-400">
                  {formData.info.introduction.length} / 500
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="h-12 w-full rounded-xl bg-amber-900 text-sm font-semibold text-white transition-colors hover:bg-amber-800"
              >
                다음
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div>
                <TimeSlotSelector
                  timeSlots={formData.timeSlots}
                  onChange={handleTimeSlotChange}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-12 flex-1 rounded-xl border border-gray-300 bg-white font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  이전
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="h-12 flex-1 rounded-xl bg-amber-900 font-semibold text-white transition-colors hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isPending
                    ? mode === "create"
                      ? "등록 중..."
                      : "수정 중..."
                    : submitButtonText}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default MentorFormModal;
