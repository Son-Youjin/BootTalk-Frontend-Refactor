import { useEffect, useState } from "react";
import { Mentor } from "@/types/response";
import Modal from "@/components/common/modal/CommonModal";
import { useMentorApplication } from "@/hooks/coffee-chat/useMentorApplication";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { MentorApplicationData } from "@/types/request";
import toast from "react-hot-toast";
import ChatRequestScheduleStep from "./ChatRequestScheduleStep";
import ChatRequestMessageStep from "./ChatRequestMessageStep";
import { createCoffeeChatDateTime } from "@/lib/utils";

interface ChatRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor | null;
}

const ChatRequestModal: React.FC<ChatRequestModalProps> = ({
  isOpen,
  onClose,
  mentor,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const { mentorApplicationTime, isLoading, requestCoffeeChat, isSubmitting } =
    useMentorApplication(String(mentor?.coffeeChatInfoId));
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    if (!isOpen) {
      setSelectedDate(new Date());
      setSelectedTime(null);
      setMessage("");
      setStep(1);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (!selectedTime) {
      toast.error("시간을 선택해주세요.");
      return;
    }

    setStep(2);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  // 날짜 문자열 배열 추출
  const availableDateStrings = Object.keys(mentorApplicationTime || {});

  // 날짜 필터링 함수 - 각 날짜에 대해 선택 가능 여부 boolean으로 반환
  const isDateAvailable = (date: Date): boolean => {
    const dateStr = format(date, "yyyy-MM-dd");
    return availableDateStrings.includes(dateStr);
  };

  // Date 타입을 키값으로 매핑
  const selectedDateKey = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;

  const availableTimes = selectedDateKey
    ? mentorApplicationTime?.[selectedDateKey] || []
    : [];

  if (!isOpen || !mentor) return null;

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      toast.error("날짜와 시간을 모두 선택해주세요.");
      return;
    }

    if (!message.trim()) {
      toast.error("메시지를 입력해주세요.");
      return;
    }

    const { coffeeChatStartTime, coffeeChatEndTime } = createCoffeeChatDateTime(
      selectedDate,
      selectedTime,
    );

    const requestData: MentorApplicationData = {
      coffeeChatInfoId: mentor.coffeeChatInfoId,
      content: message,
      coffeeChatStartTime,
      coffeeChatEndTime,
    };

    requestCoffeeChat(requestData, {
      onSuccess: () => {
        toast.success("커피챗 신청이 완료되었습니다.");
        onClose(); // 모달 닫기
      },
      onError: (error) => {
        console.error("커피챗 신청 오류:", error);
        if (error.message.includes("409")) {
          toast.error("이미 신청한 커피챗입니다.");
        } else {
          toast.error("커피챗 신청 중 오류가 발생했습니다.");
        }
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title="커피챗 신청">
      <div className="px-5 pt-4 pb-5 md:px-6 md:pt-5 md:pb-6">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* 진행 상태 */}
          <div className="flex items-end justify-between border-b border-gray-100 pb-3">
            <p className="text-lg font-semibold text-gray-900">
              {step === 1 ? "날짜 및 시간 선택" : "신청 내용"}
            </p>

            <span className="text-sm font-medium text-gray-400">
              {step} / 2
            </span>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <ChatRequestScheduleStep
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              availableTimes={availableTimes}
              isDateAvailable={isDateAvailable}
              handleDateChange={handleDateChange}
              setSelectedTime={setSelectedTime}
              handleNext={handleNext}
            />
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <ChatRequestMessageStep
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              message={message}
              setMessage={setMessage}
              handlePrev={() => setStep(1)}
              isLoading={isLoading}
              isSubmitting={isSubmitting}
            />
          )}
        </form>
      </div>
    </Modal>
  );
};

export default ChatRequestModal;
