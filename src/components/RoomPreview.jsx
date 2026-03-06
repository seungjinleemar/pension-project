import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // 네비게이션을 위해 추가
import LinkButton from './common/LinkButton';

const RoomPreview = ({ pensionName = "STAY", dbRooms = [], co_id = "" }) => {
  const navigate = useNavigate(); // react-router-dom의 navigate 사용
  
  const rooms = useMemo(() => {
    if (Array.isArray(dbRooms) && dbRooms.length > 0) {
      return dbRooms.map((room) => ({
        id: room.room_idx || Math.random().toString(),
        name: room.room_name || "ROOM",
        image: room.imgList?.[0]?.img_URL || ""
      }));
    }
    return [];
  }, [dbRooms]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayImg, setDisplayImg] = useState(rooms[0]?.image || ""); 
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || rooms.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rooms.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible, rooms.length, activeIndex]);

  useEffect(() => {
    if (rooms.length === 0) return;
    const nextImg = rooms[activeIndex]?.image;
    if (nextImg && nextImg !== displayImg) {
      setIsFading(true);
      const timer = setTimeout(() => {
        setDisplayImg(nextImg);
        setIsFading(false);
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [activeIndex, rooms, displayImg]);

  // 💡 수정된 부분: 현재 선택된(activeIndex) 객실의 ID를 가지고 이동합니다.
  const handleMoreView = () => {
    const currentRoomId = rooms[activeIndex]?.id;
    if (currentRoomId) {
      navigate(`/room/${currentRoomId}`);
      window.scrollTo(0, 0); // 페이지 이동 시 최상단으로 스크롤
    }
  };

  if (rooms.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full bg-brown-100 flex flex-col md:flex-row md:h-screen overflow-hidden font-serif">
      {/* 1. 이미지 영역 */}
      <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:h-full relative overflow-hidden bg-gray-200">
        <img 
          src={displayImg} 
          alt="Room Preview" 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>

      {/* 2. 리스트 영역 */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center pt-[48px] pb-[24px] md:py-0 px-6 h-full">
        <div className="w-full max-w-[500px] flex flex-col items-center justify-center">
          
          {/* 타이틀 영역 */}
          <div className="w-full mb-[48px] md:mb-10 flex items-center justify-between md:justify-center">
            <h3 className="uppercase tracking-[0.1em] whitespace-nowrap text-[20px] md:text-[32px] text-black">
              <span className="md:hidden">STAY</span>
              <span className="hidden md:inline">STAY. {pensionName}</span>
            </h3>
            {/* 모바일 버튼 (현재 선택된 룸으로 이동) */}
            <div className="md:hidden">
              <LinkButton text="More View" onClick={handleMoreView} />
            </div>
          </div>
          
          {/* 객실 리스트 */}
          <div className="no-scrollbar overflow-y-auto w-full" 
               style={{ 
                 maxHeight: typeof window !== 'undefined' && window.innerWidth < 768 
                   ? 'calc((14px * 1.4 * 8) + (16px * 7))' 
                   : 'calc((16px * 1.4 * 15) + (16px * 14))', 
               }}>
            <div className="flex flex-col gap-4 text-center">
              {rooms.map((room, index) => (
                <button 
                  key={room.id}
                  onClick={() => setActiveIndex(index)}
                  className={`border-none bg-transparent cursor-pointer transition-all duration-300 ${
                    activeIndex === index 
                      ? 'text-black font-bold scale-105' 
                      : 'text-black/80 font-normal'
                  }`}
                  style={{ 
                    fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '14px' : '16px', 
                    lineHeight: '1.4' 
                  }}
                >
                  {room.name}
                </button>
              ))}
            </div>
          </div>

          {/* PC 버전 버튼 (현재 선택된 룸으로 이동) */}
          <div className="hidden md:block mt-12">
            <LinkButton text="More View" onClick={handleMoreView} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default RoomPreview;