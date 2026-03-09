import React from 'react';
import MainSlider from '../../components/MainSlider.jsx';
import About from '../../components/About.jsx';
import RoomPreview from '../../components/RoomPreview.jsx';
import StripBanner from '../../components/common/StripBanner.jsx';
import SpecialExperience from '../../components/common/SpecialExperience.jsx';
import Around from '../../components/Around.jsx';

const MainPage = ({ co_id, data }) => {

  // 데이터 없을 때 fallback UI
  if (!data) {
    return (
      <main className="flex-1 flex items-center justify-center bg-[#EFEBE9]">
        <p className="text-sm opacity-60 tracking-widest">Loading...</p>
      </main>
    );
  }

  const {
    mainImages = [],
    aboutData = null,
    dbRooms = [],
    bannerData = null,
    specialData = [],
    aroundData = null,
    footerInfo = {}
  } = data;

  const pensionName = footerInfo?.pensionName || "";

  return (
    <main className="flex-1 w-full overflow-x-hidden bg-[#EFEBE9]">

      {/* HERO SLIDER */}
      {mainImages.length > 0 && (
        <MainSlider data={mainImages} />
      )}

      {/* ABOUT SECTION */}
      {aboutData && (
        <About
          imageUrl={aboutData?.imageUrl || ""}
          description={aboutData?.description || ""}
          calendarURL={aboutData?.calendarURL || ""}
        />
      )}

      {/* ROOM PREVIEW */}
      {dbRooms.length > 0 && (
        <RoomPreview
          pensionName={pensionName}
          dbRooms={dbRooms}
          co_id={co_id}
        />
      )}

      {/* STRIP BANNER */}
      {bannerData && (
        <StripBanner data={bannerData} />
      )}

      {/* SPECIAL EXPERIENCE */}
      {specialData.length > 0 && (
        <SpecialExperience
          data={specialData}
          co_id={co_id}
        />
      )}

      {/* AROUND TOUR */}
      {aroundData && Object.keys(aroundData).length > 0 && (
        <Around
          data={aroundData}
          co_id={co_id}
        />
      )}

    </main>
  );
};

export default MainPage;