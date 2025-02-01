import { apiInstance } from './apiInstance';

/**
 * 유저 객체
 * @typedef {Object} UserWithToken
 * @property {string} nickname 닉네임
 * @property {number} score 총점수
 * @property {string} token 토큰
 * @property {string} profileSrc 프로필 이미지 주소
 */

/**
 * 로그인 API
 * @param {string} username 로그인을 위한 아이디
 * @param {string} password 로그인을 위한 패스워드
 * @returns {UserWithToken} 유저와 토큰 객체 반환
 */
export async function login(username, password) {
    const { data } = await apiInstance.post('/login', { username: username, password: password });

    return data;
}
