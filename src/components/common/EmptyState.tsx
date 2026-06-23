import { Search } from "lucide-react";

interface EmptyStateProps {
  title: string;
  subTitle: string;
}

export default function EmptyState({ title, subTitle }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <Search className="mb-3 text-gray-500" size={28} />

      <p className="font-semibold text-gray-800">{title}</p>

      <p className="text-sm text-gray-500">{subTitle}</p>
    </div>
  );
}
