import { apiInstance } from './apiInstance';


/**
 * 매칭 요청 API
 * @param {string} username Redis Queue 등록을 위한 유저의 ID
 * @returns {string} playerId와 ResponseEntitiy.OK만 반환
 */
export async function matchingTest(playerId) {
    const { data } = await apiInstance.post('/matching', { playerId: playerId});

    return data;
}