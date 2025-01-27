import Sidebar from "./pages/sidebar/Sidebar";
import Home from "./pages/home/HomeComponent";
const MainLayout = () => {
  return (
    <div className="flex min-h-screen items-start">
      {/* 좌측 사이드바 */}
      <Sidebar />

      {/* 우측 메인 화면 */}
      <div className="flex-grow flex justify-center items-start">
        <Home />
      </div>
    </div>
  );
};

export default MainLayout;
