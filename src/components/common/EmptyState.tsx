import { Search } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <Search className="mb-3 text-gray-500" size={28} />

      <p className="font-semibold text-gray-800">
        해당 키워드와 일치하는 부트캠프가 없어요.
      </p>

      <p className="text-sm text-gray-500">다른 키워드로 다시 시도해주세요.</p>
    </div>
  );
}
