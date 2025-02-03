import { getCurrentTierImageSrc } from '../../libs/tier/tierHelper';
import { FiCheck } from 'react-icons/fi';
import useAuthStore from '../../store/useAuthStore';
import { useShallow } from 'zustand/shallow';

/**
 * 채팅창에서의 유저 컴포넌트
 * @param {string} nickname 닉네임
 * @param {number} score 점수(티어표기를 위한)
 * @param {string} profileSrc 프로필 이미지 주소
 * @param {string} action 유저 액션: typing(타이핑 중) / solved(답변 전송) / null (null 리턴)
 * @param {boolean} isMe 자신인지
 */

const QuizAvartar = ({ nickname, score, profileSrc, action, isMe }) => {
    const { myImage, myScore } = useAuthStore(
        useShallow((state) => ({
            myImage: state.profileSrc,
            myScore: state.score,
        }))
    );

    // 유저의 액션에 따라서 컴포넌트 변경
    const avatarDoAction = (action, isMe) => {
        if (action === 'typing') {
            return (
                <div className="w-24 h-8 bg-secondary rounded-full flex items-center pl-3">
                    <span className="loading loading-dots loading-lg text-gray-500"></span>
                </div>
            );
        }

        if (action === 'solved') {
            return isMe ? (
                <div className={`w-12 h-12 rounded-full bg-primary flex items-center justify-center`}>
                    <FiCheck size={36} color="white" />
                </div>
            ) : (
                <div className={`w-12 h-12 rounded-full bg-info flex items-center justify-center`}>
                    <FiCheck size={36} color="white" />
                </div>
            );
        }

        return <></>;
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-end items-center gap-8">
                {avatarDoAction(action, isMe)}
                <div className="avatar relative">
                    <span className="w-5 absolute right-0">
                        <img src={getCurrentTierImageSrc(isMe ? myScore : score)} />
                    </span>
                    <div className="w-20 rounded-full">
                        {isMe ? (
                            <img
                                src={
                                    myImage
                                        ? myImage
                                        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                                }
                            />
                        ) : (
                            <img
                                src={
                                    profileSrc
                                        ? profileSrc
                                        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                                }
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="text-right font-semibold my-1">{isMe ? '나' : nickname}</div>
        </div>
    );
};

export default QuizAvartar;
