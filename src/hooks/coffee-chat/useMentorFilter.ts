import { useRouter, useSearchParams } from "next/navigation";

export default function useMentorFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobTypeFilter = searchParams.get("jobType") || "all";

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "all") {
      router.push(window.location.pathname);
    } else {
      router.push(`?jobType=${value}`);
    }
  };

  return { jobTypeFilter, handleFilterChange };
}
