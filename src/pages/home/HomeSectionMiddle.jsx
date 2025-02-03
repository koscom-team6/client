import Coin from '../../assets/homeSection/coin.png';
import Rocket from '../../assets/homeSection/rocket.png';
import { TbArrowUp } from 'react-icons/tb';
import { ReactComponent as Sandbox } from '../../assets/homeSection/sandbox.svg';
import { ReactComponent as Archive } from '../../assets/homeSection/archive.svg';
import { ReactComponent as BarChart } from '../../assets/homeSection/bar-chart.svg';

const SectionTwo = () => {
    return (
        <div className="section relative flex justify-between items-center min-h-screen bg-gray-100 px-16 py-24">
            <div className="w-1/2 space-y-6">
                <h2 className="text-4xl font-bold text-[#3B3B3B] leading-tight ml-35">
                    혼자·같이 문제를 풀며
                    <br />
                    <span className="text-purple-500">금융 지식</span>을 확장해요
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed ml-35">
                    혼자, 혹은 같이 금융 문제를 풀면서 부족한 금융 지식을 천천히 쌓아가요. 금융 지식을 쌓아가다 보면
                    랭크를 높일 수 있어요. KoStarter가 당신의 성장을 응원할게요.
                </p>

                <div className="mt-32 space-y-8 ml-36">
                    <div className="flex gap-4 items-center">
                        <Archive className="w-10" />
                        <div className="flex flex-col">
                            <div
                                onClick={() => {
                                    alert('아직 오픈되지 않은 기능입니다');
                                }}
                            >
                                {'연습 문제 풀기 >'}
                            </div>
                            <div className="text-sm text-neutral/50">혼자서 연습 문제를 풀어보세요</div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Sandbox className="w-10" />
                        <div className="flex flex-col">
                            <div
                                onClick={() => {
                                    alert('아직 오픈되지 않은 기능입니다');
                                }}
                            >
                                {'아레나 입장하기 >'}
                            </div>
                            <div className="text-sm text-neutral/50">둘이 대결하여 문제를 풀어보세요</div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <BarChart className="w-10" />
                        <div className="flex flex-col">
                            <div
                                onClick={() => {
                                    alert('아직 오픈되지 않은 기능입니다');
                                }}
                            >
                                {'랭크 확인하기 >'}
                            </div>
                            <div className="text-sm text-neutral/50">내가 얼마나 성장했는지 확인해봐요</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-[40vh] right-[20vw] flex flex-col items-center">
                <img src={Coin} alt="코인" className="w-70 relative" />

                <img src={Rocket} alt="로켓" className="w-70 absolute top-[-150px] right-[-250px] animate-bounce" />

                <div
                    className="absolute top-[calc(100%+50px)] bg-white p-5 rounded-xl shadow-md flex items-center space-x-3 
                w-100 h-[80px] right-[-200px]"
                >
                    <p className="text-gray-700 ">KoStarter가 내 금융 사고를 넓혀줄 수 있을까?</p>
                    <button
                        className="btn btn-primary btn-circle"
                        onClick={() => {
                            if (!disabled) {
                                setDisabled(true);
                                sendMessage('solved', sid);

                                if (oppositeComplete === 'solved') {
                                    setAiStatus('inProgress');
                                    setMy({ type: 'solved' });
                                }
                            }
                        }}
                    >
                        <TbArrowUp color="white" size="2rem" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SectionTwo;
