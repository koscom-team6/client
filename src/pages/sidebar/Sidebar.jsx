import useAuthStore from '../../store/useAuthStore';
import SidebarLogin from './SidebarLogin';
import SidebarLogout from './SidebarLogout';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as KoStarter } from '../../assets/KoStarter.svg';
import { useShallow } from 'zustand/shallow';

const Sidebar = () => {
    const { isAuthenticated } = useAuthStore(
        useShallow((state) => ({
            isAuthenticated: state.isAuthenticated,
        }))
    );

    return (
        <div
            className="w-64 h-screen bg-[#FFFFFF] text-white flex flex-col items-center fixed top-0 left-0"
            style={{ paddingTop: '15px' }}
        >
            {/* 로고와 텍스트 */}
            <a href="/" className="flex my-4 items-center justify-center items-center h-8 gap-2">
                <Logo className="w-6" />
                <KoStarter className="w-30" />
            </a>

            {isAuthenticated ? <SidebarLogin /> : <SidebarLogout />}
        </div>
    );
};

export default Sidebar;
