import { ChatRoom } from "@/types/response";
import useChatRoom from "@/hooks/chat/useChatRoom";

interface DesktopChatRoomProps {
  selectedChat: ChatRoom;
}

const DesktopChatRoom = ({ selectedChat }: DesktopChatRoomProps) => {
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
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
      {/* 채팅방 헤더 */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="font-medium">{amIMentee ? mentorName : menteeName}</h3>

        <span className="text-xs text-gray-500">
          {remainingMinutes > 0 ? `${remainingMinutes}분 남음` : "종료"}
        </span>
      </div>

      {/* 채팅 메시지 영역 */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-5">
        {!isInitialized && !messages.length && isLoading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">메시지를 불러오는 중...</p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => {
              if (msg.type === "SYSTEM") {
                return (
                  <div
                    key={msg.id ?? `msg-${index}`}
                    className="my-4 flex justify-center"
                  >
                    <div className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
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
                  key={msg.id ?? `msg-${index}`}
                  className={`mb-4 ${mine ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`inline-block max-w-md rounded-3xl px-4 py-2 ${
                      mine
                        ? "bg-blue-500 text-white"
                        : "border border-gray-200 bg-white"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              );
            })}

            {/* 스크롤 위치를 위한 빈 div 요소 */}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* 상대방이 타이핑 중일 때 표시 */}
      <div className="h-6 bg-gray-50 px-3 text-xs leading-6 text-gray-500">
        {isPartnerTyping && (
          <>
            <span className="loading loading-dots loading-xs" />
            <span className="ml-1">
              {amIMentee ? mentorName : menteeName} 님이 입력하고 있어요...
            </span>
          </>
        )}
      </div>

      {/* 메시지 입력 영역 */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 border-t p-3"
      >
        <input
          type="text"
          className="h-12 flex-1 rounded-xl border px-4 disabled:opacity-40"
          placeholder="메시지를 입력"
          value={message}
          onChange={handleInputChange}
          disabled={!selectedChat.isActive || !connected}
        />
        <button
          type="submit"
          className="h-12 rounded-xl bg-blue-500 px-5 text-white transition-colors hover:bg-blue-600 disabled:bg-gray-300"
          disabled={!selectedChat.isActive || !connected}
        >
          전송
        </button>
      </form>
    </div>
  );
};

export default DesktopChatRoom;
