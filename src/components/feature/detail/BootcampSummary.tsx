interface BootcampSummaryProps {
  rating: number;
  reviewsCount: number;
  region: string;
  duration: string;
  isFree: boolean;
  jobCategory: string;
}

export default function BootcampSummary({
  rating,
  reviewsCount,
  region,
  duration,
  isFree,
  jobCategory,
}: BootcampSummaryProps) {
  const summaryItems = [
    `${rating.toFixed(1)}(${reviewsCount})`,
    region.split(" ")[0],
    duration,
    isFree ? "무료" : "유료",
    jobCategory,
  ];

  return (
    <div className="mt-6 mb-2">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-sm font-semibold text-gray-500">한눈에 보기</p>

        <div className="flex flex-wrap gap-2">
          {summaryItems.map((item) => (
            <span
              key={item}
              className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
