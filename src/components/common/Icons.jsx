import React from 'react';

// 💡 배경 Wrapper: 기본은 bg-transparent, 호버 시에만 bg-white/20
const IconWrapper = ({ children, className = "" }) => (
  <div className={`
    relative flex items-center justify-center transition-all duration-300 
    bg-transparent group-hover:bg-white/20 
    /* 💡 모바일 40px, PC 80px 사이즈 유지 */
    w-10 h-10 xl:w-20 xl:h-20
    /* 💡 화살표를 키우기 위해 패딩(여백)을 대폭 줄임 */
    p-1 xl:p-2 
    ${className}
  `}>
    {children}
  </div>
);

// 💡 뒤로가기 아이콘 (화살표 크기 확대)
export const BackIcon = ({ className = "", color = "white", strokeWidth = "2" }) => (
  <IconWrapper className={className}>
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 80 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M45 20L25 40L45 60" 
        stroke={color === "currentColor" ? "currentColor" : color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="transition-all duration-300 group-hover:stroke-[3]" 
      />
    </svg>
  </IconWrapper>
);

// 💡 앞으로가기 아이콘 (화살표 크기 확대)
export const NextIcon = ({ className = "", color = "white", strokeWidth = "2" }) => (
  <IconWrapper className={className}>
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 80 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M35 20L55 40L35 60" 
        stroke={color === "currentColor" ? "currentColor" : color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="transition-all duration-300 group-hover:stroke-[3]" 
      />
    </svg>
  </IconWrapper>
);

// 예약 아이콘 (동일 규칙 적용)
export const ReservationIcon = ({ className = "" }) => (
  <IconWrapper className={className}>
    <svg 
      width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 15V31C8 33.2091 9.79086 35 12 35H21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M32 21V15C32 12.7909 30.2091 11 28 11H12C9.79086 11 8 12.7909 8 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M8 18.5H32" stroke="currentColor" strokeWidth="1"/>
      <path d="M14 8V14" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <path d="M26 8V14" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="28" cy="28" r="7.5" stroke="currentColor" strokeWidth="1" fill="none"/>
      <path d="M28 24.5V28H31.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </IconWrapper>
);

// 메뉴 아이콘
export const MenuIcon = ({ isOpen, className = "" }) => (
  <div className={`w-10 h-10 relative flex flex-col items-center justify-center transition-all ${className}`}>
    <span className={`absolute w-8 h-[1px] bg-current transition-all duration-300 ${isOpen ? 'rotate-45' : '-translate-y-2.5'}`} />
    <span className={`absolute w-8 h-[1px] bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
    <span className={`absolute w-8 h-[1px] bg-current transition-all duration-300 ${isOpen ? '-rotate-45' : 'translate-y-2.5'}`} />
  </div>
);