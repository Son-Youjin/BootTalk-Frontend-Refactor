"use client";

import Loading from "./tabsActions/Loading";
import ErrorReload from "./tabsActions/ErrorReload";
import { useApprovedCoffeeChats } from "@/hooks/coffee-chat/ useCoffeeChats";
import ApprovedCard from "./tabsActions/ApprovedCard";
import { useCoffeeChatActions } from "@/hooks/coffee-chat/useCoffeeChatActions";
import CoffeeChatActionModal from "./CoffeeChatActionModal";

const ApprovedListTab = () => {
  const { data: approvedList, isLoading, isError } = useApprovedCoffeeChats();
  const { handleCancel, isCanceling, modalState, closeModal, confirmAction } =
    useCoffeeChatActions();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorReload />;
  }

  return (
    <div className="mt-4">
      {approvedList && approvedList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {approvedList.map((approved) => (
            <ApprovedCard
              key={approved.coffeeChatAppId}
              approved={approved}
              onCancel={(coffeeChat) =>
                // TODO: 취소 모달 대상자를 mentor로 임시 처리
                // CoffeeChat 응답에 멘토 || 멘티 구분 정보가 없어,
                // 추후 API 응답 구조 개선 시 역할에 따라 대상자명 분기 필요.
                handleCancel(
                  coffeeChat.coffeeChatAppId,
                  coffeeChat.coffeeChatStartTime,
                  coffeeChat.mentorName,
                )
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center py-8">
          <p className="text-gray-500">승인된 커피챗이 없습니다.</p>
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

export default ApprovedListTab;
