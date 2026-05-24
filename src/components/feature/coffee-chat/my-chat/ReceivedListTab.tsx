"use client";

import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { CoffeeChat } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CoffeeChatDetailModal from "./CoffeeChatDetailModal";
import { useCoffeeChatActions } from "@/hooks/coffee-chat/useCoffeeChatActions";
import CoffeeChatActionModal from "./CoffeeChatActionModal";
import ReceivedCoffeeChatCard from "./tabsActions/ReceivedCoffeeChatCard";

const ReceivedListTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoffeeChat, setSelectedCoffeeChat] =
    useState<CoffeeChat | null>(null);

  const {
    data: receivedList,
    isLoading,
    isError,
  } = useQuery<CoffeeChat[]>({
    queryKey: ["receivedList"],
    queryFn: async () => {
      const response = await axiosDefault.get(END_POINT.RECEIVED_COFFEE_CHATS);
      return response.data.data;
    },
    staleTime: 0,
  });

  const {
    handleApprove,
    handleReject,
    handleCancel,
    isApproving,
    isRejecting,
    isCanceling,
    modalState,
    closeModal,
    confirmAction,
  } = useCoffeeChatActions("MENTOR");

  const handleCoffeeChatClick = (coffeechat: CoffeeChat) => {
    setSelectedCoffeeChat(coffeechat);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-4 p-4 bg-red-50 rounded-lg text-center">
        <p className="text-red-500">
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
        <button
          className="mt-2 text-sm text-blue-500 hover:underline"
          onClick={() => window.location.reload()}
        >
          새로고침
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {receivedList && receivedList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {receivedList.map((received) => (
            <ReceivedCoffeeChatCard
              key={received.coffeeChatAppId}
              received={received}
              handleCoffeeChatClick={handleCoffeeChatClick}
              handleApprove={handleApprove}
              handleReject={handleReject}
              handleCancel={handleCancel}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center py-8">
          <p className="text-gray-500">받은 커피챗 신청이 없습니다.</p>
        </div>
      )}

      {/* 커피챗 상세 정보 모달 */}
      <CoffeeChatDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        coffeeChat={selectedCoffeeChat}
      />

      {/* 확인 모달 렌더링 */}
      <CoffeeChatActionModal
        isOpen={modalState.isOpen}
        actionType={modalState.actionType}
        isPenalty={modalState.isPenalty}
        onClose={closeModal}
        onConfirm={confirmAction}
        isLoading={isApproving || isRejecting || isCanceling}
        userRole="MENTOR"
      />
    </div>
  );
};

export default ReceivedListTab;
