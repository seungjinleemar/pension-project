import React from 'react';
import MainSlider from '../../components/MainSlider.jsx';
import About from '../../components/About.jsx';
import RoomPreview from '../../components/RoomPreview.jsx';
import StripBanner from '../../components/common/StripBanner.jsx';
import SpecialExperience from '../../components/common/SpecialExperience.jsx';
import Around from '../../components/Around.jsx';

const MainPage = ({ co_id, data }) => {
  // 💡 부모(App.js)로부터 데이터를 직접 받으므로 내부 useEffect와 fetch 로직을 삭제했습니다.

  if (!data) return null;

  return (
    <main className="flex-1 w-full overflow-x-hidden bg-[#EFEBE9]">
      {/* 1. 메인 슬라이더 */}
      {data.mainImages?.length > 0 && (
        <MainSlider data={data.mainImages} />
      )}

      {/* 2. 어바웃 섹션 */}
      {data.aboutData && (
        <About 
          imageUrl={data.aboutData.imageUrl} 
          description={data.aboutData.description} 
          calendarURL={data.aboutData.calendarURL}
        />
      )}

      {/* 3. 객실 미리보기 */}
      {data.dbRooms?.length > 0 && (
        <RoomPreview 
          pensionName={data.footerInfo?.pensionName} 
          dbRooms={data.dbRooms} 
          co_id={co_id} 
        />
      )}

      {/* 4. 공통 띠배너 */}
      {data.bannerData && (
        <StripBanner data={data.bannerData} />
      )}

      {/* 5. 특별한 경험 (스페셜 섹션) */}
      {data.specialData?.length > 0 && (
        <SpecialExperience data={data.specialData} co_id={co_id} />
      )}

      {/* 6. 주변 관광지 */}
      {data.aroundData && (
        <Around data={data.aroundData} co_id={co_id} />
      )}
    </main>
  );
};

export default MainPage;