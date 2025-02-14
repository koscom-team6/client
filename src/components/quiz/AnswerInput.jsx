import React, { useState } from 'react';
import { TbArrowUp } from 'react-icons/tb';

/**
 * 답변 입력 컴포넌트
 */
const AnswerInput = ({ setMessage, setIsTyping, sendMessage, sid, setAiStatus, oppositeComplete, setMy }) => {
    const [disabled, setDisabled] = useState(false);

    return (
        <div className="fixed bottom-20 w-2xl bg-base-100 p-2 rounded-xl shadow-sm flex flex-col items-end z-100">
            <textarea
                className="w-full textarea textarea-ghost focus:outline-0 resize-none"
                placeholder="답변을 입력해주세요..."
                onChange={(e) => {
                    setIsTyping(true);
                    setMessage(e.target.value);
                }}
                disabled={disabled}
            ></textarea>
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
    );
};

export default AnswerInput;
