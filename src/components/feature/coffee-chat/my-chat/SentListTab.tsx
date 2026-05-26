"use client";

import { CoffeeChat } from "@/types/response";
import { useState } from "react";
import CoffeeChatDetailModal from "./CoffeeChatDetailModal";
import { useCoffeeChatActions } from "@/hooks/coffee-chat/useCoffeeChatActions";
import CoffeeChatActionModal from "./CoffeeChatActionModal";
import SentCoffeeChatCard from "./tabsActions/SentCoffeeChatCard";
import { useSentCoffeeChats } from "@/hooks/coffee-chat/ useCoffeeChats";
import Loading from "./tabsActions/Loading";
import ErrorReload from "./tabsActions/ErrorReload";

const SentListTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoffeeChat, setSelectedCoffeeChat] =
    useState<CoffeeChat | null>(null);

  const { data: sentList, isLoading, isError } = useSentCoffeeChats();

  const { handleCancel, isCanceling, modalState, closeModal, confirmAction } =
    useCoffeeChatActions("MENTEE");

  const handleCoffeeChatClick = (coffeechat: CoffeeChat) => {
    setSelectedCoffeeChat(coffeechat);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    <Loading />;
  }

  if (isError) {
    <ErrorReload />;
  }

  return (
    <div className="mt-4">
      {sentList && sentList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sentList.map((sent) => (
            <SentCoffeeChatCard
              key={sent.coffeeChatAppId}
              sent={sent}
              onClick={handleCoffeeChatClick}
              onCancel={handleCancel}
              isCanceling={isCanceling}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center py-8">
          <p className="text-gray-500">보낸 커피챗 신청이 없습니다.</p>
        </div>
      )}

      {/* 커피챗 상세 정보 모달 */}
      <CoffeeChatDetailModal
        isSent={true}
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
        isLoading={isCanceling}
        userRole="MENTEE"
      />
    </div>
  );
};

export default SentListTab;
