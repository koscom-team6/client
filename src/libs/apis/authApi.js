import { apiInstance } from './apiInstance';

/**
 * 유저 객체
 * @typedef {Object} User
 * @property {string} nickname 닉네임
 * @property {number} score 총점수
 * @property {string} image 프로필 이미지 주소
 */

/**
 * 로그인 API
 * @param {string} username 로그인을 위한 아이디
 * @param {string} password 로그인을 위한 패스워드
 * @returns {string} 유저와 토큰 반환
 */
export async function login(username, password) {
    const requestBody = {
        username: username,
        password: password,
    };

    let { headers } = await apiInstance.post('/login', requestBody);
    return headers.authorization.replace('Bearer ', '');
}

/**
 * 토큰을 기반으로 유저 정보 불러오기
 * @param {string} token 토큰
 * @returns {User} 유저 객체 반환
 */
export async function getAuthInfo(token) {
    const { data } = await apiInstance.post('/user', { token: token });
    return data;
}
