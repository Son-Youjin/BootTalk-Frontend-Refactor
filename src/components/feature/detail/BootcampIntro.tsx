import React from "react";
import DetailSectionCard from "./DetailSectionCard";

const BootcampIntro = () => {
  return (
    <DetailSectionCard title="부트캠프 소개">
      <div className="text-sm text-neutral-700 leading-relaxed">
        부트캠프의 설명이 제공되지 않습니다.
        <br />
        참여한 유저들의 리뷰를 참고하여 주세요!
      </div>
    </DetailSectionCard>
  );
};

export default BootcampIntro;
