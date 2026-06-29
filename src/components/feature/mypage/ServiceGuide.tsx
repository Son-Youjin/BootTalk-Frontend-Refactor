import Image from "next/image";

const guides = [
  {
    title: "1. 부트캠프 찾기",
    description:
      "검색과 필터를 활용해 원하는 부트캠프를 쉽고 빠르게 찾아보세요.",
    image: "/BootCamp.png",
  },
  {
    title: "2. 리뷰 보기",
    description:
      "실제 수강생들의 리뷰를 확인하고 부트캠프 선택에 도움을 받아보세요.",
    image: "/Review.png",
  },
  {
    title: "3. 추천 멘토 만나기",
    description:
      "현직 멘토에게 커피챗을 신청하고 실무 경험과 진로에 대한 이야기를 나눠보세요.",
    image: "/CoffeeChat.png",
  },
  {
    title: "4. 포인트 확인",
    description:
      "활동으로 적립한 포인트와 사용 내역을 한눈에 확인할 수 있습니다.",
    image: "/Point.png",
  },
  {
    title: "5. 프로필 관리",
    description:
      "관심 직무를 설정하고 프로필을 관리하여 나에게 맞는 서비스를 이용해보세요.",
    image: "/Profile.png",
  },
];

export default function ServiceGuide() {
  return (
    <div>
      <div className="space-y-8">
        {guides.map((guide) => (
          <section
            key={guide.title}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={guide.image}
                alt={guide.title}
                fill
                className="object-cover object-top"
              />
            </div>

            <div className="p-5">
              <h4 className="text-lg font-semibold text-gray-900">
                {guide.title}
              </h4>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {guide.description}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
