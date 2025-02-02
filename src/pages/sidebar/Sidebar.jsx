import useAuthStore from "../../store/authStore";
import SidebarLogin from "./SidebarLogin";
import SidebarLogout from "./SidebarLogout";
import Logo from '../../assets/Logo.png';

const Sidebar = () => {
  const { isLogin } = useAuthStore();

  return (
    <div
      className="w-64 h-screen bg-[#FFFFFF] text-white flex flex-col items-center fixed top-0 left-0"
      style={{ paddingTop: '15px' }}
    >
      {/* 로고와 텍스트 */}
      <div className="flex items-center mt-[15px]">
        <img src={Logo} alt="Kinda Logo" className="w-10 h-10 rounded-lg mr-2" />
        <h1 className="text-2xl font-bold text-[#3B3B3B]" style={{ fontSize: '37px' }}>
          KoStarter
        </h1>
      </div>

      {isLogin ? <SidebarLogin /> : <SidebarLogout />}
    </div>
  );
};

export default Sidebar;
