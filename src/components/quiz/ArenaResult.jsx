import { ReactComponent as WinSvg } from '../../assets/result/win.svg';
import { getCurrentTierImageSrc } from '../../libs/tier/tierHelper';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import useAuthStore from '../../store/useAuthStore';
import { useShallow } from 'zustand/shallow';

/**
 * 아레나 결과창, arena_result란 ID로 컨트롤 (디자인만 함)
 * @param {string} opponentProfile 상대방 프로필 이미지
 */

const ArenaResult = ({ opponentProfile }) => {
    const { profileSrc } = useAuthStore(
        useShallow((state) => ({
            profileSrc: state.profileSrc,
        }))
    );
    return (
        <dialog id="arena_result" className="modal">
            <div className="modal-box w-380 flex flex-col items-center">
                <WinSvg className="h-8" />
                <div className="flex justify-between w-full items-center px-2 pt-4">
                    <div className="flex flex-col items-center">
                        <h1 className="text-8xl font-semibold">97</h1>
                        <div className="text-sm text-[#999999]">
                            상대방보다
                            <span className="text-[#595959]"> 12점</span> 앞섰어요
                        </div>
                        <div className="text-sm text-[#999999]">이번 문제를 제대로 파악하고 있어요</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex gap-2">
                            <img className="w-6" src={getCurrentTierImageSrc(1020)} />
                            <h1 className="text-4xl font-semibold relative">
                                1020
                                <span className="absolute -right-4 -top-3 text-sm font-semibold">+20</span>
                            </h1>
                        </div>

                        <div className="text-sm text-[#999999]">
                            다음랭크까지
                            <span className="text-[#595959]"> 170점</span> 남았어요
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-full items-center px-2 pt-8">
                    <div className="flex gap-3">
                        <ArenaResultAvatar profile={profileSrc} />
                        <a href="#" target="_blank" className="flex items-center">
                            <IoIosArrowForward />
                            <span className="text-sm">내 답변 분석</span>
                        </a>
                    </div>
                    <div className="flex gap-3">
                        <a href="#" target="_blank" className="flex items-center">
                            <IoIosArrowBack />
                            <span className="text-sm">상대방 답변 분석</span>
                        </a>
                        <ArenaResultAvatar profile={opponentProfile} />
                    </div>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button, it will close the modal */}
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                console.log('hgi');
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
