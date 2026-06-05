"use client";

import { Suspense } from "react";
import CoffeeChatTabNavigation from "@/components/feature/coffee-chat/CoffeeChatTabNavigation";
import MobileCoffeeChat from "@/components/feature/coffee-chat/MobileCoffeeChat";
import FindMentors from "@/components/feature/coffee-chat/mentor/FindMentors";

const MentorPage = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <div className="hidden md:block">
        <CoffeeChatTabNavigation />
        <FindMentors />
      </div>

      <div className="block md:hidden">
        <MobileCoffeeChat />
      </div>
    </Suspense>
  );
};

export default MentorPage;
