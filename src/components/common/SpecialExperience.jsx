import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LinkButton from './LinkButton';

const SpecialItem = ({ item, isReverse, co_id }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);
  const navigate = useNavigate();

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
    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  const mainImg = item.images?.[0] || "";
  const subImg = item.images?.[1] || mainImg;

  // 💡 수정된 클릭 이벤트 핸들러
  const handleMove = () => {
    if (item.link) {
      // 데이터에 특정 커스텀 링크가 있는 경우 해당 경로로 이동
      navigate(item.link);
    } else {
      // App.js의 <Route path="/special/:id" /> 설정에 맞춰 경로 생성
      // 결과: /special/huttopia
      navigate(`/special/${co_id}`);
    }
  };

  return (
    <div ref={itemRef} className="flex flex-col w-full">
      {/* 1. 이미지 영역 */}
      <div className={`w-full flex flex-col md:flex-row gap-[16px] md:gap-[48px] items-start transition-all duration-[1200ms] delay-200 ease-out ${
        isReverse ? 'md:flex-row-reverse' : 'flex-row'
      } ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-[1.02]'}`}>
        
        <div className="w-full md:flex-1 aspect-[328/248] md:aspect-auto md:h-[584px] overflow-hidden bg-gray-100">
          {mainImg && <img src={mainImg} alt={item.title} className="w-full h-full object-cover" />}
        </div>
        
        <div className="hidden md:block w-[520px] h-[584px] overflow-hidden shrink-0 bg-gray-50">
          {subImg && <img src={subImg} alt={item.title} className="w-full h-full object-cover" />}
        </div>
      </div>

      {/* 2. 텍스트 영역 */}
      <div className={`w-full mt-[16px] md:mt-[24px] flex flex-col transition-all duration-[1000ms] delay-500 ease-out ${
        isReverse ? 'items-start text-left' : 'items-end text-right'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="flex flex-col">
          <h3 className="font-serif font-normal text-[20px] md:text-[24px] leading-[1.4] text-[#333]">
            {item.title}
          </h3>
          <p className="font-serif font-normal text-[12px] md:text-[14px] leading-[1.4] text-[#A8A8A8] italic uppercase tracking-wider">
            {item.subTitle}
          </p>
        </div>
        
        <p className="font-serif text-[14px] md:text-[16px] leading-[1.6] text-[#6B6B6B] mt-[16px] max-w-[600px] 
          whitespace-pre-line break-all
          overflow-hidden display-[-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] line-clamp-2">
          {item.desc}
        </p>

        <div className="mt-[24px]">
          <LinkButton 
            text="MoreView" 
            onClick={handleMove} 
          />
        </div>
      </div>
    </div>
  );
};

const SpecialExperience = ({ data, co_id }) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section className="w-full pt-[16px] pb-[48px] md:py-[120px] bg-[var(--color-brown-100)] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-[16px]">
        <div className="flex flex-col gap-[80px] md:gap-[120px]">
          {data.map((item, index) => (
            <SpecialItem 
              key={item.id || index} 
              item={item} 
              co_id={co_id}
              isReverse={index % 2 !== 0} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialExperience;