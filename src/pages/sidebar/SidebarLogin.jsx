import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import home_empty from '../../assets/sidebar/home_empty.png';
import home_hover from '../../assets/sidebar/home_hover.png';
import codesandbox_empty from '../../assets/sidebar/codesandbox_empty.png';
import codesandbox_hover from '../../assets/sidebar/codesandbox_hover.png';
import archive_empty from '../../assets/sidebar/archive_empty.png';
import archive_hover from '../../assets/sidebar/archive_hover.png';
import char_empty from '../../assets/sidebar/char_empty.png';
import char_hover from '../../assets/sidebar/char_hover.png';
import user_empty from '../../assets/sidebar/user_empty.png';
import user_hover from '../../assets/sidebar/user_hover.png';
import logout_empty from '../../assets/sidebar/logout_empty.png';
import { useShallow } from 'zustand/shallow';
import { getNextTierRestScore } from '../../libs/tier/tierHelper.js';
import { useEffect, useState } from 'react';

const SidebarLogin = () => {
    const [currentPathname, setCurrentPathname] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setCurrentPathname(location.pathname);
    }, [location]);

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

    const menus = [
        { title: '홈', focusSrc: home_hover, unfocusSrc: home_empty, link: '/', enable: true },
        { title: '연습문제', focusSrc: archive_hover, unfocusSrc: archive_empty, link: '/practice', enable: false },
        { title: '아레나', focusSrc: codesandbox_hover, unfocusSrc: codesandbox_empty, link: '/arena', enable: true },
        { title: '랭크', focusSrc: char_hover, unfocusSrc: char_empty, link: '/ranking', enable: true },
        { title: '마이페이지', focusSrc: user_hover, unfocusSrc: user_empty, link: '/my-page', enable: false },
    ];

    const navigateIfEnable = (enable, link) => {
        if (enable) {
            navigate(link);
        } else {
            alert('아직 오픈되지 않은 기능입니다');
        }
    };

    const getCurrentMenu = (menu, index, currentPathname) => {
        if (!currentPathname) return <></>;

        // home 만 특별하게 처리
        if (menu.link === '/') {
            if (currentPathname === '/') {
                return (
                    <li
                        key={index}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => navigateIfEnable(menu.enable, menu.link)}
                    >
                        <img src={menu.focusSrc} alt="메뉴 아이콘" className="w-4 h-4 rounded-lg mr-2" />
                        <span className="text-[#3B3B3B]">{menu.title}</span>
                    </li>
                );
            } else {
                return (
                    <li
                        key={index}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => navigateIfEnable(menu.enable, menu.link)}
                    >
                        <img src={menu.unfocusSrc} alt="메뉴 아이콘" className="w-4 h-4 rounded-lg mr-2" />
                        <span className="text-[#999999]">{menu.title}</span>
                    </li>
                );
            }
        }

        if (currentPathname.startsWith(menu.link)) {
            return (
                <li
                    key={index}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => navigateIfEnable(menu.enable, menu.link)}
                >
                    <img src={menu.focusSrc} alt="메뉴 아이콘" className="w-4 h-4 rounded-lg mr-2" />
                    <span className="text-[#3B3B3B]">{menu.title}</span>
                </li>
            );
        }

        return (
            <li
                key={index}
                className="flex items-center px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => navigateIfEnable(menu.enable, menu.link)}
            >
                <img src={menu.unfocusSrc} alt="메뉴 아이콘" className="w-4 h-4 rounded-lg mr-2" />
                <span className="text-[#999999]">{menu.title}</span>
            </li>
        );
    };

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
                <ul className="space-y-3">{menus.map((e, i) => getCurrentMenu(e, i, currentPathname))}</ul>
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
