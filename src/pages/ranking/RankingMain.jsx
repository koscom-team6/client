import { useState, useEffect } from 'react';
import { getCurrentTierImageSrc } from '../../libs/tier/tierHelper';
import { fetchRankings } from '../../libs/apis/rankingApi';
import useAuthStore from '../../store/useAuthStore';
import { useShallow } from 'zustand/shallow';

const RankingMain = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rankings, setRankings] = useState([]);
    const [totalPages, setTotalPages] = useState(2);
    const usersPerPage = 10;
    const { isAuthenticated, nickname } = useAuthStore(
        useShallow((state) => ({
            isAuthenticated: state.isAuthenticated,
            nickname: state.nickname,
        }))
    );

    useEffect(() => {
        const getRankings = async () => {
            try {
                const data = await fetchRankings(currentPage, usersPerPage);
                setRankings(data?.users || []);
                setTotalPages(Math.ceil((data?.totalCount || 0) / usersPerPage));
            } catch (error) {
                console.error('Error fetching rankings', error);
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

    const getRankingComponent = (index, currentPage, usersPerPage) => {
        const rank = index + 1 + (currentPage - 1) * usersPerPage;
        if (rank === 1) return <td className="px-4 py-2 w-[10%] text-accent">{rank}</td>;
        else if (rank === 2) return <td className="px-4 py-2 w-[10%] text-accent/80">{rank}</td>;
        else if (rank === 3) return <td className="px-4 py-2 w-[10%] text-accent/60">{rank}</td>;

        return <td className="px-4 py-2 w-[10%]">{rank}</td>;
    };

    return (
        <div className="min-h-screen flex flex-col items-start justify-start py-10 px-[4%]">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">랭킹</h2>
            <div className="w-full overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="text-neutral">
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
                                <tr key={index} className="hover:bg-primary/20 font-semibold">
                                    {getRankingComponent(index, currentPage, usersPerPage)}
                                    <td className="px-4 py-2 w-[50%] flex items-center">
                                        <img
                                            src={getCurrentTierImageSrc(user.score)}
                                            alt="Tier"
                                            className="w-8 h-8 mr-2"
                                        />
                                        <div className="avatar w-8 h-8">
                                            <img
                                                src={
                                                    user.imageUrl ||
                                                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                                                }
                                                className="mr-2 rounded-full"
                                                alt="profile"
                                            />
                                        </div>
                                        <div className="ml-2">{user.nickname}</div>
                                        {isAuthenticated && user.nickname === nickname ? (
                                            <div className="ml-8 badge badge-primary badge-xs">me</div>
                                        ) : (
                                            <></>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 w-[10%]">{user.score}</td>
                                    <td className="px-4 py-2 w-[10%]">{user.solvedCount}</td>
                                    <td className="px-4 py-2 w-[10%]">{user.winningCount}</td>
                                    <td className="px-4 py-2 w-[10%]">{user.solvedCount - user.winningCount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    랭킹 데이터가 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="join mt-4 self-center">
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
                        className={`btn btn-sm join-item ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
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
