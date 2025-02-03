import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getAuthInfo, login } from '../libs/apis/authApi';
import { getCurrentTierImageSrc } from '../libs/tier/tierHelper';

const useAuthStore = create(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            nickname: '',
            score: 0,
            tierImageSrc: '',
            profileSrc: '',
            token: '',
            /**
             * 로그인 후 auth 세팅
             * @param {string} email 유저 이메일
             * @param {string} password 유저 패스워드
             */
            setAuth: async ({ username, password }) => {
                const token = await login(username, password);
                const user = await getAuthInfo(token);

                set({
                    nickname: user.nickname,
                    score: user.score,
                    token: token,
                    isAuthenticated: true,
                    tierImageSrc: getCurrentTierImageSrc(user.score),
                    profileSrc: user.image,
                });
            },
            setLogout: () =>
                set({ nickname: '', score: 0, token: '', isAuthenticated: false, tierImageSrc: '', profileSrc: '' }),
            updateUser: async () => {
                const user = await getAuthInfo(get().token);
                set({
                    nickname: user.nickname,
                    score: user.score,
                    isAuthenticated: true,
                    tierImageSrc: getCurrentTierImageSrc(user.score),
                    profileSrc: user.image,
                });
            },
            addScore: (score) =>
                set({
                    score: get().score + score,
                    tierImageSrc: getCurrentTierImageSrc(get().score + score),
                }),
        }),
        { name: 'auth' }
    )
);

export default useAuthStore;
