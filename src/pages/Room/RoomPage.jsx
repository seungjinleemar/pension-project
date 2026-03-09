import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import MainSlider from '../../components/MainSlider';
import RoomDetail from '../../components/RoomDetail';
import StripBanner from '../../components/common/StripBanner';
import SpecialExperience from '../../components/common/SpecialExperience';
import { pensionService } from '../../api/pensionService';

const RoomPage = ({ co_id, rooms }) => {

  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!co_id || rooms) {
      setLoading(false);
      return;
    }

    const fetchRoomPageData = async () => {

      setLoading(true);

      try {

        const result = await pensionService.getMainPageData(co_id);
        setData(result);

      } catch (error) {

        console.error("🔥 데이터 로드 에러:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchRoomPageData();

  }, [co_id, rooms]);

  const roomList = rooms || data?.dbRooms || [];

  const currentRoom = useMemo(() => {

    return roomList.find(
      room => String(room.room_idx) === String(id)
    );

  }, [id, roomList]);

  const otherRoomsData = useMemo(() => {

    return roomList
      .filter(room => String(room.room_idx) !== String(id))
      .map(room => ({
        id: room.room_idx,
        title: room.room_name,
        subTitle: room.room_type,
        desc: room.room_intro,
        images: room.imgList?.map(img => img.img_URL) || [],
        link: `/room/${room.room_idx}`
      }));

  }, [id, roomList]);

  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, [id]);

  if (loading) {

    return (
      <div className="min-h-screen bg-[#F5F3EF] flex items-center justify-center">
        <div className="animate-pulse text-gray-400 tracking-widest">
          LOADING
        </div>
      </div>
    );

  }

  if (!currentRoom) return null;

  const roomHeroData = currentRoom.imgList?.map(img => ({
    imageUrl: img.img_URL,
    topText: "ROOM",
    bottomText: currentRoom.room_name
  })) || [];

  return (

    <main className="w-full">

      {/* HERO */}

      <section className="w-full h-[60vh] md:h-screen bg-gray-100 overflow-hidden">

        {roomHeroData.length > 0 && (
          <MainSlider data={roomHeroData} />
        )}

      </section>

      {/* ROOM DETAIL */}

      <RoomDetail roomData={currentRoom} />

      {/* STRIP BANNER */}

      {data?.bannerData && (
        <StripBanner data={data.bannerData} />
      )}

      {/* OTHER ROOMS */}

      {otherRoomsData.length > 0 && (

        <section className="w-full bg-[var(--color-brown-100)]">

          <SpecialExperience
            data={otherRoomsData}
            co_id={co_id}
          />

        </section>

      )}

    </main>

  );

};

export default RoomPage;