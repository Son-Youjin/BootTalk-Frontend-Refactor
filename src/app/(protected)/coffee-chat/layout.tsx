import CoffeeChatHeader from "@/components/feature/coffee-chat/CoffeeChatHeader";
import { ReactNode } from "react";

export default function CoffeeChatLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="max-w-[1200px]  rounded-lg">
      <CoffeeChatHeader />
      {children}
    </div>
  );
}
