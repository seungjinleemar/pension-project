import React, { useState, useEffect, useMemo } from 'react';
import ReservationButton from "./common/ReservationButton";

const SpecialDetail = ({ specials = [], data, currentId }) => {
  const items = useMemo(() => {
    if (Array.isArray(specials) && specials.length > 0) {
      return specials.map((item) => ({
        id: item.id,
        title: item.title || "SPECIAL",
        desc: item.desc || "",
        images: item.images || [],
        mainImage: item.images?.[0] || null,
        calendarURL: item.calendarURL || data?.calendarURL || ""
      }));
    }
    return [];
  }, [specials, data]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (currentId && items.length > 0) {
      const targetIndex = items.findIndex(item => String(item.id) === String(currentId));
      if (targetIndex !== -1) setActiveIndex(targetIndex);
    }
  }, [currentId, items]);

  if (items.length === 0 || !items[activeIndex]) return null;

  const currentItem = items[activeIndex];
  const placeholder = "https://via.placeholder.com/800x600?text=No+Image";

  return (
    <div className="w-full bg-[var(--color-brown-100)] pt-[48px] pb-[48px] xl:pt-[160px] xl:pb-[160px] font-sans text-black">
      <section className="max-w-[1600px] mx-auto px-4 md:px-6">
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-[64px] items-start">
          
          {/* 이미지 섹션: RoomDetail과 동일한 상단 구조 유지 */}
          <div className="w-full xl:w-[50%] space-y-4 md:space-y-6">
            <div className="w-full aspect-[736/440] bg-white overflow-hidden shadow-sm">
              <img 
                src={currentItem.mainImage || placeholder} 
                alt={currentItem.title} 
                className="w-full h-full object-cover animate-fadeIn" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="w-full aspect-[356/256] bg-white overflow-hidden shadow-sm">
                <img src={currentItem.images[1] || currentItem.mainImage || placeholder} alt="sub1" className="w-full h-full object-cover" />
              </div>
              <div className="w-full aspect-[356/256] bg-white overflow-hidden shadow-sm">
                <img src={currentItem.images[2] || currentItem.mainImage || placeholder} alt="sub2" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* 정보 섹션 */}
          <div className="w-full xl:flex-1">
            <span className="text-eng-title-lg block mb-2 uppercase">
              Special
            </span>
            
            <h2 className="text-[20px] md:text-[24px] font-serif font-medium mb-6 md:mb-6 tracking-tight">
              {currentItem.title}
            </h2>
            
            <div className="flex flex-col">
              {currentItem.desc && (
                <p className="font-sans text-[16px] leading-relaxed font-light text-gray-500 whitespace-pre-wrap">
                  {currentItem.desc}
                </p>
              )}
            </div>

            <div className="mt-12 md:mt-16">
              <ReservationButton 
                text="Reservation"
                onClick={() => {
                  const finalLink = currentItem.calendarURL || data?.calendarURL;
                  if (finalLink) window.open(finalLink, "_blank", "noopener,noreferrer");
                }}
                className="w-full md:w-auto"
              />
            </div>
          </div>
        </div>

        {/* 하단 갤러리 섹션 삭제됨 */}

      </section>
    </div>
  );
};

export default SpecialDetail;