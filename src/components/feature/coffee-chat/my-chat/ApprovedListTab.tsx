"use client";

import { CoffeeChat } from "@/types/response";
import { useState } from "react";
import CoffeeChatDetailModal from "./CoffeeChatDetailModal";
import Loading from "./tabsActions/Loading";
import ErrorReload from "./tabsActions/ErrorReload";
import { useApprovedCoffeeChats } from "@/hooks/coffee-chat/ useCoffeeChats";
import ApprovedCard from "./tabsActions/ApprovedCard";

const ApprovedListTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoffeeChat, setSelectedCoffeeChat] =
    useState<CoffeeChat | null>(null);

  const { data: approvedList, isLoading, isError } = useApprovedCoffeeChats();

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
      {approvedList && approvedList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {approvedList.map((approved) => (
            <ApprovedCard
              key={approved.coffeeChatAppId}
              approved={approved}
              onClick={handleCoffeeChatClick}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center py-8">
          <p className="text-gray-500">승인된 커피챗이 없습니다.</p>
        </div>
      )}

      {/* 커피챗 상세 정보 모달 */}
      <CoffeeChatDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        coffeeChat={selectedCoffeeChat}
      />
    </div>
  );
};

export default ApprovedListTab;
