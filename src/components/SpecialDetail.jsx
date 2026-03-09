import React, { useState, useEffect, useMemo } from 'react';
import ReservationButton from "./common/ReservationButton";

const SpecialDetail = ({ specials = [], data = {}, currentId }) => {

  const items = useMemo(() => {
    if (!Array.isArray(specials)) return [];

    return specials.map((item) => ({
      id: item?.id,
      title: item?.title || "SPECIAL",
      desc: item?.desc || "",
      images: item?.images || [],
      mainImage: item?.images?.[0] || null,
      calendarURL: item?.calendarURL || data?.calendarURL || ""
    }));
  }, [specials, data?.calendarURL]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!currentId || items.length === 0) return;

    const targetIndex = items.findIndex(
      (item) => String(item.id) === String(currentId)
    );

    if (targetIndex >= 0) {
      setActiveIndex(targetIndex);
    }
  }, [currentId, items]);

  if (items.length === 0) return null;

  const currentItem = items[activeIndex] || items[0];
  const placeholder = "https://via.placeholder.com/800x600?text=No+Image";

  const mainImage = currentItem?.mainImage || placeholder;
  const subImage1 = currentItem?.images?.[1] || mainImage;
  const subImage2 = currentItem?.images?.[2] || mainImage;

  const handleReservation = () => {
    const finalLink = currentItem?.calendarURL || data?.calendarURL;
    if (finalLink) {
      window.open(finalLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="w-full bg-[var(--color-brown-100)] pt-[48px] pb-[48px] xl:pt-[160px] xl:pb-[160px] font-sans text-black">
      <section className="max-w-[1600px] mx-auto px-4 md:px-6">

        <div className="flex flex-col xl:flex-row gap-6 xl:gap-[64px] items-start">

          {/* 이미지 영역 */}
          <div className="w-full xl:w-[50%] space-y-4 md:space-y-6">

            <div className="w-full aspect-[736/440] bg-white overflow-hidden shadow-sm">
              <img
                src={mainImage}
                alt={`${currentItem.title} main`}
                loading="lazy"
                className="w-full h-full object-cover animate-fadeIn"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">

              <div className="w-full aspect-[356/256] bg-white overflow-hidden shadow-sm">
                <img
                  src={subImage1}
                  alt={`${currentItem.title} sub1`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full aspect-[356/256] bg-white overflow-hidden shadow-sm">
                <img
                  src={subImage2}
                  alt={`${currentItem.title} sub2`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>

          {/* 텍스트 영역 */}
          <div className="w-full xl:flex-1">

            <span className="text-eng-title-lg block mb-2 uppercase">
              Special
            </span>

            <h2 className="text-[20px] md:text-[24px] font-serif font-medium mb-6 tracking-tight">
              {currentItem.title}
            </h2>

            {currentItem.desc && (
              <p className="font-sans text-[16px] leading-relaxed font-light text-gray-500 whitespace-pre-wrap">
                {currentItem.desc}
              </p>
            )}

            <div className="mt-12 md:mt-16">
              <ReservationButton
                text="Reservation"
                onClick={handleReservation}
                className="w-full md:w-auto"
              />
            </div>

          </div>

        </div>

      </section>
    </div>
  );
};

export default SpecialDetail;