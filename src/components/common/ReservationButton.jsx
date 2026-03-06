import React from 'react';

const ReservationButton = ({ text = "Reservation", onClick, className = "" }) => {
  return (
    <button 
      onClick={onClick} // 💡 이 부분이 반드시 있어야 클릭 이벤트가 작동합니다.
      className={`
        w-auto h-[56px] px-[48px] 
        flex items-center justify-center 
        font-serif font-normal text-[20px] leading-[1.4] text-white
        bg-[#555] hover:bg-[#333] transition-all duration-300
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default ReservationButton;