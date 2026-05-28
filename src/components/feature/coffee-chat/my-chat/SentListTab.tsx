"use client";

import { useCoffeeChatActions } from "@/hooks/coffee-chat/useCoffeeChatActions";
import CoffeeChatActionModal from "./CoffeeChatActionModal";
import SentCoffeeChatCard from "./tabsActions/SentCoffeeChatCard";
import { useSentCoffeeChats } from "@/hooks/coffee-chat/ useCoffeeChats";
import Loading from "./tabsActions/Loading";
import ErrorReload from "./tabsActions/ErrorReload";
import { useCoffeeChatCardAction } from "@/hooks/coffee-chat/useCoffeeChatCardAction";

const SentListTab = () => {
  const { data: sentList, isLoading, isError } = useSentCoffeeChats();

  const { handleCancel, isCanceling, modalState, closeModal, confirmAction } =
    useCoffeeChatActions("MENTEE");

  const { handleCardClick } = useCoffeeChatCardAction({
    userRole: "MENTEE",
    handleApprove: () => {},
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
      {sentList && sentList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sentList.map((sent) => (
            <SentCoffeeChatCard
              key={sent.coffeeChatAppId}
              sent={sent}
              onClick={handleCardClick}
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

      {/* 확인 모달 렌더링 */}
      <CoffeeChatActionModal
        isOpen={modalState.isOpen}
        actionType={modalState.actionType}
        isPenalty={modalState.isPenalty}
        onClose={closeModal}
        onConfirm={confirmAction}
        isLoading={isCanceling}
        userRole="MENTEE"
        targetName={modalState.targetName}
        coffeeChatStartTime={modalState.coffeeChatStartTime}
      />
    </div>
  );
};

export default SentListTab;
