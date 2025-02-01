import React from 'react';
import { TbArrowUp } from 'react-icons/tb';

const AnswerInput = ({ onClick }) => {
    return (
        <div className="fixed bottom-20 w-2xl bg-base-100 p-2 rounded-xl shadow-sm flex flex-col items-end">
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
