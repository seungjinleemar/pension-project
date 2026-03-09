import React from "react";
import { useHeader } from "../hooks/useHeader";
import { ReservationIcon, MenuIcon } from "./common/Icons.jsx";

const Header = ({ data }) => {
  const {
    isScrolled,
    isOpen,
    setIsOpen,
    setIsHovered,
    menuData,
    handleNavigation,
    getHeaderBg,
    logoSrc,
    calendarURL,
    goHome,
  } = useHeader(data);

  if (!data || !menuData) return null;

  const FIXED_CHECK_URL = `https://calendar.marginauto.kr/bookingCheck?co_id=${data.co_id}`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-none outline-none ${getHeaderBg()} 
        ${isOpen ? "h-screen xl:h-auto shadow-lg" : "h-[64px] xl:h-20 overflow-hidden"}
        ${isScrolled && !isOpen ? "shadow-sm" : ""}`} // 스크롤 시 라인 대신 부드러운 그림자만 추가
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsOpen(false);
      }}
    >
      <div className="max-w-[1600px] mx-auto px-4 xl:px-10 relative flex flex-col h-full">
        <div className="flex items-center justify-between h-[64px] xl:h-20 flex-shrink-0">
          <div className="flex-shrink-0">
            <button onClick={goHome} className="block h-[40px] border-none outline-none">
              {logoSrc && (
                <img src={logoSrc} alt="Logo" className="h-[40px] w-auto object-contain" />
              )}
            </button>
          </div>

          <div className="hidden xl:flex items-center">
            <nav className="flex items-center">
              {Object.keys(menuData).map((item) => (
                <button
                  key={item}
                  onClick={() => 
                    ["About", "Guide"].includes(item) ? handleNavigation(item) : setIsOpen(!isOpen)
                  }
                  className="w-[140px] h-20 font-nav border-none outline-none"
                >
                  {item}
                </button>
              ))}
            </nav>
            <div className="w-[160px] flex justify-end ml-4">
              <button
                className={`btn-base transition-all duration-300 border-none
                  ${isScrolled || isOpen
                    ? "btn-header-scrolled hover:bg-black hover:text-white"
                    : "btn-header-top hover:bg-white hover:text-black"
                  }`}
                onClick={() => calendarURL ? window.open(calendarURL, "_blank") : alert("준비 중입니다.")}
              >
                예약하기
              </button>
            </div>
          </div>

          <div className="xl:hidden flex items-center gap-4">
            <button
              className="w-10 h-10 flex items-center justify-center border-none outline-none"
              onClick={() => calendarURL && window.open(calendarURL, "_blank")}
            >
              <ReservationIcon />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center border-none outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuIcon isOpen={isOpen} />
            </button>
          </div>
        </div>

        {/* 서브메뉴 영역 */}
        <div className={`transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <div className="hidden xl:flex justify-end pr-[176px] mt-[24px] pb-[40px]">
            {Object.keys(menuData).map((key) => (
              <div key={key} className="w-[140px] flex flex-col items-center">
                <ul className={`ds-submenu-list flex flex-col items-center gap-[12px] w-full
                    ${key === "Rooms" ? "max-h-[400px] overflow-y-auto no-scrollbar pb-4" : ""}`}>
                  {(menuData[key] || []).map((sub, idx) => {
                    const subName = typeof sub === "object" ? sub.name : sub;
                    return (
                      <li key={idx} className="w-full flex justify-center">
                        <button
                          onClick={() => subName === "예약조회" ? window.open(FIXED_CHECK_URL, "_blank") : handleNavigation(key, sub)}
                          className="ds-submenu-item block w-full text-center py-0 border-none outline-none"
                        >
                          <span className="inline-block align-top break-keep">{subName}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* 모바일 메뉴 */}
          <div className="xl:hidden flex items-start gap-x-4 pt-[40px] pb-[60px] h-[calc(100vh-64px)] overflow-hidden">
            <div className="flex-1 flex flex-col gap-y-[32px] overflow-y-auto no-scrollbar pb-10">
              {["About", "Special", "Guide", "Reservation"].map((key) => (
                <div key={key} className="flex flex-col items-center text-center">
                  <h2 className="ds-menu-title !mb-[16px] opacity-40 uppercase !text-[20px] tracking-widest">{key}</h2>
                  <ul className="ds-submenu-list gap-[8px] items-center">
                    {(menuData[key] || []).map((sub, idx) => {
                      const subName = typeof sub === "object" ? sub.name : sub;
                      return (
                        <li key={idx}>
                          <button
                            onClick={() => subName === "예약조회" ? window.open(FIXED_CHECK_URL, "_blank") : handleNavigation(key, sub)}
                            className="ds-submenu-item text-center border-none outline-none"
                          >
                            {subName}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex-1 flex flex-col h-full items-center">
              <h2 className="ds-menu-title !mb-[16px] text-center opacity-40 uppercase !text-[20px] tracking-widest">Rooms</h2>
              <ul className="ds-submenu-list gap-[8px] items-center overflow-y-auto no-scrollbar max-h-[60vh] pb-10">
                {(menuData.Rooms || []).map((room, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => handleNavigation("Rooms", room)}
                      className="ds-submenu-item text-center font-bold !text-black border-none outline-none"
                    >
                      {room.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;