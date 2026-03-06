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

  // 1. 페이지 데이터 로드 (BannerData 및 전체 객실 정보 수신)
  useEffect(() => {
    if (!co_id) return; 

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
  }, [co_id]);

  // 2. 현재 페이지에 표시할 객실 데이터 필터링
  const currentRoom = useMemo(() => {
    const targetRooms = rooms || data?.dbRooms;
    if (!targetRooms) return null;
    return targetRooms.find(room => String(room.room_idx) === String(id));
  }, [id, rooms, data]);

  // 3. 하단 'Other Rooms' 리스트 가공 (현재 객실 제외)
  const otherRoomsData = useMemo(() => {
    const targetRooms = rooms || data?.dbRooms;
    if (!targetRooms) return [];

    return targetRooms
      .filter(room => String(room.room_idx) !== String(id)) 
      .map(room => ({
        id: room.room_idx,
        title: room.room_name,
        subTitle: room.room_type,
        desc: room.room_intro,
        images: room.imgList?.map(img => img.img_URL) || [],
        link: `/room/${room.room_idx}` 
      }));
  }, [id, rooms, data]);

  // 4. 페이지 진입 시 스크롤 최상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#F5F3EF] flex items-center justify-center font-sans">
      Loading...
    </div>
  );

  if (!currentRoom || !data) return null;

  // 히어로 슬라이더용 데이터 변환
  const roomHeroData = currentRoom.imgList?.map((img) => ({
    imageUrl: img.img_URL,
    topText: "ROOM",
    bottomText: currentRoom.room_name,
  })) || [];

  return (
    <main className="w-full">
      {/* 히어로 슬라이더 */}
      <section className="w-full h-[60vh] md:h-screen bg-gray-100 overflow-hidden">
        {roomHeroData.length > 0 && <MainSlider data={roomHeroData} />}
      </section>

      {/* 객실 상세 정보 (편의시설, 설명 등) */}
      <RoomDetail roomData={currentRoom} />

      {/* 공통 띠배너 (aside1 섹션) */}
      {data.bannerData && <StripBanner data={data.bannerData} />}

      {/* 다른 객실 리스트 추천 섹션 */}
      {otherRoomsData.length > 0 && (
        <section className="w-full bg-[var(--color-brown-100)]">
           <SpecialExperience data={otherRoomsData} co_id={co_id} />
        </section>
      )}
    </main>
  );
};

export default RoomPage;