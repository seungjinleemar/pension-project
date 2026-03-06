import React from 'react';

const Location = ({ data }) => {
  // 💡 데이터 경로 방어 코드 (pensionService 구조에 맞춤)
  const locationData = data?.footerInfo || data?.baseInfo || data;
  
  if (!locationData || !locationData.fullAddress) return null;

  const { fullAddress, pensionName } = locationData;
  const oldAddress = locationData.addressDetails?.old || locationData.oldAddress;

  // 💡 카카오맵 검색결과 페이지로 연결되는 URL (버튼용)
  const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(fullAddress)}`;

  return (
    <section className="w-full bg-brown-100 py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row gap-12 xl:gap-20 items-stretch">
          
          {/* 1. LEFT: ADDRESS INFO */}
          <div className="w-full md:w-[380px] flex flex-col justify-center">
            <h2 className="text-section-title mb-10 uppercase tracking-wider">
              Location
            </h2>
            
            <div className="space-y-10 font-sans leading-relaxed">
              <div className="group">
                <span className="block text-black font-semibold text-[13px] uppercase tracking-[0.2em] mb-4 opacity-40">
                  Road Address
                </span>
                <p className="text-black text-[17px] font-medium break-keep leading-snug">
                  {fullAddress}
                </p>
                <div className="w-12 h-[1px] bg-black/20 mt-6 transition-all group-hover:w-24 group-hover:bg-black/40"></div>
              </div>

              {oldAddress && (
                <div className="opacity-70">
                  <span className="block text-black font-semibold text-[13px] uppercase tracking-[0.2em] mb-4 opacity-40">
                    Land Address
                  </span>
                  <p className="text-[15px] text-gray-500 break-keep">
                    {oldAddress}
                  </p>
                </div>
              )}
            </div>

            {/* 지도 바로가기 버튼 (모바일/PC 공통) */}
            <div className="mt-12">
              <a 
                href={kakaoMapUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center w-full md:w-56 h-14 border border-black/10 bg-white text-[14px] font-medium tracking-tight hover:bg-black hover:text-white transition-all duration-300"
              >
                카카오맵으로 길찾기
              </a>
            </div>
          </div>

          {/* 2. RIGHT: MAP AREA (PC 전용) */}
          {/* 💡 shadow-2xl 제거 및 border로 깔끔하게 처리 */}
          <div className="hidden md:block flex-1 min-h-[600px] bg-[#f0f0f0] border border-black/5 relative group">
            {/* 💡 중요: iframe 자동이동 문제는 카카오맵 정책 때문입니다. 
               가장 안정적인 방법은 구글 맵 임베드 혹은 실제 지도 API를 사용하는 것이지만, 
               임시로 주소 기반의 정적 지도를 보여주거나 안내 문구로 대체하는 것이 깔끔합니다.
            */}
            <iframe 
              src={`https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full border-0 grayscale-[0.3] contrast-[1.1]"
              title="map-frame"
              allowFullScreen
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Location;