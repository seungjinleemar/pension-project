import React, { useEffect } from 'react';
import MainSlider from '../../components/MainSlider';
import About from '../../components/About'; 
import StripBanner from '../../components/common/StripBanner';
import Location from '../../components/Location';
import Around from '../../components/Around';

// 💡 App.js로부터 data를 직접 받으므로 내부 fetch 로직과 loading 상태를 제거했습니다.
const AboutPage = ({ co_id, data }) => {
  
  // 페이지 이동 시 항상 최상단으로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 데이터가 없을 때를 대비한 방어 코드
  if (!data) return null;

  const { mainImages, bannerData, aroundData, baseInfo, aboutData } = data;

  return (
    <main className="flex-1 w-full bg-[#F5F3EF]">
      {/* 1. 메인 슬라이더 */}
      {mainImages?.length > 0 && <MainSlider data={mainImages} />}

      {/* 2. 애니메이션 About 섹션 */}
      {aboutData && (
        <About 
          title="About Us"
          imageUrl={aboutData.imageUrl} 
          description={aboutData.description} 
          calendarURL={data.aboutData.calendarURL}
        />
      )}

      {/* 3. 띠배너 */}
      {bannerData && <StripBanner data={bannerData} />}

      {/* 4. 로케이션 (지도 및 주소) */}
      {baseInfo && <Location data={baseInfo} />}

      {/* 5. 어라운드 (주변 관광지) */}
      {aroundData && <Around data={aroundData} co_id={co_id} />}
    </main>
  );
};

export default AboutPage;