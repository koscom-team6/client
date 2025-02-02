import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

/**
 * 퀴즈 헤더, CountdownCircleTimer의 종속적
 * @param {string} title 타이틀
 * @param {Array<string>} tags 태그들
 * @param {number} count 시간초
 */
const QuizHeader = ({ title, tags, count }) => {
    return (
        <div className="sticky top-0 z-99">
            <div className=" bg-base-200 pt-8">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-3xl font-bold pb-1">{title}</h1>
                        {tags.map((e, i) => (
                            <span key={i} className="text-sm text-gray-500">{`#${e} `}</span>
                        ))}
                    </div>
                    <div className="timer-wrapper">
                        <CountdownCircleTimer
                            isPlaying
                            duration={count}
                            size={60}
                            strokeWidth={8}
                            colors={['#D097FF', '#FCB700', '#FF637D', '#FF637D']}
                            colorsTime={[10, 5, 2, 0]}
                        >
                            {({ remainingTime }) => <p className="text-lg">{remainingTime}</p>}
                        </CountdownCircleTimer>
                    </div>
                </div>
                <hr className="mt-4 border-gray-300" />
            </div>
            <div className="h-6 bg-linear-to-b from-base-200 from-1% via-base-200/30 via-80% to-base-200/0 to-100%"></div>
        </div>
    );
};

export default QuizHeader;
