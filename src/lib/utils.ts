import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { Review } from "@/types/response";
import {
  DayOfWeek,
  TimeSlot,
} from "@/components/feature/coffee-chat/TimeSlotSelectorProps";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "yyyy-MM-dd HH:mm", { locale: ko });
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
};

export const getReviewSummary = (reviews: Review[]) => {
  const reviewCount = reviews.length;

  if (reviewCount === 0) {
    return {
      averageRating: 0,
      reviewCount: 0,
    };
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

  return {
    averageRating: Number((totalRating / reviewCount).toFixed(1)),
    reviewCount,
  };
};

export const getBootcampDuration = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  const weeks = Math.ceil(diffDays / 7);

  return `${weeks}주`;
};

// 시간을 HH:mm 형식의 문자열로 변환
export const formatTimeToString = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

// 문자열을 Date 객체로 변환 (비교용)
export const parseTimeString = (timeStr: string): Date => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

// 기본 타임슬롯 생성 함수
export const createDefaultTimeSlots = (): TimeSlot[] => {
  return [
    { day: "월" as DayOfWeek, times: [] },
    { day: "화" as DayOfWeek, times: [] },
    { day: "수" as DayOfWeek, times: [] },
    { day: "목" as DayOfWeek, times: [] },
    { day: "금" as DayOfWeek, times: [] },
    { day: "토" as DayOfWeek, times: [] },
    { day: "일" as DayOfWeek, times: [] },
  ];
};

export const selectedDateText = (selectedDate: Date | null) => {
  return selectedDate ? format(selectedDate, "yyyy.MM.dd") : "-";
};

export const createCoffeeChatDateTime = (
  selectedDate: Date,
  selectedTime: string,
) => {
  const [hour, minute] = selectedTime.split(":").map(Number);

  const startDateTime = new Date(selectedDate);
  startDateTime.setHours(hour, minute, 0);

  const endDateTime = new Date(startDateTime);
  endDateTime.setMinutes(endDateTime.getMinutes() + 30);

  return {
    coffeeChatStartTime: format(startDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
    coffeeChatEndTime: format(endDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
  };
};
