import React from 'react';
import { TbArrowUp } from 'react-icons/tb';

/**
 * 답변 입력 컴포넌트
 * @param {function} onClick 전송하기 버튼 액션
 */
const AnswerInput = ({ onClick }) => {
    return (
        <div className="fixed bottom-20 w-2xl bg-base-100 p-2 rounded-xl shadow-sm flex flex-col items-end z-100">
            <textarea
                className="w-full textarea textarea-ghost focus:outline-0 resize-none"
                placeholder="답변을 입력해주세요..."
            ></textarea>
            <button className="btn btn-primary btn-circle">
                <TbArrowUp color="white" size="2rem" />
            </button>
        </div>
    );
};

export default AnswerInput;
