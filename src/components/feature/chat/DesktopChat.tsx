"use client";

import { useState } from "react";
import { useGetChatList } from "@/hooks/chat/useGetChatList";

import DesktopChatRoom from "@/components/feature/chat/DesktopChatRoom";
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

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="mb-6 text-2xl font-bold">채팅</h2>
      <div className="flex h-[640px] gap-4">
        {/* 왼쪽: 채팅 목록 */}
        <ChatRoomList
          chatRoomList={chatRoomList}
          userId={userId}
          handleChatSelect={handleChatSelect}
        />

        {/* 오른쪽: 채팅방 */}
        <div className="h-full w-2/3 overflow-hidden rounded-lg border border-gray-100 shadow-sm">
          {selectedChat ? (
            <DesktopChatRoom selectedChat={selectedChat} key={selectedChatId} />
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
