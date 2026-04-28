import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useQuery } from "@tanstack/react-query";

export default function useFilterOptions() {
  const {
    data: jobRoles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["jobRoles"],
    queryFn: async () => {
      const res = await axiosDefault.get<string[]>(
        END_POINT.BOOTCAMP_JOB_ROLES,
      );
      return res.data;
    },
    staleTime: Infinity,
  });

  return { jobRoles, isLoading, isError };
}
