import Sidebar from '../components/home/Sidebar';
import Home from '../components/home/HomeComponent';

const HomeView = () => {
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

export default HomeView;
