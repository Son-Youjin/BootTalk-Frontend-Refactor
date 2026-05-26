import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { CoffeeChat } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

export const useSentCoffeeChats = () => {
  return useQuery<CoffeeChat[]>({
    queryKey: ["sentList"],
    queryFn: async () => {
      const response = await axiosDefault.get(END_POINT.SENT_COFFEE_CHATS);
      return response.data.data;
    },
    staleTime: 0,
  });
};

export const useReceivedCoffeeChats = () => {
  return useQuery<CoffeeChat[]>({
    queryKey: ["receivedList"],
    queryFn: async () => {
      const response = await axiosDefault.get(END_POINT.RECEIVED_COFFEE_CHATS);
      return response.data.data;
    },
    staleTime: 0,
  });
};
