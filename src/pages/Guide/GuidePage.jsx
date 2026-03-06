import React, { useEffect, useMemo } from 'react';

const GuidePage = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderFormattedText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\[.*?\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        const content = part.slice(1, -1);
        return (
          <strong key={index} className="font-bold text-black opacity-100">
            {content}
          </strong>
        );
      }
      return part;
    });
  };

  const heroImage = useMemo(() => data?.bannerData?.image_url || "", [data]);
  
  const guideInfo = useMemo(() => ({
    cost: data?.dbGuide?.cost || "",
    reserve: data?.dbGuide?.reserve || "",
    facility: data?.dbGuide?.facility || "",
    notice: data?.dbGuide?.notice || "",
  }), [data]);

  const refundTableData = useMemo(() => {
    const r = data?.dbRefund;
    if (!r) return null;
    return [
      { day: "당일", pct: r.day_0 },
      { day: "1일전", pct: r.day_1 },
      { day: "2일전", pct: r.day_2 },
      { day: "3일전", pct: r.day_3 },
      { day: "4일전", pct: r.day_4 },
      { day: "5일전", pct: r.day_5 },
      { day: "6일전", pct: r.day_6 },
      { day: "7일전", pct: r.day_7 },
      { day: "8일전", pct: r.day_8 },
      { day: "9일전", pct: r.day_9 },
      { day: "10일전", pct: r.day_10 },
    ];
  }, [data]);

  if (!data) return <div className="min-h-screen" />;

  return (
    <main className="w-full bg-white font-sans text-black">
      
      {/* 섹션 1: 히어로 섹션 */}
      <section className="relative w-full h-[464px] xl:h-[640px] overflow-hidden bg-gray-100">
        {heroImage && (
          <img 
            src={heroImage} 
            alt="Guide Hero" 
            className="w-full h-full object-cover animate-fadeIn" 
          />
        )}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="flex flex-col items-center text-white text-center px-4">
            {/* 💡 모바일 영문 24px */}
            <span className="text-[24px] md:text-[24px] font-cormorant uppercase tracking-[0.2em] mb-[12px] md:mb-[16px] leading-none">
              PENSION GUIDE
            </span>
            {/* 💡 모바일 한글 20px */}
            <h2 className="text-[20px] md:text-[24px] font-serif font-light opacity-90 leading-none">
              펜션 종합이용안내
            </h2>
          </div>
        </div>
      </section>

      {/* 전체 배경 브라운100 영역 */}
      <div className="w-full bg-brown-100">
        
        {/* 섹션 2: 이용안내 */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-[24px] py-16 xl:py-[160px]">
          <div className="mb-10 md:mb-12 xl:mb-[80px]">
            {/* 💡 모바일 한글 레이블 20px */}
            <span className="text-[20px] md:text-eng-title-lg block mb-2 uppercase opacity-60 font-serif leading-none tracking-widest">이용안내</span>
            {/* 💡 모바일 영문 타이틀 24px */}
            <h2 className="text-[24px] md:text-[40px] font-serif font-medium tracking-tight leading-tight">
              Pension Notice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 xl:gap-x-20 gap-y-10 md:gap-y-12">
            <div className="space-y-10 md:space-y-12">
              <div className="pl-2 md:pl-4 text-section-desc !text-[14px] md:!text-[15px] whitespace-pre-wrap leading-relaxed">
                {renderFormattedText(guideInfo.cost)}
              </div>
              <div className="pl-2 md:pl-4 text-section-desc !text-[14px] md:!text-[15px] whitespace-pre-wrap leading-relaxed">
                {renderFormattedText(guideInfo.reserve)}
              </div>
            </div>
            <div className="space-y-10 md:space-y-12">
              <div className="pl-2 md:pl-4 text-section-desc !text-[14px] md:!text-[15px] whitespace-pre-wrap leading-relaxed">
                {renderFormattedText(guideInfo.facility)}
              </div>
              <div className="pl-2 md:pl-4 text-section-desc !text-[14px] md:!text-[15px] whitespace-pre-wrap leading-relaxed">
                {renderFormattedText(guideInfo.notice)}
              </div>
            </div>
          </div>
        </section>

        {/* 섹션 3: 환불규정 */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-[24px] pb-16 xl:pb-[160px]">
          <div className="border-t border-black/10 pt-16 xl:pt-[100px]">
            <div className="mb-8 md:mb-10">
              {/* 💡 모바일 한글 레이블 20px */}
              <span className="text-[20px] md:text-eng-title-lg block mb-2 uppercase opacity-60 font-serif leading-none tracking-widest">환불규정</span>
              {/* 💡 모바일 영문 타이틀 24px */}
              <h2 className="text-[24px] md:text-[40px] font-serif font-medium tracking-tight leading-tight">
                Pension Refund
              </h2>
            </div>
            
            <div className="w-full overflow-x-auto no-scrollbar">
              <table className="w-full min-w-[900px] text-center text-[13px] md:text-[14px]">
                <thead>
                  <tr className="text-gray-500 uppercase font-serif">
                    {refundTableData?.map((item, idx) => (
                      <th key={idx} className="py-3 md:py-4 font-normal border-b border-white">
                        {item.day === "당일" ? "당일" : `${item.day}`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-black font-normal opacity-90">
                    {refundTableData?.map((item, idx) => (
                      <td key={idx} className="py-5 md:py-6 border-b border-white">
                        {item.pct}%
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 md:mt-8 text-center text-red font-medium text-[13px] md:text-[14px] tracking-tight">
              ※ 숙박 당일 환불 불가
            </p>
          </div>
        </section>
      </div>
      
    </main>
  );
};

export default GuidePage;