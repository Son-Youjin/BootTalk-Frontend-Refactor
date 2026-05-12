import {
  CircleUserRound,
  Pen,
  GraduationCap,
  Coins,
  SquareUserRound,
} from "lucide-react";

export const mobileDrawerProfileItems = [
  {
    icon: CircleUserRound,
    label: "프로필 수정",
    href: "/mypage?tab=profile",
  },
  { icon: Pen, label: "내가 쓴 리뷰", href: "/mypage?tab=reviews" },
  {
    icon: GraduationCap,
    label: "수료증 인증",
    href: "/mypage?tab=certificates",
  },
  { icon: Coins, label: "포인트 사용내역", href: "/mypage?tab=points" },
  {
    icon: SquareUserRound,
    label: "멘토 프로필 관리",
    href: "/mypage?tab=mentor",
  },
];
