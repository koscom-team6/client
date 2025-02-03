import { useState, useEffect } from "react";
import { getCurrentTierImageSrc } from "../../libs/tier/tierHelper";
import { fetchRankings } from "../../libs/apis/rankingApi";

const RankingMain = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rankings, setRankings] = useState([]);
  const [totalPages, setTotalPages] = useState(2);
  const usersPerPage = 10;

  useEffect(() => {
    const getRankings = async () => {
      try {
        const data = await fetchRankings(currentPage, usersPerPage);
        setRankings(data?.users || []);
        setTotalPages(Math.ceil((data?.totalCount || 0) / usersPerPage));
      } catch (error) {
        console.error("Error fetching rankings", error);
        setRankings([]);
      }
    };
    getRankings();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7FC] flex flex-col items-center py-10 px-[15%]">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">랭킹</h2>
      <div className="w-full overflow-x-auto">
        <table className="table w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left w-[10%]">순위</th>
              <th className="px-4 py-2 text-left w-[50%]">유저</th>
              <th className="px-4 py-2 text-left w-[10%]">점수</th>
              <th className="px-4 py-2 text-left w-[10%]">푼 문제 수</th>
              <th className="px-4 py-2 text-left w-[10%]">승</th>
              <th className="px-4 py-2 text-left w-[10%]">패</th>
            </tr>
          </thead>
          <tbody>
            {rankings.length > 0 ? (
              rankings.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 w-[10%]">{index + 1 + (currentPage - 1) * usersPerPage}</td>
                  <td className="px-4 py-2 w-[50%] flex items-center">
                    <img src={getCurrentTierImageSrc(user.score)} alt="Tier" className="w-8 h-8 mr-2" />
                    <img src={user.imageUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} className="w-8 h-8 mr-2" alt="profile"/>
                    {user.nickname}
                  </td>
                  <td className="px-4 py-2 w-[10%]">{user.score}</td>
                  <td className="px-4 py-2 w-[10%]">{user.solvedCount}</td>
                  <td className="px-4 py-2 w-[10%]">{user.winningCount}</td>
                  <td className="px-4 py-2 w-[10%]">{user.totalCount - user.winningCount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">랭킹 데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="join mt-4">
        <button
          className="btn btn-sm join-item"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt; Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`btn btn-sm join-item ${currentPage === i + 1 ? "btn-primary" : "btn-outline"}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn btn-sm join-item"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default RankingMain;
