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
    <div className="mt-4 mb-8">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-gray-600">
        {summaryItems.map((item, index) => (
          <div key={item} className="flex items-center">
            <span>{item}</span>
            {index < summaryItems.length - 1 && (
              <span className="ml-2 text-gray-300">·</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
