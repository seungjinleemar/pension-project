import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const useHeader = (data) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 💡 데이터 로드 시 menuData 생성
  const menuData = useMemo(() => {
    if (!data) return null;

    const header = data?.headerInfo || {};
    const nav = header.navigation || data?.navigation || data || {};

    if (!nav.roomList && !nav.specialList) return null;

    return {
      About: ["펜션소개"],
      // PC 환경 Rooms 리스트 15개 제한 (Header.jsx에서 10개 높이 스크롤 제어와 연동)
      Rooms: (nav.roomList || []).slice(0, 15).map((r) => ({
        id: r.id || r.room_idx,
        name: r.name || r.room_name,
      })),
      Special: (nav.specialList || []).map((s) => ({
        id: s.id || s.special_idx,
        name: s.name || s.special_name,
      })),
      Guide: ["종합이용안내"],
      Reservation: ["예약하기", "예약조회"],
    };
  }, [data]);

  // 스크롤 감지 (50px 이상 스크롤 시 상태 변경)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 모바일 메뉴 열릴 시 본문 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const goHome = () => {
    navigate("/");
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  const handleNavigation = (key, subItem) => {
    const header = data?.headerInfo || {};
    const bookingUrl = header.calendarURL || data?.footerInfo?.bookingLinks?.mmax;

    if (key === "About") { 
      navigate("/about"); 
    } 
    else if (key === "Rooms" && subItem?.id) { 
      navigate(`/room/${subItem.id}`); 
    } 
    else if (key === "Special" && subItem?.id) { 
      navigate(`/special/${subItem.id}`); 
    } 
    else if (key === "Guide") { 
      navigate("/guide"); 
    } 
    else if (key === "Reservation" && subItem === "예약하기" && bookingUrl) {
      window.open(bookingUrl, "_blank");
    } else {
      const target = typeof subItem === "object" ? subItem.name : subItem;
      window.location.hash = target;
    }
    setIsOpen(false);
  };

  /**
   * 💡 배경 제어 함수
   * CSS @theme에 정의된 투명도 변수(--color-white80, --color-black40 등)를 직접 참조합니다.
   */
  const getHeaderBg = () => {
    // 1. 메뉴가 열렸을 때: 정의된 beige-03 (#F5F3EA) 또는 brown-100 사용
    if (isOpen) return "bg-beige-03 text-black"; 
    
    // 2. 스크롤 시: 정의된 white80 (rgba 0.8) 사용 및 블러 제거
    if (isScrolled) return "bg-white80 text-black border-b border-black20"; 
    
    // 3. 마우스 호버 시: 정의된 black40 (rgba 0.4) 사용 (블러 절대 없음)
    if (isHovered) return "bg-black40 text-white"; 
    
    // 4. 기본 상태: 투명
    return "bg-transparent text-white"; 
  };

  const header = data?.headerInfo || {};

  return {
    isScrolled, isOpen, setIsOpen, isHovered, setIsHovered,
    menuData, handleNavigation, getHeaderBg, goHome,
    logoSrc: header.logo || data?.logoURL,
    calendarURL: header.calendarURL || data?.footerInfo?.bookingLinks?.mmax,
  };
};