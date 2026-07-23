"use client";

import { useState } from "react";
import { useGetChatList } from "@/hooks/chat/useGetChatList";

import ChatRoomContainer from "@/components/feature/chat/ChatRoomContainer";
import { useUserStore } from "@/store/useUserStore";
import ChatRoomList from "@/components/feature/chat/ChatRoomList";

export default function DesktopChat() {
  const { chatRoomList = [] } = useGetChatList();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const userId = useUserStore((state) => state.user?.userId);

  const selectedChat = chatRoomList.find(
    (chat) => chat.roomUuid === selectedChatId,
  );

  const handleChatSelect = (roomUuid: string) => {
    setSelectedChatId(roomUuid);
  };

  // TODO: 사이즈 확인 요망
  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-6">채팅</h2>
      <div className="flex flex-col md:flex-row h-[600px] gap-4">
        {/* 왼쪽: 채팅 목록 */}
        <ChatRoomList
          chatRoomList={chatRoomList}
          userId={userId}
          handleChatSelect={handleChatSelect}
        />

        {/* 오른쪽: 채팅방 */}
        <div className="w-full h-[400px] md:h-full md:w-2/3 overflow-hidden border border-gray-100 rounded-lg shadow-sm">
          {selectedChat ? (
            <ChatRoomContainer
              selectedChat={selectedChat}
              key={selectedChatId}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              채팅방을 선택해주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
