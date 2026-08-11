"use client";

import dynamic from "next/dynamic";

const DesktopChat = dynamic(
  () => import("@/components/feature/chat/DesktopChat"),
);

const MobileChat = dynamic(
  () => import("@/components/feature/chat/MobileChat"),
);

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
