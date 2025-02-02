import React from 'react';
import { BiCheckDouble } from 'react-icons/bi';

/**
 * AI 채점 리액션 컴포넌트
 * @param {string | null} action inProgress: 채점중, complete: 완료, null(혹은 나머지): null 리턴
 */
const AIGrading = ({ action }) => {
    if (action === 'inProgress') {
        return (
            <div className="flex gap-4 items-center">
                <span className="loading loading-ring loading-lg"></span>
                <p className="text-base font-light">답변을 채점 중 입니다...</p>
            </div>
        );
    }

    if (action === 'complete') {
        return (
            <div className="flex gap-2 items-center">
                <BiCheckDouble size={28} />
                <p className="text-base font-light">채점을 완료하였습니다.</p>
            </div>
        );
    }

    return <></>;
};

export default AIGrading;
