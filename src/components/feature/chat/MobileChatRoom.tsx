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
    <div className="flex h-dvh flex-col bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h2 className="font-semibold">
              {amIMentee ? mentorName : menteeName}
            </h2>
            <p className="text-xs text-gray-500">
              {remainingMinutes > 0
                ? `${remainingMinutes}분 남음`
                : "종료된 채팅"}
            </p>
          </div>
        </div>
      </header>

      {/* 메세지 */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4">
        {!isInitialized && !messages.length && isLoading ? (
          <div className="flex h-full items-center justify-center text-gray-500">
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
                  className={`mb-3 flex ${
                    mine ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                      mine ? "bg-blue-500 text-white" : "bg-white border"
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
      <div className="h-5 px-4 text-xs text-gray-500">
        {isPartnerTyping &&
          `${amIMentee ? mentorName : menteeName}님이 입력 중입니다...`}
      </div>

      {/* 입력창 */}
      <form onSubmit={handleSendMessage} className="border-t bg-white p-3">
        <div className="flex gap-2">
          <input
            className="input input-bordered flex-1"
            value={message}
            onChange={handleInputChange}
            placeholder="메시지를 입력하세요."
            disabled={!selectedChat.isActive || !connected}
          />

          <button
            className="btn btn-primary"
            disabled={!selectedChat.isActive || !connected}
          >
            전송
          </button>
        </div>
      </form>
    </div>
  );
}
