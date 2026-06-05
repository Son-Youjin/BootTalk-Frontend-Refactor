import CoffeeChatHeader from "@/components/feature/coffee-chat/CoffeeChatHeader";
import { ReactNode } from "react";

export default function CoffeeChatLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="max-w-[1200px] mx-auto bg-white p-6 rounded-lg">
      <CoffeeChatHeader />
      {children}
    </div>
  );
}
