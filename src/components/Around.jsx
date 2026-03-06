import React from 'react';
import ReservationButton from './common/ReservationButton';

const Around = ({ data, co_id }) => {
  if (!data) return null;

  const { intro, imgList } = data;

  return (
    <section className="w-full bg-[#1a1a1a] text-white overflow-hidden py-[64px] md:pt-[256px] md:pb-[160px]">
      <div className="max-w-[1600px] mx-auto px-[16px] md:px-[24px]">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-[32px] md:gap-20">
          
          {/* 1. 타이틀 그룹 */}
          <div className="flex flex-col shrink-0">
            <span className="font-serif font-light text-[14px] leading-[1.4] opacity-100 mb-1">
              다양한 주변관광지와 함께하는 휴식
            </span>
            <h2 className="font-serif font-normal text-[24px] md:text-[36px] leading-[1.4] none tracking-tight">
              Around
            </h2>
          </div>

          {/* 2. 인트로 + 버튼 그룹 */}
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 pb-[16px] border-b border-white">
              <div className="max-w-full md:max-w-[600px]">
                <p className="font-sans font-light text-[16px] leading-[1.4] opacity-80 whitespace-pre-line break-keep">
                  {intro}
                </p>
              </div>

              {/* ★ 버튼 컨테이너: 모바일에서 w-full 적용 */}
              <div className="w-full md:w-auto mt-4 md:mt-0">
                <ReservationButton 
                  text="Reservation"
                  className="w-full md:w-auto" // 버튼 자체에도 너비 제어 클래스 전달
                  onClick={() => window.location.href = `/${co_id}/reservation`} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. 이미지 영역 */}
        <div className="mt-[32px] md:mt-[48px] grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[24px]">
          {imgList?.slice(0, 3).map((img, index) => (
            <div key={index} className="aspect-[4/3] overflow-hidden bg-[#222]">
              <img 
                src={img.img_URL} 
                alt=""
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Around;