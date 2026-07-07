import { useEffect, useState } from "react";
import useMentorRegistration from "@/hooks/coffee-chat/useMentorRegistration";
import { DayOfWeek, TimeSlot } from "./TimeSlotSelectorProps";
import Modal from "@/components/common/modal/CommonModal";
import { jobCategoryMapping } from "@/constants/jobCategory";
import { dayMapping } from "@/constants/dayMapping";
import { MentorInfoData } from "@/types/request";
import { useUserStore } from "@/store/useUserStore";
import toast from "react-hot-toast";
import { createDefaultTimeSlots } from "@/lib/utils";
import MentorBasicInfoStep from "./mentor/MentorBasicInfoStep";
import MentorAvailableTimeStep from "./mentor/MentorAvailableTimeStep";

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
    setFormData((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        jobType: e.target.value,
      },
    }));
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

  const loadingButtonText = mode === "create" ? "등록 중..." : "수정 중...";

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
            <MentorBasicInfoStep
              formData={formData}
              jobCategoryOptions={jobCategoryOptions}
              onJobCategoryChange={handleJobCategoryChange}
              onProfessionalChange={handleProfessionalChange}
              onIntroductionChange={handleIntroductionChange}
              onNext={handleNext}
            />
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <MentorAvailableTimeStep
              timeSlots={formData.timeSlots}
              onTimeSlotChange={handleTimeSlotChange}
              onPrev={() => setStep(1)}
              isPending={isPending}
              loadingButtonText={loadingButtonText}
              submitButtonText={submitButtonText}
            />
          )}
        </form>
      </div>
    </Modal>
  );
};

export default MentorFormModal;
