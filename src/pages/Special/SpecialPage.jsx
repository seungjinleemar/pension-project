import React, { useMemo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainSlider from '../../components/MainSlider';
import SpecialDetail from '../../components/SpecialDetail';
import StripBanner from '../../components/common/StripBanner';
import SpecialExperience from '../../components/common/SpecialExperience';
import { pensionService } from '../../api/pensionService'; // API 호출 추가

const SpecialPage = ({ specials = [], co_id, data: initialData }) => {
  const { id } = useParams();
  const [pageData, setPageData] = useState(initialData || null);
  const [loading, setLoading] = useState(!initialData);

  // 1. 띠배너 및 공통 데이터를 위한 API 호출 (RoomPage와 동일 로직)
  useEffect(() => {
    if (!co_id) return;

    const fetchPageData = async () => {
      try {
        const result = await pensionService.getMainPageData(co_id);
        setPageData(result);
      } catch (error) {
        console.error("🔥 SpecialPage 데이터 로드 에러:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!initialData) {
      fetchPageData();
    }
  }, [co_id, initialData]);

  // 2. 현재 스페셜 데이터 추출
  const currentSpecial = useMemo(() => {
    if (!specials || specials.length === 0) return null;
    const found = specials.find(s => String(s.id) === String(id));
    return found || specials[0];
  }, [id, specials]);

  // 3. 하단 추천 리스트 가공
  const otherSpecialsData = useMemo(() => {
    if (!specials || specials.length === 0) return [];
    return specials
      .filter(item => String(item.id) !== String(id))
      .map(item => ({
        id: item.id,
        title: item.title,
        subTitle: "SPECIAL EXPERIENCE",
        desc: item.desc,
        images: item.images || [],
        link: `/special/${item.id}`
      }));
  }, [id, specials]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  if (!currentSpecial) return null;

  const specialSliderData = (currentSpecial.images || [])
    .filter(imgUrl => imgUrl)
    .map((imgUrl) => ({
      imageUrl: imgUrl,
      topText: "SPECIAL EXPERIENCE",
      bottomText: currentSpecial.title || "SPECIAL",
    }));

  return (
    <main className="w-full bg-white font-sans text-black">
      {/* 섹션 1: 상단 슬라이더 */}
      <section className="w-full">
        {specialSliderData.length > 0 && <MainSlider data={specialSliderData} interval={5000} />}
      </section>

      {/* 섹션 2: 스페셜 상세 */}
      <section className="w-full">
        <SpecialDetail 
          specials={specials} 
          data={pageData} 
          currentId={id} 
        />
      </section>

      {/* 섹션 3: 띠배너 (pageData.bannerData 확인) */}
      <section className="w-full">
        {pageData?.bannerData ? (
          <StripBanner data={pageData.bannerData} />
        ) : (
          /* 디버깅용: 데이터가 없을 때 콘솔 확인 */
          console.log("⚠️ bannerData가 없습니다:", pageData)
        )}
      </section>

      {/* 섹션 4: 다른 스페셜 추천 */}
      {otherSpecialsData.length > 0 && (
        <section className="w-full bg-[var(--color-brown-100)]">
           <SpecialExperience data={otherSpecialsData} co_id={co_id} />
        </section>
      )}
    </main>
  );
};

export default SpecialPage;