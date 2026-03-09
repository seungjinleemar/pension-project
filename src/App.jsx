import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header"; 
import Footer from "./components/common/Footer"; 
import MainPage from "./pages/Main/MainPage";
import AboutPage from "./pages/About/AboutPage";
import RoomPage from "./pages/Room/RoomPage";
import SpecialPage from "./pages/Special/SpecialPage";
import GuidePage from "./pages/Guide/GuidePage";
import { pensionService } from "./api/pensionService"; 

// 로딩 화면을 좀 더 부드럽게 (애니메이션 등 추가 가능)
const Loading = () => (
  <div className="flex h-screen items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
      <p className="font-nav text-sm tracking-widest uppercase opacity-50">Loading Experience</p>
    </div>
  </div>
);

function App() {
  const CO_ID = "staykkory"; 
  const [mainData, setMainData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // 1. 에러 상태 추가

  useEffect(() => {
    let isMounted = true; // 2. 메모리 누수 방지용 플래그

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await pensionService.getMainPageData(CO_ID);
        
        if (isMounted) {
          if (data) {
            setMainData(data);
          } else {
            setError(true);
          }
        }
      } catch (err) {
        console.error("데이터 로드 실패:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; }; // 언마운트 시 플래그 변경
  }, [CO_ID]);

  // 에러 발생 시 처리
  if (error) return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-gray-500">데이터를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
    </div>
  );

  if (loading) return <Loading />;

  return (
    <Router>
      {/* flex flex-col min-h-screen: 
        푸터를 바닥에 붙이기 위한 필수 설정입니다. 
      */}
      <div className="min-h-screen flex flex-col bg-white font-sans antialiased text-black">
        
        {/* 모든 페이지 상단 공통 헤더 */}
        <Header data={mainData} />
        
        {/* 메인 컨텐츠 영역 (flex-1): 
          남은 공간을 모두 차지하여 푸터가 화면 하단에 위치하도록 보장합니다.
        */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<MainPage co_id={CO_ID} data={mainData} />} />
            <Route path="/about" element={<AboutPage co_id={CO_ID} data={mainData} />} />
            
            {/* 객실 페이지: id 유무에 따른 통합 라우팅 */}
            <Route path="/room">
              <Route 
                index 
                element={<RoomPage rooms={mainData?.dbRooms || []} co_id={CO_ID} bannerData={mainData?.bannerData} />} 
              />
              <Route 
                path=":id" 
                element={<RoomPage rooms={mainData?.dbRooms || []} co_id={CO_ID} bannerData={mainData?.bannerData} />} 
              />
            </Route>

            {/* 부대시설 페이지: id 유무에 따른 통합 라우팅 */}
            <Route path="/special">
              <Route index element={<SpecialPage co_id={CO_ID} specials={mainData?.specialData || []} />} />
              <Route path=":id" element={<SpecialPage co_id={CO_ID} specials={mainData?.specialData || []} />} />
            </Route>

            <Route path="/guide" element={<GuidePage co_id={CO_ID} data={mainData} />} />
            
            {/* 잘못된 경로 접근 시 홈으로 리다이렉트 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* 모든 페이지 하단 공통 푸터 */}
        <Footer data={mainData} />
        
      </div>
    </Router>
  );
}

export default App;