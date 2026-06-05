"use client";

import { Suspense } from "react";
import FindMentors from "@/components/feature/coffee-chat/mentor/FindMentors";

const FindMentorPage = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <FindMentors />
    </Suspense>
  );
};

export default FindMentorPage;
