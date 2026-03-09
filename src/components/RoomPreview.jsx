import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import LinkButton from './common/LinkButton';

const RoomPreview = ({ pensionName = "STAY", dbRooms = [], co_id = "" }) => {

  const navigate = useNavigate();

  const rooms = useMemo(() => {
    if (!Array.isArray(dbRooms)) return [];

    return dbRooms.map((room) => ({
      id: room.room_idx ?? room.room_name,
      name: room.room_name || "ROOM",
      image: room.imgList?.[0]?.img_URL || ""
    }));
  }, [dbRooms]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayImg, setDisplayImg] = useState(rooms[0]?.image || "");
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();

  }, []);

  useEffect(() => {

    if (!isVisible || rooms.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rooms.length);
    }, 4000);

    return () => clearInterval(interval);

  }, [isVisible, rooms.length]);

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

  const handleMoreView = () => {

    const currentRoomId = rooms[activeIndex]?.id;

    if (!currentRoomId) return;

    navigate(`/room/${currentRoomId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });

  };

  if (rooms.length === 0) return null;

  return (

    <section
      ref={sectionRef}
      className="w-full bg-brown-100 flex flex-col md:flex-row md:h-screen overflow-hidden font-serif"
    >

      {/* IMAGE */}

      <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:h-full relative overflow-hidden bg-gray-200">

        <img
          src={displayImg}
          alt="Room Preview"
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        />

      </div>

      {/* LIST */}

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center pt-[48px] pb-[24px] md:py-0 px-6 h-full">

        <div className="w-full max-w-[500px] flex flex-col items-center">

          {/* TITLE */}

          <div className="w-full mb-[48px] md:mb-10 flex items-center justify-between md:justify-center">

            <h3 className="uppercase tracking-[0.1em] text-[20px] md:text-[32px] text-black">

              <span className="md:hidden">STAY</span>
              <span className="hidden md:inline">
                STAY. {pensionName}
              </span>

            </h3>

            <div className="md:hidden">
              <LinkButton text="More View" onClick={handleMoreView} />
            </div>

          </div>

          {/* ROOM LIST */}

          <div className="no-scrollbar overflow-y-auto w-full max-h-[240px] md:max-h-[420px]">

            <div className="flex flex-col gap-4 text-center">

              {rooms.map((room, index) => (

                <button
                  key={room.id}
                  onClick={() => setActiveIndex(index)}
                  className={`transition-all duration-300 ${
                    activeIndex === index
                      ? "text-black font-bold scale-105"
                      : "text-black/80"
                  }`}
                >

                  {room.name}

                </button>

              ))}

            </div>

          </div>

          {/* DESKTOP BUTTON */}

          <div className="hidden md:block mt-12">

            <LinkButton
              text="More View"
              onClick={handleMoreView}
            />

          </div>

        </div>

      </div>

    </section>

  );
};

export default RoomPreview;