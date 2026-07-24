"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatRoom } from "@/types/response";
import useChatRoom from "@/hooks/chat/useChatRoom";

interface MobileChatRoomProps {
  selectedChat: ChatRoom;
}

export default function MobileChatRoom({ selectedChat }: MobileChatRoomProps) {
  const router = useRouter();

  const {
    message,
    messages,
    isInitialized,
    isPartnerTyping,
    connected,
    isLoading,
    amIMentee,
    mentorName,
    menteeName,
    remainingMinutes,
    messagesEndRef,
    handleInputChange,
    handleSendMessage,
  } = useChatRoom({ selectedChat });

  return (
    <div className="flex h-[calc(100svh-8rem)] flex-col overflow-hidden">
      {/* 헤더 */}
      <header className="flex h-14 items-center border-b bg-white px-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn btn-ghost btn-circle btn-sm h-8 min-h-8 w-8"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h2 className="text-base font-semibold leading-tight">
              {amIMentee ? mentorName : menteeName}
            </h2>

            <p className="text-xs leading-tight text-gray-500">
              {remainingMinutes > 0
                ? `${remainingMinutes}분 남음`
                : "종료된 채팅"}
            </p>
          </div>
        </div>
      </header>

      {/* 메세지 */}
      <div className="min-h-0 flex-1 overflow-y-auto bg-gray-50 px-4 py-4">
        {!isInitialized && !messages.length && isLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            메시지를 불러오는 중...
          </div>
        ) : (
          <>
            {messages.map((msg, index) => {
              if (msg.type === "SYSTEM") {
                return (
                  <div
                    key={msg.id ?? index}
                    className="my-4 flex justify-center"
                  >
                    <div className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600">
                      {msg.content}
                    </div>
                  </div>
                );
              }

              const mine =
                msg.senderId === selectedChat.mentor.userId
                  ? !amIMentee
                  : msg.senderId === selectedChat.mentee.userId
                    ? amIMentee
                    : false;

              return (
                <div
                  key={msg.id ?? index}
                  className={`mb-2 flex ${
                    mine ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[76%] rounded-3xl px-4 py-2 text-sm leading-5 ${
                      mine
                        ? "bg-blue-500 text-white"
                        : "border border-gray-200 bg-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* 타이핑 */}
      <div className="h-6 bg-gray-50 px-4 text-xs leading-6 text-gray-500">
        {isPartnerTyping &&
          `${amIMentee ? mentorName : menteeName}님이 입력 중입니다...`}
      </div>

      {/* 입력창 */}
      <form
        onSubmit={handleSendMessage}
        className="border-t bg-white p-4 pb-[calc(env(safe-area-inset-bottom)+12px)]"
      >
        <div className="flex items-center gap-2">
          <input
            className="input input-bordered h-12 flex-1 rounded-xl px-4 text-sm"
            value={message}
            onChange={handleInputChange}
            placeholder="메시지를 입력하세요."
            disabled={!selectedChat.isActive || !connected}
          />

          <button
            className="btn btn-primary h-12 min-h-12 rounded-xl px-4 text-sm font-medium"
            disabled={!selectedChat.isActive || !connected}
          >
            전송
          </button>
        </div>
      </form>
    </div>
  );
}
