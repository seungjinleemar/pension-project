import React from 'react';

const LinkButton = ({ text, onClick, className = "" }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-[12px] group cursor-pointer focus:outline-none ${className}`}
    >
      {/* 텍스트 컨테이너: 호버 시 글자가 밀리지 않도록 처리 */}
      <div className="relative flex flex-col items-center justify-center">
        {/* 실제 보이는 텍스트 */}
        <span className="font-serif text-[14px] leading-[1.4] tracking-normal text-[#333] transition-all duration-200 group-hover:font-semibold group-hover:text-black">
          {text}
        </span>
        {/* 공간 확보용 투명 텍스트 (Semibold 두께만큼 미리 자리를 잡음) */}
        <span className="font-serif text-[14px] leading-[1.4] font-semibold invisible h-0 select-none" aria-hidden="true">
          {text}
        </span>
      </div>

      {/* 원형 화살표: 20x20px 고정, 내부 화살표 scale 제외 */}
      <div className="w-[20px] h-[20px] rounded-full bg-[#333] flex items-center justify-center transition-all duration-300 group-hover:bg-black">
        <svg 
          width="10" 
          height="10" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          strokeWidth="3"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </button>
  );
};

export default LinkButton;