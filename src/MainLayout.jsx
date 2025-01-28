import Sidebar from "./pages/sidebar/Sidebar";
import Home from "./pages/home/Home";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* 좌측 사이드바 */}
      <Sidebar />

      {/* 우측 메인 화면 */}
      <div className="ml-64 flex-1 bg-[#F7F6FB]">
        <Outlet/>
      </div>
    </div>
  );
};

export default MainLayout;
