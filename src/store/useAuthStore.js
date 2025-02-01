import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login } from '../libs/apis/authApi';
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
            setAuth: ({ email, password }) => {
                const user = login(email, password);

                set({
                    nickname: user.nickname,
                    score: user.score,
                    token: user.token,
                    isAuthenticated: true,
                    tierImageSrc: getCurrentTierImageSrc(score),
                    profileSrc: user.profileSrc,
                });
            },
            setLogout: () =>
                set({ nickname: '', score: 0, token: '', isAuthenticated: false, tierImageSrc: '', profileSrc: '' }),
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
