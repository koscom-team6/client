import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import home_empty from '../../assets/sidebar/home_empty.png';
import codesandbox_empty from '../../assets/sidebar/codesandbox_empty.png';
import archive_empty from '../../assets/sidebar/archive_empty.png';
import char_empty from '../../assets/sidebar/char_empty.png';
import user_empty from '../../assets/sidebar/user_empty.png';
import logout_empty from '../../assets/sidebar/logout_empty.png';
import guest from '../../assets/sidebar/guest.png';
import { useShallow } from 'zustand/shallow';
import { getNextTierRestScore } from '../../libs/tier/tierHelper.js';

const SidebarLogin = () => {
    const navigate = useNavigate();
    const { setLogout, nickname, score, tierImageSrc, profileSrc } = useAuthStore(
        useShallow((state) => ({
            setLogout: state.setLogout,
            nickname: state.nickname,
            score: state.score,
            tierImageSrc: state.tierImageSrc,
            profileSrc: state.profileSrc,
        }))
    );

    return (
        <div className="flex flex-col items-center p-4 h-full">
            {/* 프로필 섹션 */}
            <div className="flex flex-col items-center mb-6 mt-10">
                <img src={profileSrc} alt="프로필 사진" className="w-24 h-24 rounded-full mb-2 bg-[#FFFFFF]" />
                <h2 className="text-lg font-bold text-[#3B3B3B]">{nickname}</h2>
                <div className="flex items-center gap-3 mb-1">
                    <img className="h-5" src={tierImageSrc} />
                    <span className="text-neutral text-md">{score}</span>
                </div>
                <p className="text-xs text-gray-400">다음 랭크까지 {getNextTierRestScore(score)}점 남았어요</p>
            </div>

            {/* 메뉴 섹션 */}
            <nav className="w-full">
                <ul className="space-y-3">
                    <li
                        className="flex items-center px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        <img src={home_empty} alt="홈 아이콘" className="w-4 h-4 rounded-lg mr-2" />
                        <span className="text-[#3B3B3B]">홈</span>
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 rounded cursor-pointer">
                        <img src={archive_empty} alt="연습문제 아이콘" className="w-4 h-4 rounded-lg mr-2" />
                        <span className="text-[#999999]">연습문제</span>
                    </li>
                    <li
                        className="flex items-center px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => navigate('/arena')}
                    >
                        <img src={codesandbox_empty} alt="아레나 아이콘" className="w-4 h-4 rounded-lg mr-2" />
                        <span className="text-[#999999]">아레나</span>
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 rounded cursor-pointer">
                        <img src={char_empty} alt="랭크 아이콘" className="w-4 h-4 rounded-lg mr-2" />
                        <span className="text-[#999999]">랭크</span>
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 rounded cursor-pointer">
                        <img src={user_empty} alt="마이페이지 아이콘" className="w-4 h-4 rounded-lg mr-2" />
                        <span className="text-[#999999]">마이페이지</span>
                    </li>
                </ul>
            </nav>

            {/* 로그아웃 섹션 */}
            <div
                className="flex items-center justify-center w-full mt-auto mb-[15px] cursor-pointer hover:text-gray-700 text-[#999999]"
                onClick={setLogout}
            >
                <img src={logout_empty} alt="로그아웃 아이콘" className="w-4 h-4 mr-2" />
                <p className="text-center">로그아웃</p>
            </div>
        </div>
    );
};

export default SidebarLogin;
