"use client";

import DesktopChat from "@/components/feature/chat/DesktopChat";
import MobileChatList from "@/components/feature/chat/MobileChatList";

export default function ChatPage() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopChat />
      </div>

      <div className="md:hidden">
        <MobileChatList />
      </div>
    </>
  );
}
