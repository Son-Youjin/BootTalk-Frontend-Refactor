import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { Review } from "@/types/response";

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
