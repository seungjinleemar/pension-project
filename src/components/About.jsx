import React, { useEffect, useRef, useState } from 'react';
import LinkButton from './common/LinkButton';

// 💡 calendarURL prop 추가
const About = ({ title = "About", imageUrl = "", description = "", calendarURL = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 💡 버튼 클릭 시 실행될 함수
  const handleReservation = () => {
    if (calendarURL) {
      window.open(calendarURL, '_blank');
    } else {
      console.warn("Reservation URL is missing.");
    }
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#F5F3EF] py-[64px] xl:py-[120px] flex justify-center overflow-hidden">
      <div className="w-full max-w-[1488px] px-4 xl:px-[24px] flex flex-col">
        <div className={`w-full flex justify-between items-center mb-[16px] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="font-serif text-[20px] md:text-[32px] uppercase">{title}</h3>
          {/* 💡 onClick 이벤트 연결 */}
          <LinkButton text="Reservation" onClick={handleReservation} />
        </div>

        <div className="w-full flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8">
          <div className={`relative w-full xl:w-[60%] aspect-[866/520] bg-gray-100 overflow-hidden transition-all duration-[1200ms] delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            {imageUrl ? (
              <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 animate-pulse" />
            )}
          </div>
          <div className={`flex-1 text-right transition-all duration-[1200ms] delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="font-serif text-[#444] whitespace-pre-line leading-[1.8] text-[14px] xl:text-[16px]">
              {description || "등록된 소개 정보가 없습니다."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;