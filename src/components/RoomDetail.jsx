import React from "react";
import * as Amenity from "./common/AmenityIcons"; 
import ReservationButton from "./common/ReservationButton"; // 공통 버튼 사용 권장

const RoomDetail = ({ roomData }) => {
  if (!roomData) return null;

  const {
    room_name,
    room_type,
    room_intro,
    room_size,
    people,
    amenity,
    amenity_icon,
    imgList,
    calendarURL
  } = roomData;

  const iconComponents = {
    double_bed: Amenity.DoubleBedIcon,
    tv: Amenity.TVIcon,
    refrigerator: Amenity.RefrigeratorIcon,
    air_conditioner: Amenity.AirconIcon,
    oven: Amenity.MicrowaveIcon,
    shower_supplies: Amenity.ShowerIcon,
    bathtub: Amenity.BathtubIcon,
    bbq: Amenity.BBQIcon,
    spa: Amenity.SpaIcon,
    coffee_pot: Amenity.CoffeeIcon,
  };

  const images = imgList?.map((img) => img.img_URL) || [];
  const placeholder = "https://via.placeholder.com/800x600?text=No+Image";

  return (
    <div className="w-full bg-[var(--color-brown-100)] pt-[48px] pb-[48px] xl:pt-[160px] xl:pb-[160px] font-sans text-black">
      <section className="max-w-[1600px] mx-auto px-4 md:px-6">
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-[64px] items-start">
          
          {/* 이미지 섹션 */}
          <div className="w-full xl:w-[50%] space-y-4 md:space-y-6">
            <div className="w-full aspect-[736/440] bg-white overflow-hidden shadow-sm">
              <img src={images[0] || placeholder} alt={room_name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="w-full aspect-[356/256] bg-white overflow-hidden shadow-sm">
                <img src={images[1] || images[0] || placeholder} alt="sub1" className="w-full h-full object-cover" />
              </div>
              <div className="w-full aspect-[356/256] bg-white overflow-hidden shadow-sm">
                <img src={images[2] || images[0] || placeholder} alt="sub2" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* 정보 섹션 */}
          <div className="w-full xl:flex-1">
            {/* 💡 Rooms 하드코딩 추가 (index.css 스타일 적용) */}
            <span className="text-eng-title-lg block mb-2 uppercase">
              Rooms
            </span>
            
            <h2 className="text-[20px] md:text-[24px] font-serif font-medium mb-6 md:mb-6 tracking-tight">
              {room_name}
            </h2>
            
            <div className="flex flex-col space-y-4 md:space-y-4">
              {room_intro && (
                <div className="flex flex-col">
                  <span className="text-[13px] text-gray-400 font-medium uppercase tracking-wider mb-1">Room info</span>
                  <p className="text-section-desc whitespace-pre-wrap italic opacity-90 leading-relaxed text-[15px]">
                    {room_intro}
                  </p>
                </div>
              )}

              {room_type && (
                <div className="flex flex-col">
                  <span className="text-[13px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Room Type</span>
                  <p className="text-[16px] font-light">{room_type}</p>
                </div>
              )}

              {people && (people.min || people.max) && (
                <div className="flex flex-col">
                  <span className="text-[13px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Number of people</span>
                  <p className="text-[16px] font-light">기준 {people.min}인 ~ 최대 {people.max}인</p>
                </div>
              )}

              {room_size && (
                <div className="flex flex-col">
                  <span className="text-[13px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Size</span>
                  <p className="text-[16px] font-light">{room_size}㎡</p>
                </div>
              )}

              {(amenity_icon || amenity) && (
                <div className="flex flex-col pt-2">
                  <span className="text-[13px] text-gray-400 font-medium uppercase tracking-wider mb-4">Facilities</span>
                  <div className="flex flex-wrap gap-1">
                    {amenity_icon && Object.entries(amenity_icon).map(([key, value]) => {
                      const IconComponent = iconComponents[key];
                      return value && IconComponent && (
                        <div key={key} className="w-[48px] h-[48px] flex items-center justify-center text-gray-500">
                          <IconComponent className="w-full h-full" />
                        </div>
                      );
                    })}
                  </div>
                  {amenity && (
                    <p className="mt-3 text-[14px] md:text-[12px] leading-relaxed text-gray-400 font-light max-w-md">
                      {amenity}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-12 md:mt-16">
              {/* 기존 버튼 유지 혹은 공통 ReservationButton으로 교체 */}
              <button 
                onClick={() => window.open(calendarURL || "#", "_blank", "noopener,noreferrer")}
                className="w-full md:w-auto bg-gray-500 hover:bg-black text-white px-12 py-4 text-[14px] font-serif tracking-widest transition-all duration-300 uppercase"
              >
                Reservation
              </button>
            </div>
          </div>
        </div>

        {/* 하단 갤러리 */}
        {images.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-[60px] md:mt-[120px]">
            <div className="w-full aspect-[500/360] bg-white overflow-hidden shadow-sm">
              <img src={images[3]} alt="gallery1" className="w-full h-full object-cover" />
            </div>
            {images[4] && (
              <div className="w-full aspect-[500/360] bg-white overflow-hidden shadow-sm">
                <img src={images[4]} alt="gallery2" className="w-full h-full object-cover" />
              </div>
            )}
            {images[5] && (
              <div className="w-full aspect-[500/360] bg-white overflow-hidden shadow-sm">
                <img src={images[5]} alt="gallery3" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        )}

      </section>
    </div>
  );
};

export default RoomDetail;