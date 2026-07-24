"use client";

import { useGetChatList } from "@/hooks/chat/useGetChatList";
import { useUserStore } from "@/store/useUserStore";
import ChatRoomList from "./ChatRoomList";
import { useRouter } from "next/navigation";
import MobileHeader from "@/components/mobile/MobileHeader";

export default function MobileChat() {
  const router = useRouter();
  const userId = useUserStore((state) => state.user?.userId);
  const { chatRoomList = [] } = useGetChatList();

  const handleChatSelect = (roomUuid: string) => {
    router.push(`/chat/${roomUuid}`);
  };

  return (
    <>
      <MobileHeader title="채팅" />

      <ChatRoomList
        chatRoomList={chatRoomList}
        userId={userId}
        handleChatSelect={handleChatSelect}
        isMobile
      />
    </>
  );
}
