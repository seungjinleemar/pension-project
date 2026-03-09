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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${getHeaderBg()} 
        ${isOpen ? "h-screen xl:h-auto" : "h-[64px] xl:h-20 overflow-hidden"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsOpen(false);
      }}
    >
      <div className="max-w-[1600px] mx-auto px-4 xl:px-10 relative flex flex-col h-full">
        {/* 메인 헤더 바 */}
        <div className="flex items-center justify-between h-[64px] xl:h-20 flex-shrink-0">
          <div className="flex-shrink-0">
            <button onClick={goHome} className="block h-[40px]">
              {logoSrc && (
                <img
                  src={logoSrc}
                  alt="Logo"
                  className="h-[40px] w-auto object-contain"
                />
              )}
            </button>
          </div>

          {/* 데스크탑 네비게이션: CSS .font-nav 활용 */}
          <div className="hidden xl:flex items-center">
            <nav className="flex items-center">
              {Object.keys(menuData).map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    item === "About" || item === "Guide"
                      ? handleNavigation(item)
                      : setIsOpen(!isOpen)
                  }
                  className="w-[140px] h-20 font-nav"
                >
                  {item}
                </button>
              ))}
            </nav>
            <div className="w-[160px] flex justify-end ml-4">
              <button
                className={`btn-base transition-all duration-300
                  ${
                    isScrolled || isOpen
                      ? "btn-header-scrolled hover:bg-black hover:text-white"
                      : "btn-header-top hover:bg-white hover:text-black"
                  }`}
                onClick={() =>
                  calendarURL
                    ? window.open(calendarURL, "_blank")
                    : alert("준비 중입니다.")
                }
              >
                예약하기
              </button>
            </div>
          </div>

          {/* 모바일 아이콘 영역 */}
          <div className="xl:hidden flex items-center gap-4">
            <button
              className="w-10 h-10 flex items-center justify-center"
              onClick={() => calendarURL && window.open(calendarURL, "_blank")}
            >
              <ReservationIcon />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuIcon isOpen={isOpen} />
            </button>
          </div>
        </div>

        {/* 서브메뉴 섹션: CSS .ds-submenu-item 활용 */}
        <div
          className={`transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          {/* 1. 데스크탑 서브메뉴 */}
          <div
            className={`transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <div className="hidden xl:flex justify-end pr-[176px] mt-[24px] pb-[40px]">
              {Object.keys(menuData).map((key) => (
                <div key={key} className="w-[140px] flex flex-col items-center">
                  {/* 💡 핵심: justify-start를 추가하여 스크롤 박스 내부에서도 무조건 상단부터 시작하게 함 */}
                  <ul
                    className={`ds-submenu-list flex flex-col items-center justify-start gap-[12px] w-full
          ${key === "Rooms" ? "max-h-[400px] overflow-y-auto no-scrollbar pt-0 pb-4" : ""}`}
                  >
                    {(menuData[key] || []).map((sub, idx) => (
                      <li
                        key={idx}
                        className="w-full flex items-start justify-center"
                      >
                        <button
                          onClick={() => handleNavigation(key, sub)}
                          className="ds-submenu-item block w-full text-center leading-[1.2] py-0"
                        >
                          {/* 💡 white-space-normal을 주어 두 줄 처리를 허용하되 상단 밀착 */}
                          <span className="inline-block align-top break-keep">
                            {typeof sub === "object" ? sub.name : sub}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 2. 모바일 서브메뉴: CSS .ds-menu-title 활용 */}
          <div className="xl:hidden flex items-start gap-x-4 pt-[40px] pb-[60px] h-[calc(100vh-64px)] overflow-hidden">
            <div className="flex-1 flex flex-col gap-y-[32px] overflow-y-auto no-scrollbar pb-10">
              {["About", "Special", "Guide", "Reservation"].map((key) => (
                <div
                  key={key}
                  className="flex flex-col items-center text-center"
                >
                  <h2 className="ds-menu-title !mb-[16px] opacity-40 uppercase !text-[20px] tracking-widest">
                    {key}
                  </h2>
                  <ul className="ds-submenu-list gap-[8px] items-center">
                    {(menuData[key] || []).map((sub, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => handleNavigation(key, sub)}
                          className="ds-submenu-item text-center"
                        >
                          {typeof sub === "object" ? sub.name : sub}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex-1 flex flex-col h-full items-center">
              <h2 className="ds-menu-title !mb-[16px] text-center opacity-40 uppercase !text-[20px] tracking-widest">
                Rooms
              </h2>
              <ul className="ds-submenu-list gap-[8px] items-center overflow-y-auto no-scrollbar max-h-[60vh] pb-10">
                {(menuData.Rooms || []).map((room, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => handleNavigation("Rooms", room)}
                      className="ds-submenu-item text-center font-bold !text-black"
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
