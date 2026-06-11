import React from "react";

interface DetailSectionCardProps {
  title: string;
  children: React.ReactNode;
}

const DetailSectionCard = ({ title, children }: DetailSectionCardProps) => {
  return (
    <section className="mb-8" aria-labelledby={`${title}-section`}>
      <h2
        id={`${title}-section`}
        className="mb-3 text-lg font-bold text-gray-900"
      >
        {title}
      </h2>

      <div className="rounded-2xl bg-white p-5 shadow-sm">{children}</div>
    </section>
  );
};

export default DetailSectionCard;
