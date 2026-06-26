import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useDebounce } from "@/hooks/chat/useDebounce";
import { useFileUpload } from "@/hooks/my-page/useFileUpload";
import { Course } from "@/types/response";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BadgeInfo, Search } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const fetchCourses = async (query: string): Promise<Course[]> => {
  const res = await axiosDefault.get(
    `${END_POINT.COURSES}?query=${encodeURIComponent(query)}`,
  );
  return res.data;
};

const fetchCertificate = async (data: {
  courseId: number;
  fileUrl: string;
}) => {
  const res = await axiosDefault.post(END_POINT.CERTIFICATE, data);
  return res.data;
};

const Certificates = () => {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 300);
  const [suggestions, setSuggestions] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [certificateFile, setCertificateFile] = useState<string | null>(null);

  const { data: coursesData, isLoading } = useQuery<Course[]>({
    queryKey: ["courses", debouncedQuery],
    queryFn: () => fetchCourses(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  useEffect(() => {
    if (coursesData && coursesData.length > 0) {
      setSuggestions(coursesData);
    } else {
      setSuggestions([]);
    }
  }, [coursesData]);

  const handleSelect = (course: Course) => {
    setQuery(course.courseName);
    setSelectedCourse(course);
    setSuggestions([]);
  };

  // 수료증 업로드
  const { uploadFileAsync, isPending } = useFileUpload();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const upLoadedUrl = await uploadFileAsync(file);
      setCertificateFile(upLoadedUrl);
    }
  };

  // 폼 제출
  const certificateMutation = useMutation({
    mutationFn: fetchCertificate,
    onSuccess: () => {
      toast.success("수료증이 성공적으로 제출되었습니다.");

      // 폼 초기화
      setQuery("");
      setSelectedCourse(null);
      setCertificateFile(null);

      // 파일 입력 필드 초기화
      const fileInput = document.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    },
    onError: (error) => {
      console.log("수료증 제출 오류:", error);
      toast.error("수료증 제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCourse) {
      toast.error("코스를 선택해주세요.");
      return;
    }

    if (!certificateFile) {
      toast.error("수료증 사진을 업로드해주세요.");
      return;
    }

    certificateMutation.mutate({
      courseId: selectedCourse.courseId,
      fileUrl: certificateFile,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8">
        <div className="relative">
          <h3 className="mb-2 text-sm font-semibold text-gray-800">코스명</h3>

          <label className="flex h-12 items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 transition-colors focus-within:border-amber-800 focus-within:ring-2 focus-within:ring-amber-100">
            <Search size={18} className="shrink-0 text-gray-400" />

            <input
              className="w-full bg-transparent text-base outline-none placeholder:text-gray-400"
              type="search"
              required
              placeholder="코스명을 검색하세요."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
          </label>

          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 z-10 mt-2 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
              {suggestions.map((course) => (
                <li
                  key={course.courseId}
                  className="cursor-pointer px-4 py-3 text-sm transition-colors hover:bg-gray-50"
                  onClick={() => handleSelect(course)}
                >
                  {course.courseName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-gray-800">
            수료증 업로드
          </h3>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered h-12 w-full rounded-xl border-gray-300"
            onChange={handleFileChange}
            disabled={isPending}
            required
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="btn h-10 min-h-10 rounded-xl bg-amber-900 px-6 text-sm font-medium text-white transition-colors hover:bg-amber-800 disabled:opacity-50"
            disabled={isLoading || isPending || certificateMutation.isPending}
          >
            제출
          </button>
        </div>

        <div className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 p-4">
          <BadgeInfo size={18} className="mt-0.5 shrink-0 text-amber-700" />

          <div className="space-y-1 text-sm leading-6 text-gray-700">
            <p>
              제출한 수료증 이미지와 코스명은
              <strong className="font-semibold">고용24</strong>의 부트캠프
              정보와 비교해 인증됩니다.
            </p>
            <p>일치하지 않을 경우 인증이 반려될 수 있습니다.</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Certificates;
