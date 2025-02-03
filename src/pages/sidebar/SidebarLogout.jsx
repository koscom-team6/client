import { useState } from 'react';
import { IoArrowForward } from 'react-icons/io5';
import { useShallow } from 'zustand/shallow';
import useAuthStore from '../../store/useAuthStore';

const SidebarLogout = () => {
    const { isAuthenticated, setAuth } = useAuthStore(
        useShallow((state) => ({
            isAuthenticated: state.isAuthenticated,
            setAuth: state.setAuth,
        }))
    );
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await setAuth({ username: username, password: password });
        } catch (error) {
            console.log(error);
            alert('아이디나 비밀번호를 다시 확인해주세요');
        }
    };

    return (
        <div className="flex-grow flex flex-col p-4">
            {/* 로그인 폼 */}
            <h2 className="text-lg text-[#595959] font-semibold mb-1">로그인</h2>
            <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-2 p-2 rounded-lg bg-[#E2E2E2] text-neutral border-none text-sm"
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 p-2 rounded-lg bg-[#E2E2E2] text-neutral border-none text-sm"
            />
            <div className="flex justify-between text-sm text-[#999999] mb-6">
                <div>
                    <p className="hover:underline text-sm" onClick={() => alert('아직 지원하지 않는 기능입니다.')}>
                        아이디·비밀번호 찾기
                    </p>
                    <p className="hover:underline text-sm" onClick={() => alert('아직 지원하지 않는 기능입니다.')}>
                        회원가입
                    </p>
                </div>

                <button onClick={handleLogin} className="btn btn-primary w-10 p-2 rounded-md">
                    <IoArrowForward size="52" />
                </button>
            </div>
        </div>
    );
};

export default SidebarLogout;
