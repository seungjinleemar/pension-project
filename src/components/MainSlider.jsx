import React, { useState, useEffect, useCallback, useRef } from 'react';
// 💡 이미지 구조에 근거한 정확한 경로: 현재 폴더(./) 안의 common 폴더
import { BackIcon, NextIcon } from './common/Icons'; 

const SliderButton = ({ direction, onClick, Icon }) => {
  // 아이콘이 정상적으로 로드되지 않았을 경우를 대비한 체크
  if (!Icon) return null;

  return (
    <button
      onClick={onClick}
      type="button"
      className="group flex items-center justify-center transition-transform active:scale-95 focus:outline-none pointer-events-auto"
      aria-label={direction}
    >
      {/* Icons.jsx 내부 설정에 따라 모바일 40px, PC 80px로 자동 조절됨 */}
      <Icon color="white" />
    </button>
  );
};

const MainSlider = ({ data = [], interval = 5000 }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  }, [data.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  }, [data.length]);

  useEffect(() => {
    if (data.length > 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(nextSlide, interval);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [nextSlide, interval, data.length, current]);

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1280 : false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1280);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!data || data.length === 0) return null;

  const currentItem = data[current];

  return (
    <section className="relative w-full h-[60vh] xl:h-screen overflow-hidden bg-white">
      <div className="absolute inset-0">
        {data.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.imageUrl}
              alt="Slide Background"
              className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-out ${
                index === current ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 bg-black/20 z-20 pointer-events-none" />

      <div className="relative z-30 w-full max-w-[1600px] h-full mx-auto px-4 xl:px-10 pointer-events-none flex flex-col justify-end">
        <div className="ml-auto w-full xl:w-[640px] pointer-events-auto" 
              style={{ marginBottom: isMobile ? '24px' : '120px' }}>
          
          <div className="w-full flex justify-between items-end" 
                style={{ marginBottom: isMobile ? '16px' : '24px' }}>
            
            <div key={`text-${current}`} className="flex flex-col text-white text-left flex-1 mr-4 animate-fade-in-up">
              <p className="text-eng-title-sm !text-white uppercase"
                 style={{ 
                   fontSize: isMobile ? '16px' : '20px', 
                   marginBottom: isMobile ? '4px' : '8px' 
                 }}>
                {currentItem.topText}
              </p>
              <h2 className="leading-tight break-keep font-serif font-medium"
                  style={{ fontSize: isMobile ? '16px' : '24px' }}>
                {currentItem.bottomText}
              </h2>
            </div>

            {data.length > 1 && (
              <div className="flex items-center gap-[8px] xl:gap-[24px]">
                <SliderButton 
                  direction="Prev" 
                  onClick={prevSlide}
                  Icon={BackIcon}
                />
                <SliderButton 
                  direction="Next" 
                  onClick={nextSlide}
                  Icon={NextIcon}
                />
              </div>
            )}
          </div>

          {data.length > 1 && (
            <div className="w-full h-[1px] bg-white/20 relative overflow-hidden">
              <div 
                key={`progress-${current}`} 
                className="absolute top-0 left-0 h-full bg-white animate-progress"
                style={{ animationDuration: `${interval}ms` }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainSlider;