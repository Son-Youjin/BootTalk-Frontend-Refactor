"use client";

import { useCoffeeChatActions } from "@/hooks/coffee-chat/useCoffeeChatActions";
import CoffeeChatActionModal from "./CoffeeChatActionModal";
import ReceivedCoffeeChatCard from "./tabsActions/ReceivedCoffeeChatCard";
import Loading from "./tabsActions/Loading";
import ErrorReload from "./tabsActions/ErrorReload";
import { useReceivedCoffeeChats } from "@/hooks/coffee-chat/ useCoffeeChats";
import { useCoffeeChatCardAction } from "@/hooks/coffee-chat/useCoffeeChatCardAction";

const ReceivedListTab = () => {
  const { data: receivedList, isLoading, isError } = useReceivedCoffeeChats();

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

  const { handleCardClick } = useCoffeeChatCardAction({
    userRole: "MENTOR",
    handleApprove,
    handleReject,
    handleCancel,
  });

  if (isLoading) {
    <Loading />;
  }

  if (isError) {
    <ErrorReload />;
  }

  return (
    <div className="mt-4">
      {receivedList && receivedList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {receivedList.map((received) => (
            <ReceivedCoffeeChatCard
              key={received.coffeeChatAppId}
              received={received}
              handleCoffeeChatClick={handleCardClick}
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

      {/* 확인 모달 렌더링 */}
      <CoffeeChatActionModal
        isOpen={modalState.isOpen}
        actionType={modalState.actionType}
        isPenalty={modalState.isPenalty}
        onClose={closeModal}
        onConfirm={confirmAction}
        isLoading={isApproving || isRejecting || isCanceling}
        userRole="MENTOR"
        targetName={modalState.targetName}
        coffeeChatStartTime={modalState.coffeeChatStartTime}
      />
    </div>
  );
};

export default ReceivedListTab;
