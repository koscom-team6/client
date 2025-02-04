import { apiInstance } from './apiInstance';

/**
 * 매칭 요청 API
 * @param {string} username Redis Queue 등록을 위한 유저의 ID
 * @returns {string} playerId와 ResponseEntitiy.OK만 반환
 */
export async function matchingStart(token) {
    const { data } = await apiInstance.post('/matching', { token: token });

    return data;
}

/**
 * 유저 객체
 * @typedef {Object} MatchingResponse
 * @property {string} title 퀴즈 제목
 * @property {List<String>} tags 태그들
 * @property {string} content 퀴즈 상황에 대한 설명
 * @property {List<Object>} References
 */

/**
 * 유저 객체
 * @typedef {Object} References
 * @property {string} referType 레퍼런스 타입
 * @property {string} referText 레퍼런스 기사 제목
 * @property {string} referLink 레퍼런스 링크
 */

export async function matchingNews(token, sid) {
    console.log("token = ",token);
    console.log("sid = ",sid);
    try {
        const response = await apiInstance.get('/match', {
            params: { matchSessionId: sid },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("axios response = ", response);
        return response.data;
    } catch (error) {
        console.error("Error fetching match data:", error);
        throw error;
    }
}

