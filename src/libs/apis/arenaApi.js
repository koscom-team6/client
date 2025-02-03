import { apiInstance } from './apiInstance';

/**
 * 퀴즈 가져오기
 * @param {string} sid 세션 ID
 * @returns {??}
 */
export const getArenaQuiz = async (sid) => {
    const params = {
        rivalId: 1,
        roomId: sid,
    }; // MOCK DATA
    let { data } = await apiInstance.get('/match', { params });
    return data;
};

export const sendMessageApi = async (message) => {
    apiInstance.post('/arena', message);
};
