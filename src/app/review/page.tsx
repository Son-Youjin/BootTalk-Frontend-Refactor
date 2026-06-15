"use client";

import MobileHeader from "@/components/mobile/MobileHeader";
import ReviewList from "@/components/feature/review/ReviewList";

export default function ReviewPage() {
  return (
    <>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6">
          <MobileHeader
            title="리뷰를 한눈에"
            subTitle="관심 직무의 생생한 후기를 확인해보세요!"
          />
        </div>

        <main>
          <ReviewList />
        </main>
      </section>
    </>
  );
}
