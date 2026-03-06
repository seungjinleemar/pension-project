import React, { useEffect, useRef, useState } from 'react';

const StripBanner = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // 데이터가 아예 없거나 비어있는 경우 방어 코드
  if (!data) return null;

  // 💡 데이터 키값 확인: 만약 API에서 desc1 대신 다른 이름을 쓴다면 이 부분을 수정해야 합니다.
  // 기본값을 빈 문자열("")로 설정하여 undefined 오류를 방지합니다.
  const { 
    image_url, 
    title1 = "", 
    title2 = "", 
    desc1 = "", 
    desc2 = "" 
  } = data;

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

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 bg-[var(--color-brown-100)] overflow-hidden">
      {/* 1. 이미지 영역 */}
      <div className={`w-full h-[264px] md:h-[496px] relative overflow-hidden transition-all duration-[1500ms] ease-out
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
      `}>
        {image_url && (
          <img 
            src={image_url} 
            alt="Banner" 
            className="w-full h-full object-cover shadow-xl" 
          />
        )}
        <div className="absolute inset-0 bg-black/[0.02] pointer-events-none" />
      </div>

      {/* 2. 텍스트 컨테이너 */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-20">
        <div className="relative z-10 -mt-[26px] md:-mt-9">
          <div className={`flex flex-col items-start transition-all duration-[1000ms] delay-300 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}>
            
            {/* 타이틀 영역 */}
            <div className="flex flex-col font-serif text-[var(--color-black)] leading-[1.4]">
              {title1 && (
                <div className="text-[20px] md:text-[32px] font-normal break-keep">
                  {title1}
                </div>
              )}
              {title2 && (
                <div className="text-[20px] md:text-[32px] font-normal opacity-90 break-keep">
                  {title2}
                </div>
              )}
            </div>

            {/* 설명 영역 (한글 출력 최적화) */}
            <div className="mt-4 flex flex-col font-sans leading-[1.4]">
              {/* 💡 1. uppercase 제거: 한글이 변형되는 것을 방지 
                  💡 2. tracking-normal: 한글 자간을 표준으로 설정 
                  💡 3. break-keep: 한글 단어가 중간에 끊기지 않도록 함 */}
              {desc1 && (
                <div className="text-[14px] md:text-[16px] font-light text-[var(--color-gray-500)] tracking-normal break-keep">
                  {desc1}
                </div>
              )}
              {desc2 && (
                <div className="text-[14px] md:text-[16px] font-light text-[var(--color-gray-500)] tracking-normal break-keep mt-1">
                  {desc2}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default StripBanner;