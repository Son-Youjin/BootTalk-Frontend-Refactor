import MobileHeader from "@/components/mobile/MobileHeader";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[1200px] rounded-lg">
      <MobileHeader
        title="멘토를 한눈에"
        subTitle="나와 맞는 멘토를 손쉽게 확인해보세요!"
      />
      {children}
    </div>
  );
}
