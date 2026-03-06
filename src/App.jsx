import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header"; 
import Footer from "./components/common/Footer"; // 1. 푸터 임포트
import MainPage from "./pages/Main/MainPage";
import AboutPage from "./pages/About/AboutPage";
import RoomPage from "./pages/Room/RoomPage";
import SpecialPage from "./pages/Special/SpecialPage";
import GuidePage from "./pages/Guide/GuidePage";
import { pensionService } from "./api/pensionService"; 

const Loading = () => <div className="flex h-screen items-center justify-center font-bold">로딩 중...</div>;

function App() {
  const CO_ID = "huttopia"; 
  const [mainData, setMainData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pensionService.getMainPageData(CO_ID);
        console.log("App 로드 데이터:", data);
        if (data) setMainData(data);
      } catch (err) {
        console.error("로드 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white"> {/* flex-col 추가: 푸터를 하단에 고정하기 용이함 */}
        
        {/* 모든 페이지 상단 공통 헤더 */}
        <Header data={mainData} />
        
        {/* 컨텐츠 영역: flex-1을 주어 푸터가 항상 아래에 있게 함 */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<MainPage co_id={CO_ID} data={mainData} />} />
            <Route path="/about" element={<AboutPage co_id={CO_ID} data={mainData} />} />
            
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

            <Route path="/special">
              <Route index element={<SpecialPage co_id={CO_ID} specials={mainData?.specialData || []} />} />
              <Route path=":id" element={<SpecialPage co_id={CO_ID} specials={mainData?.specialData || []} />} />
            </Route>

            <Route path="/guide" element={<GuidePage co_id={CO_ID} data={mainData} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* 2. 모든 페이지 하단 공통 푸터 */}
        {/* mainData를 넘겨주면 Footer 내부에서 bizInfo, tel 등을 자동으로 뿌려줍니다. */}
        <Footer data={mainData} />
        
      </div>
    </Router>
  );
}

export default App;