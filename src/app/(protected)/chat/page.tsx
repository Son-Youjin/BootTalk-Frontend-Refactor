"use client";

import DesktopChat from "@/components/feature/chat/DesktopChat";
import MobileChat from "@/components/feature/chat/MobileChat";

export default function ChatPage() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopChat />
      </div>

      <div className="md:hidden">
        <MobileChat />
      </div>
    </>
  );
}
