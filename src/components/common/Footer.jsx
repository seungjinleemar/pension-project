import React from 'react';

const InfoSection = ({ title, children, className = "" }) => (
  <div className={`flex flex-col items-center justify-center text-center space-y-4 py-10 md:py-0 ${className}`}>
    <h4 className="text-[17px] font-serif font-medium tracking-[0.2em] mb-2 text-white/80 uppercase">{title}</h4>
    <div className="text-[14px] leading-7 text-gray-400 font-sans font-light">
      {children}
    </div>
  </div>
);

const Footer = ({ data }) => {
  // 1. 데이터가 아예 없을 때 출력 방지
  if (!data) return null;

  /**
   * 💡 데이터 경로 재설정
   * pensionService에서 리턴한 객체 구조를 하나씩 확인하며 변수를 할당합니다.
   * 서비스에서 footerInfo로 묶었으므로 해당 경로를 최우선으로 찾습니다.
   */
  const f = data.footerInfo || data.baseInfo || data; // 여러 경로 대응
  const h = data.headerInfo || data;

  // 개별 변수 매핑 (데이터가 없을 경우를 대비해 빈 문자열 처리)
  const pensionName = f.pensionName || "";
  const fullAddress = f.fullAddress || "";
  const tel = f.tel || "";
  const account = f.account || "";
  
  // 사업자 정보 (bizInfo 객체 내부 확인)
  const bizNumber = f.bizInfo?.number || f.bizNumber || "";
  const ceo = f.bizInfo?.ceo || f.ceo || "";
  const farm = f.bizInfo?.farm || f.farm || "";
  
  // 로고 및 예약 링크
  const logo = h.logo || f.logo || "";
  const booking = f.bookingLinks || f.booking || {};

  const btnClass = "h-10 px-7 flex items-center justify-center rounded-full border border-white/20 text-[12px] font-sans tracking-widest hover:bg-white hover:text-black transition-all duration-300";

  return (
    <footer className="w-full bg-[#1A1A1A] text-white py-20 font-sans border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-10 grid grid-cols-1 md:grid-cols-3 items-center">
        
        {/* 1. LEFT: PENSION INFO */}
        <InfoSection title="PENSION INFO">
          {pensionName && <p>상호: {pensionName}</p>}
          {fullAddress && <p>주소: {fullAddress}</p>}
          {bizNumber && <p>사업자번호: {bizNumber}</p>}
          {ceo && <p>대표자: {ceo}</p>}
          {farm && <p>농어촌민박 : {farm}</p>}
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {booking?.ybs && <a href={booking.ybs} target="_blank" rel="noreferrer" className={btnClass}>YBS</a>}
            {booking?.yeogi && <a href={booking.yeogi} target="_blank" rel="noreferrer" className={btnClass}>여기어때</a>}
          </div>
        </InfoSection>

        {/* 2. CENTER: LOGO & COPYRIGHT */}
        <div className="flex flex-col items-center justify-center border-y md:border-y-0 md:border-x border-white/10 py-16 min-h-[240px]">
          <div className="mb-10">
            {logo ? (
              <img src={logo} alt="Logo" className="max-h-12 object-contain brightness-0 invert opacity-90" />
            ) : (
              <h2 className="text-2xl font-serif italic text-white/90 uppercase">{pensionName}</h2>
            )}
          </div>
          <p className="text-[11px] text-gray-500 tracking-[0.2em] font-sans opacity-60 uppercase italic text-center">
            Copyright(C) 2026 MarginMax All Right Reserved
          </p>
        </div>

        {/* 3. RIGHT: NUMBER INFO */}
        <InfoSection title="NUMBER INFO">
          {tel && <p>전화 : {tel}</p>}
          {account && <p>계좌번호 : {account}</p>}
          <div className="mt-8">
            <a href="https://marginmax.me/login/" target="_blank" rel="noreferrer" className={`${btnClass} px-10 h-11 border-white/20 text-[13px]`}>
              관리자 로그인
            </a>
          </div>
        </InfoSection>

      </div>
    </footer>
  );
};

export default Footer;