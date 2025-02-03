// api/rankingApi.js
import { apiInstance } from "./apiInstance";

/**
 * 랭킹 API
 * @returns {users, totalCount} 유저 목록과 전체 유저 수 반환
 */

/**
 * 유저 객체
 * @typedef {Object} UserRankingResponse
 * @property {string} nickname 닉네임
 * @property {number} score 현재 랭크 포인트
 * @property {number} solvedCount 푼 문제 수
 * @property {number} winningCount 승리 수
 * @property {string} imageUrl 프로필 이미지 URL
 * @property {number} totalCount 총 경기 수
 */

export const fetchRankings = async (page, usersPerPage) => {
  try {
    const response = await apiInstance.get(`/api/ranking?page=${page-1}&size=${usersPerPage}`);
    console.log("response = ",response);
    return {
      users: response.data.content,  // Page 객체의 content 가져오기
      totalCount: response.data.totalElements,  // 전체 데이터 개수
    };
  } catch (error) {
    console.error("Failed to fetch rankings", error);
    return { users: [], totalCount: 0 };
  }
};
