"use client";

import { useEffect, useRef, useState } from "react";
import { coffeeChatTabs } from "@/constants/coffeeChatTabs";

import ApprovedListTab from "@/components/feature/coffee-chat/my-chat/ApprovedListTab";
import SentListTab from "@/components/feature/coffee-chat/my-chat/SentListTab";
import ReceivedListTab from "@/components/feature/coffee-chat/my-chat/ReceivedListTab";
import FindMentorsButton from "./mentor/FindMentorsButton";
import FindMentors from "./mentor/FindMentors";

type TabType = "approved" | "sent" | "received";

const MobileCoffeeChat = () => {
  const [activeTab, setActiveTab] = useState<TabType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mentorButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        !mentorButtonRef.current?.contains(target)
      ) {
        setActiveTab(null);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "approved":
        return <ApprovedListTab />;

      case "sent":
        return <SentListTab />;

      case "received":
        return <ReceivedListTab />;

      default:
        return null;
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="rounded-2xl border border-gray-200 bg-white p-4"
      >
        <div className="mb-4 flex items-center gap-2">
          <p className="text-[16px] font-semibold text-gray-900">내 커피챗</p>

          <span className="text-[16px] text-gray-400">포인트 : 2P</span>
        </div>

        <div className="flex gap-2">
          {coffeeChatTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(activeTab === tab.id ? null : (tab.id as TabType))
              }
              className={`
              flex-1 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200
              ${
                activeTab === tab.id
                  ? "bg-gray-200 text-gray-900"
                  : "bg-gray-100 text-gray-500"
              }
            `}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab && <div className="mt-4">{renderTab()}</div>}
      </div>

      {activeTab && (
        <div ref={mentorButtonRef} className="mt-6">
          <FindMentorsButton />
        </div>
      )}

      {!activeTab && (
        <div className="mt-6">
          <FindMentors />
        </div>
      )}
    </>
  );
};

export default MobileCoffeeChat;
