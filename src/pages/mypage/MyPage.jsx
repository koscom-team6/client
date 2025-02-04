import { useShallow } from 'zustand/shallow';
import useAuthStore from '../../store/useAuthStore';
import { ReactComponent as WinSvg } from '../../assets/result/win.svg';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    PolarAngleAxis,
    PolarGrid,
    Radar,
    RadarChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import fpbPng from '../../assets/myPage/fpb.png';
import security from '../../assets/myPage//security.png';
import tesat from '../../assets/myPage/tesat.png';
import badge1 from '../../assets/myPage/badge1.webp';
import badge2 from '../../assets/myPage/badge2.webp';
import badge3 from '../../assets/myPage/badge3.webp';
import badge4 from '../../assets/myPage/badge4.webp';
import badge5 from '../../assets/myPage/badge5.webp';

const MyPage = () => {
    const { profileSrc, nickname, tierImageSrc, score } = useAuthStore(
        useShallow((state) => ({
            profileSrc: state.profileSrc,
            nickname: state.nickname,
            tierImageSrc: state.tierImageSrc,
            score: state.score,
        }))
    );

    const polarData = [
        {
            subject: '투자',
            A: 120,
            B: 110,
            fullMark: 150,
        },
        {
            subject: '보험',
            A: 98,
            B: 130,
            fullMark: 150,
        },
        {
            subject: '절세',
            A: 86,
            B: 130,
            fullMark: 150,
        },
        {
            subject: '부동산',
            A: 99,
            B: 100,
            fullMark: 150,
        },
        {
            subject: '시사•경제',
            A: 85,
            B: 90,
            fullMark: 150,
        },
        {
            subject: '은행•결제',
            A: 65,
            B: 85,
            fullMark: 150,
        },
    ];

    const lineData = [
        {
            name: '2024.09',
            나: 62,
            전체: 60,
        },
        {
            name: '2024.10',
            나: 60,
            전체: 64,
        },
        {
            name: '2024.11',
            나: 65,
            전체: 68,
        },
        {
            name: '2024.12',
            나: 72,
            전체: 66,
        },
        {
            name: '2025.01',
            나: 84,
            전체: 65,
        },
        {
            name: '2025.02',
            나: 88,
            전체: 66,
        },
    ];

    return (
        <div className="wrapper h-screen px-24">
            <h1 className="font-bold text-3xl py-6">마이페이지</h1>
            <div className="grid grid-cols-2 grid-rows-2 h-4/5 w-full gap-4">
                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    <div className="transition p-4 ease-in-out duration-400 bg-base-100 rounded-xl shadow-md hover:shadow-xl flex flex-col items-center">
                        <div className="avatar avatar-online w-16">
                            <img className="rounded-full" src={profileSrc} />
                        </div>
                        <div className="flex gap-2">
                            <img src={tierImageSrc} className="w-3" />
                            <p className="font-semibold">{nickname}</p>
                        </div>

                        <button className="btn btn-sm btn-neutral mt-2">프로필 편집</button>
                    </div>
                    <div className="transition p-4 ease-in-out duration-400 bg-base-100 rounded-xl shadow-md hover:shadow-xl">
                        <div className="stat">
                            <div className="stat-figure text-accent">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    class="inline-block h-8 w-8 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    ></path>
                                </svg>
                            </div>
                            <div className="stat-title text-neutral">푼 문제 수</div>
                            <div className="stat-value text-accent">128</div>
                            <div className="stat-desc">
                                이번 달 <span className="text-neutral">15 Solve</span>
                            </div>
                        </div>
                    </div>
                    <div className="transition p-4 ease-in-out duration-400 bg-base-100 rounded-xl shadow-md hover:shadow-xl">
                        <div className="stat place-items-center">
                            <div className="stat-title">현재 점수</div>
                            <div className="stat-value">{score}</div>
                            <div className="stat-desc">↗︎ 10 (20%)</div>
                        </div>
                    </div>
                    <div className="transition p-4 ease-in-out duration-400 bg-base-100 rounded-xl shadow-md hover:shadow-xl">
                        <div className="stat">
                            <div className="stat-figure text-secondary w-12">
                                <WinSvg />
                            </div>
                            <div className="stat-title">승률</div>
                            <div className="stat-value text-error">60%</div>
                            <div className="stat-desc">↘︎ 10%</div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="transition p-4 ease-in-out duration-400 bg-base-100 rounded-xl shadow-md hover:shadow-xl flex flex-col items-center">
                        <h3 className="justify-self-center font-semibold mb-6">내 금융 스탯</h3>
                        <RadarChart outerRadius={60} width={220} height={200} data={polarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: '10px' }} />
                            <Radar name="나" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            <Legend height={8} />
                        </RadarChart>
                    </div>
                    <div className="transition p-4 ease-in-out duration-400 bg-base-100 rounded-xl shadow-md hover:shadow-xl flex-col flex items-center justify-between">
                        <h3 className="justify-self-center font-semibold">다음 티어까지</h3>
                        <div
                            className="radial-progress"
                            style={{ '--value': 72 } /* as React.CSSProperties */}
                            aria-valuenow={1}
                            role="progressbar"
                        >
                            72%
                        </div>
                        <h3 className="justify-self-center font-semibold">다음 랭크까지</h3>
                        <div
                            className="radial-progress"
                            style={{ '--value': 12 } /* as React.CSSProperties */}
                            aria-valuenow={1}
                            role="progressbar"
                        >
                            12%
                        </div>
                    </div>
                </div>
                <div className="bg-base-100 shadow rounded-md shadow-md hover:shadow-xl flex flex-col justify-center items-center">
                    <h3 className="self-start ml-16 font-semibold">평균 점수 추이</h3>
                    <LineChart
                        width={480}
                        height={272}
                        data={lineData}
                        margin={{ top: 5, right: 42, left: 4, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: '10px' }} />
                        <YAxis tick={{ fontSize: '10px' }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="나" stroke="#8884d8" />
                        <Line type="monotone" dataKey="전체" stroke="#82ca9d" />
                    </LineChart>
                </div>
                <div className="grid grid-rows-2 gap-4">
                    <div className="transition p-4 ease-in-out duration-400 bg-base-100 rounded-xl shadow-md hover:shadow-xl">
                        <h3 className="justify-self-center font-semibold mb-6">도전 과제</h3>
                        <div className="flex justify-around">
                            <img className="w-14" src={badge1} />
                            <img className="w-14" src={badge2} />
                            <img className="w-14" src={badge3} />
                            <img className="w-14" src={badge4} />
                            <img className="w-14" src={badge5} />
                        </div>
                    </div>
                    <div className="transition p-4 ease-in-out duration-400 bg-base-100 rounded-xl shadow-md hover:shadow-xl">
                        <h3 className="justify-self-center font-semibold mb-6">인증 기관 연계</h3>
                        <div className="flex justify-center gap-12">
                            <img className="h-20" src={fpbPng} />
                            <img className="h-16" src={security} />
                            <img className="h-16" src={tesat} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
