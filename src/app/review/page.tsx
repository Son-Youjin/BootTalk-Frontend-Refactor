"use client";

import MobileHeader from "@/components/mobile/MobileHeader";
import ReviewList from "@/components/feature/review/ReviewList";

export default function ReviewPage() {
  return (
    <>
      <section className="w-full">
        <MobileHeader
          title="리뷰를 한눈에"
          subTitle="관심 직무의 생생한 후기를 확인해보세요!"
        />

        <main>
          <ReviewList />
        </main>
      </section>
    </>
  );
}
