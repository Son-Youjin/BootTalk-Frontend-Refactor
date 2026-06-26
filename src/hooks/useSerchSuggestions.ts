import { useEffect, useState, useRef } from "react";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useDebounce } from "./chat/useDebounce";

export interface BootcampSuggestion {
  bootcampId: number;
  bootcampName: string;
}

export const useSearchSuggestions = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [suggestions, setSuggestions] = useState<BootcampSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.trim().length === 0) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);

      try {
        const response = await axiosDefault.get(
          `${END_POINT.BOOTCAMPS_AUTOCOMPLETE}?query=${encodeURIComponent(
            debouncedQuery,
          )}`,
        );

        setSuggestions(response.data || []);
        setIsOpen(true);
      } catch {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    query,
    setQuery,
    suggestions,
    isOpen,
    setIsOpen,
    isLoading,
    inputRef,
    dropdownRef,
  };
};
