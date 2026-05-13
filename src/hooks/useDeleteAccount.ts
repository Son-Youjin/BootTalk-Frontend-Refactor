import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useUserStore } from "@/store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useDeleteAccount = () => {
  const router = useRouter();
  const logout = useUserStore((state) => state.logout);

  return useMutation({
    mutationFn: async () => {
      return await axiosDefault.delete(END_POINT.MY_INFO);
    },
    onSuccess: () => {
      logout();
      router.push("/");
    },
    onError: (error) => {
      console.error("회원탈퇴 실패:", error);
      toast.error("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
    },
  });
};
