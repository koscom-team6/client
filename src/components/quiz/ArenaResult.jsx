import { ReactComponent as WinSvg } from '../../assets/result/win.svg';
import { ReactComponent as LooseSvg } from '../../assets/result/loose.svg';
import { getCurrentTierImageSrc, getNextTierRestScore } from '../../libs/tier/tierHelper';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import useAuthStore from '../../store/useAuthStore';
import { useShallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

/**
 * 아레나 결과창, arena_result란 ID로 컨트롤 (디자인만 함)
 * @param {string} opponentProfile 상대방 프로필 이미지
 */

const ArenaResult = ({ title, opponentProfile, myResult, opponentResult, myUser, disconnect }) => {
    const { profileSrc, score } = useAuthStore(
        useShallow((state) => ({
            profileSrc: state.profileSrc,
            score: state.score,
        }))
    );

    const navigate = useNavigate();

    const [mr, setMr] = useState(null); // my result
    const [mu, setMu] = useState(null); // my user
    const [or, setOr] = useState(null); // opponent result

    useEffect(() => {
        setMr(myResult);
        setOr(opponentResult);
        setMu(myUser);
    }, [myResult, opponentResult, myUser]);

    const getDiffer = (score1, score2) => {
        if (score1 >= score2) return score1 - score2;
        return score2 - score1;
    };

    // 앞섰어요, 뒤졌어요 판독기
    const getBackForward = (score1, score2) => {
        console.log('3개가 잘 떠야함', mr, or, mu);

        if (score1 >= score2) return '앞섰어요';
        return '뒤졌어요';
    };

    const getSimpleFeedback = (myScore) => {
        if (myScore >= 85) return '이번 문제를 제대로 파악하고 있어요';
        if (myScore >= 75) return '조금 아쉬워요, 결과 분석을 확인하세요';
        if (myScore >= 65) return '금융 상식의 이해가 필요해요';
        return '문제를 아예 인지하지 못하고 있어요';
    };

    const isWin = (myScore, oppositeScore) => {
        if (myScore >= oppositeScore) return <WinSvg className="h-8" />;
        return <LooseSvg className="h-8" />;
    };

    const createAnalysisPath = (title, username, answer, feedback) => {
        return `${
            import.meta.env.VITE_CLIENT_HOST
        }/arena-result?title=${title}&user=${username}&answer=${answer}&feedback=${feedback}`;
    };

    return (
        <dialog id="arena_result" className="modal">
            <div className="modal-box w-380 flex flex-col items-center">
                {mr && or ? isWin(mr.score, or.score) : <WinSvg className="h-8" />}
                <div className="flex justify-between w-full items-center px-2 pt-4">
                    <div className="flex flex-col items-center">
                        <h1 className="text-8xl font-semibold">{mr ? mr.score : '?'}</h1>
                        <div className="text-sm text-[#999999]">
                            상대방보다
                            <span className="text-[#595959]">
                                {' '}
                                {mr && or ? getDiffer(mr.score, or.score) : '?'}점
                            </span>{' '}
                            {mr && or ? getBackForward(mr.score, or.score) : '?'}
                        </div>
                        <div className="text-sm text-[#999999]">{getSimpleFeedback(mr ? mr.score : 0)}</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex gap-2">
                            <img className="w-6" src={getCurrentTierImageSrc(mu ? score : 0)} />
                            <h1 className="text-4xl font-semibold relative">
                                {mu ? score : '?'}
                                <span className="absolute -right-4 -top-3 text-sm font-semibold">
                                    +{mu ? score - mu.score : 0}
                                </span>
                            </h1>
                        </div>

                        <div className="text-sm text-[#999999]">
                            다음랭크까지
                            <span className="text-[#595959]"> {getNextTierRestScore(mu ? score : 0)}점</span> 남았어요
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-full items-center px-2 pt-8">
                    <div className="flex gap-3">
                        <ArenaResultAvatar profile={profileSrc} />
                        <div
                            className="flex items-center"
                            onClick={() => {
                                window.open(
                                    mr
                                        ? createAnalysisPath(title, '나', mr.userAnswer, mr.aianswer)
                                        : import.meta.env.VITE_CLIENT_HOST + '/arena-result',
                                    '내 결과',
                                    'width=700px,height=800px,scrollbars=yes'
                                );
                            }}
                        >
                            <span className="text-sm">내 답변 분석</span>
                            <IoIosArrowForward />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div
                            className="flex items-center"
                            onClick={() => {
                                window.open(
                                    or
                                        ? createAnalysisPath(title, '상대방', or.userAnswer, or.aianswer)
                                        : import.meta.env.VITE_CLIENT_HOST + '/arena-result',
                                    '상대방 결과',
                                    'width=700px,height=800px,scrollbars=yes'
                                );
                            }}
                        >
                            <IoIosArrowBack />
                            <span className="text-sm">상대방 답변 분석</span>
                        </div>
                        <ArenaResultAvatar profile={opponentProfile} />
                    </div>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button, it will close the modal */}
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                disconnect();
                                navigate('/arena');
                            }}
                        >
                            한 번 더 하기!
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

const ArenaResultAvatar = ({ profile }) => {
    return (
        <div className="avatar">
            <div className="w-14 rounded-full">
                <img
                    src={
                        profile
                            ? profile
                            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                    }
                />
            </div>
        </div>
    );
};
export default ArenaResult;
