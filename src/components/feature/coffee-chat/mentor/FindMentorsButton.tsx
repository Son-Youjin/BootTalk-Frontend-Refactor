import { useRouter } from "next/navigation";

export default function FindMentorsButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/coffee-chat/mentors")}
      className=" btn h-14 min-h-14 w-full rounded-2xl border-0 bg-[#D7EAC4] font-semibold text-gray-800 shadow-none hover:bg-[#CBE1B4]"
    >
      나에게 맞는 멘토 찾으러 가기
    </button>
  );
}
