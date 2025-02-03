import React, { useEffect, useRef, useState } from 'react';
import QuizHeader from '../../components/quiz/QuizHeader';
import QuizContent from '../../components/quiz/QuizContent';
import AnswerInput from '../../components/quiz/AnswerInput';
import QuizAvartar from '../../components/quiz/QuizAvartar';
import AIGrading from '../../components/quiz/AIGrading';
import ArenaResult from '../../components/quiz/ArenaResult';
import { useParams } from 'react-router-dom';
import { getArenaQuiz, sendMessageApi } from '../../libs/apis/arenaApi';
import SockJS from 'sockjs-client'; // WebSocket 기반 통신용 SockJS
import Stomp from 'stompjs'; // WebSocket 통신을 위한 Stomp 프로토콜
import useAuthStore from '../../store/useAuthStore';
import { useShallow } from 'zustand/shallow';

const ArenaMain = () => {
    const { sid } = useParams();
    const { quiz, setQuiz } = useState(null);
    const { token, nickname, updateUser } = useAuthStore(
        useShallow((state) => ({
            token: state.token,
            nickname: state.nickname,
            updateUser: state.updateUser,
        }))
    );

    const title = '삼성 전자의 전망을 평가해라!';
    const tags = ['국내주식', '투자'];
    const images = [
        'https://webchart.thinkpool.com/2022Mobile/Stock1Day/A005930.png',
        'https://dimg.donga.com/wps/NEWS/IMAGE/2025/01/08/130814617.1.jpg',
        'https://blog.kakaocdn.net/dn/bUnwZW/btrgvTEuJ0u/zXAc7VDKWakfo47mL8XAa0/img.jpg',
        'https://image.fnnews.com/resource/media/image/2024/11/18/202411182338292936_l.jpg',
    ];
    const content =
        '삼성전자는 2024년 하반기부터 메모리 반도체 수요 회복과 함께 AI 반도체 사업 확장을 통해 성장 가능성을 기대하고 있습니다. 하지만 글로벌 경기 둔화와 경쟁 심화로 인해 불확실성도 상존합니다. 이러한 상황에서 삼성전자의 주가에 영향을 미칠 주요 요인으로는 기술 혁신, 원자재 가격, 그리고 환율 변동 등이 있습니다. 삼성전자의 주가가 앞으로 상승할 가능성이 높다고 보는지, 혹은 하락할 가능성이 높다고 보는지, 그 이유를 사례를 들어 서술하세요.';
    const references = [
        {
            referType: '뉴스',
            referText: '"악재란 악재 다 반영됐다"… 삼성전자 주가 반등 기대감',
            referLink: 'https://daisyui.com/',
        },
        {
            referType: '뉴스',
            referText: '계속 무너져 내려가는 삼성전자',
            referLink: 'https://daisyui.com/',
        },
        {
            referType: '차트',
            referText: '삼성전자 차트 - 네이버페이 증권',
            referLink: 'https://daisyui.com/',
        },
        {
            referType: '재무제표',
            referText: '삼성전자 재무제표 - 네이버페이 증권',
            referLink: 'https://daisyui.com/',
        },
    ];

    // 웹소켓
    const stompClient = useRef(null);
    const [subchat, setSubChat] = useState(null);

    const connect = () => {
        const socket = new SockJS(import.meta.env.VITE_WS_ARENA_HOST);
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
            stompClient.current.subscribe(`/sub/arena`, (message) => {
                const subMessage = JSON.parse(message.body);
                setSubChat(subMessage);
                console.log('서브 메시지: ', subMessage);
            });
        });
    };

    const [typingMessage, setTypingMessage] = useState(null);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (isTyping) sendMessage('typing', sid);
    }, [isTyping]);

    const sendMessage = async (action, sid) => {
        if (stompClient.current) {
            console.log('하이하이 소켓 센드해용');
            const message = {
                matchSessionId: sid,
                type: action, // typing, solved
                content: typingMessage,
                token: token,
            };

            await sendMessageApi(message);
        }
    };

    const disconnect = () => {
        if (stompClient.current) {
            console.log('Arena 세션 종료');
            stompClient.current.disconnect();
        }
    };

    useEffect(() => {
        connect();
    }, []);

    const [my, setMy] = useState({
        type: null,
        result: null,
        content: null,
        num: null,
        user: null,
    });
    const [oppositeUser, setOppositeUser] = useState({
        type: null,
        nickname: null,
        score: null,
        content: null,
        profile: null,
        result: null,
        num: null,
    });

    const contentRef = useRef(null);
    const scrollToBottom = () => {
        contentRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    };

    // null, inProgress, complete
    const [aiStatus, setAiStaus] = useState(null);

    useEffect(() => {
        if (subchat) {
            const typing_arr = subchat.type.split(' ');
            const chat_type = typing_arr[0];
            const chat_target = typing_arr[1];

            if (chat_target === nickname) {
                setMy({
                    type: chat_type,
                    result: subchat.user1.nickname === chat_target ? subchat.result1 : subchat.result2,
                    content: subchat.user1.nickname === chat_target ? subchat.content1 : subchat.content2,
                    num: subchat.user1.nickname === chat_target ? 1 : 2,
                    user: subchat.user1.nickname === chat_target ? subchat.user1 : subchat.user2,
                });
            } else {
                setOppositeUser({
                    type: chat_type,
                    nickname: chat_target,
                    score: subchat.user1.nickname === chat_target ? subchat.user1.score : subchat.user2.score,
                    content: subchat.user1.nickname === chat_target ? subchat.content1 : subchat.content2,
                    profile: subchat.user1.nickname === chat_target ? subchat.user1.image : subchat.user2.image,
                    result: subchat.user1.nickname === chat_target ? subchat.result1 : subchat.result2,
                    num: subchat.user1.nickname === chat_target ? 1 : 2,
                });
            }

            if (subchat.solved1 && subchat.solved2) {
                if (subchat.user1.nickname === nickname) {
                    setMy({ ...my, result: subchat.result1, user: subchat.user1 });
                    setOppositeUser({ ...oppositeUser, result: subchat.result2 });
                } else {
                    setMy({ ...my, result: subchat.result2, user: subchat.user2 });
                    setOppositeUser({ ...oppositeUser, result: subchat.result1 });
                }
            }

            if (subchat.solved1 === true && subchat.solved1 === subchat.solved2) {
                updateUser();
                setAiStaus('complete');
            }

            scrollToBottom();
        }
    }, [subchat]);
    return (
        <div className="px-[8rem]" ref={contentRef}>
            <QuizHeader title={title} tags={tags} count={180} />
            <QuizContent content={content} images={images} references={references} />
            {oppositeUser.type ? (
                <div className="flex justify-end">
                    <QuizAvartar
                        nickname={oppositeUser.nickname}
                        score={oppositeUser.score}
                        action={oppositeUser.type}
                        profileSrc={oppositeUser.profile}
                    />
                </div>
            ) : (
                <></>
            )}
            <div className="flex justify-end">
                <QuizAvartar score={200} action={my.type} isMe />
            </div>
            <AIGrading action={aiStatus} />
            {aiStatus === 'complete' ? (
                <button
                    className="btn btn-primary"
                    onClick={(e) => {
                        e.preventDefault();
                        console.log('결과창 확인', my.result, oppositeUser.result);
                        document.getElementById('arena_result').showModal();
                    }}
                >
                    결과창 버튼
                </button>
            ) : (
                <></>
            )}
            <ArenaResult
                title={title}
                opponentProfile={oppositeUser.profile}
                myResult={my.result}
                opponentResult={oppositeUser.result}
                myUser={my.user}
                disconnect={disconnect}
            />
            {/* 답변 영역 */}
            <div className="h-76 margin"></div>
            <div className="flex justify-center items-center bg-linear-to-t from-base-200 from-70% via-base-200/30 via-90% to-base-200/0 to-0% fixed bottom-0 w-full h-76"></div>
            <div className="flex justify-center items-center">
                <AnswerInput
                    setMessage={setTypingMessage}
                    sendMessage={sendMessage}
                    setIsTyping={setIsTyping}
                    sid={sid}
                    oppositeComplete={oppositeUser.type}
                    setAiStatus={setAiStaus}
                    setMy={setMy}
                />
            </div>
        </div>
    );
};

export default ArenaMain;
