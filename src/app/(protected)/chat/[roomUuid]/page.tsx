"use client";

import { useParams } from "next/navigation";
import { useGetChatList } from "@/hooks/chat/useGetChatList";
import MobileChatRoom from "@/components/feature/chat/MobileChatRoom";

export default function Page() {
  const { roomUuid } = useParams();
  const { chatRoomList = [] } = useGetChatList();
  const selectedChat = chatRoomList.find((chat) => chat.roomUuid === roomUuid);

  if (!selectedChat) {
    return <div>채팅방을 불러오는 중...</div>;
  }

  return <MobileChatRoom selectedChat={selectedChat} />;
}
