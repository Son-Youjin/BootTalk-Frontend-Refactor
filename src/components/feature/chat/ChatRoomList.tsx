import Image from "next/image";
import { ChatRoom } from "@/types/response";
import { CHAT_STATUS } from "@/constants/chat";
import { getStatusText } from "@/lib/utils";

interface ChatRoomListProps {
  chatRoomList: ChatRoom[];
  userId?: number;
  handleChatSelect: (roomUuid: string) => void;
  isMobile?: boolean;
}

// TODO: 모바일 사이즈 조절
export default function ChatRoomList({
  chatRoomList,
  userId,
  handleChatSelect,
  isMobile = false,
}: ChatRoomListProps) {
  return (
    <div
      className={
        isMobile
          ? "w-full"
          : "w-full h-[200px] md:h-full md:w-1/3 overflow-hidden border border-gray-100 rounded-lg shadow-sm"
      }
    >
      <div className={isMobile ? "space-y-3" : "h-full overflow-y-auto"}>
        {chatRoomList.length > 0 ? (
          <div className={isMobile ? "space-y-3" : "space-y-2 px-2"}>
            {chatRoomList.map((chatRoom) => (
              <div
                key={chatRoom.roomUuid}
                onClick={() => handleChatSelect(chatRoom.roomUuid)}
                className={`cursor-pointer rounded-xl border transition-all ${
                  chatRoom.isActive
                    ? "bg-white border-gray-200"
                    : "bg-gray-50 border-gray-200 text-gray-400"
                } ${
                  isMobile
                    ? "p-4 shadow-sm active:scale-[0.98]"
                    : "p-3 shadow-sm hover:shadow-md border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  {/* 프로필 */}
                  <div
                    className={`rounded-full overflow-hidden flex-shrink-0 ${
                      isMobile ? "w-12 h-12 mr-4" : "w-10 h-10 mr-3"
                    }`}
                  >
                    <Image
                      src={
                        chatRoom.mentee.userId === userId
                          ? chatRoom.mentor.profileImage ||
                            "/profile-default.png"
                          : chatRoom.mentee.profileImage ||
                            "/profile-default.png"
                      }
                      alt="프로필"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      onClick={(e) => e.stopPropagation()}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/profile-default.png";
                      }}
                    />
                  </div>

                  {/* 텍스트 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4
                        className={`truncate font-semibold ${
                          isMobile ? "text-base" : "text-sm"
                        }`}
                      >
                        {chatRoom.mentor.userId === userId
                          ? chatRoom.mentee.name
                          : chatRoom.mentor.name}
                      </h4>

                      <span
                        className={`flex-shrink-0 ${
                          isMobile ? "text-[11px]" : "text-xs"
                        } ${
                          chatRoom.isActive ? "text-blue-500" : "text-gray-500"
                        }`}
                      >
                        {chatRoom.isActive
                          ? CHAT_STATUS.ONGOING
                          : new Date(chatRoom.endAt) < new Date()
                            ? CHAT_STATUS.ENDED
                            : CHAT_STATUS.UPCOMING}
                      </span>
                    </div>

                    <p
                      className={`mt-1 truncate text-gray-500 ${
                        isMobile ? "text-sm" : "text-xs"
                      }`}
                    >
                      {getStatusText(chatRoom)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center py-12">
            <p className="text-gray-500">채팅 목록이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
