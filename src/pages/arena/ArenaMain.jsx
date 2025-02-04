import React, { useEffect, useRef, useState } from 'react';
import QuizHeader from '../../components/quiz/QuizHeader';
import QuizContent from '../../components/quiz/QuizContent';
import AnswerInput from '../../components/quiz/AnswerInput';
import QuizAvartar from '../../components/quiz/QuizAvartar';
import AIGrading from '../../components/quiz/AIGrading';
import ArenaResult from '../../components/quiz/ArenaResult';
import { useParams } from 'react-router-dom';
import { getArenaQuiz, sendMessageApi } from '../../libs/apis/arenaApi';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import useAuthStore from '../../store/useAuthStore';
import { useShallow } from 'zustand/shallow';
import { matchingNews } from '../../libs/apis/matchingApi';

const ArenaMain = () => {
    const { sid } = useParams();
    const { token, nickname, updateUser } = useAuthStore(
        useShallow((state) => ({
            token: state.token,
            nickname: state.nickname,
            updateUser: state.updateUser,
        }))
    );

    const [quizData, setQuizData] = useState({
        title: '',
        tags: [],
        images: [],
        content: '',
        references: []
    });

    useEffect(() => {
        console.log("first sid = ",sid);
        const fetchQuizData = async () => {
            try {
                const response = await matchingNews(token, sid);
                // const responseObject = JSON.parse(response);
                console.log("fetch response = ",response);
                console.log(response.matchId);
                // console.log("test = ", responseObject);
                setQuizData({
                    title: response.matchTitle,
                    content: response.matchContent,
                    tags: response.tags || [],
                    images: response.images || [],
                    references: response.matchReferences || []
                });
    
                
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            }
        };
        fetchQuizData();
    }, [sid, token]);
    useEffect(() => {
        console.log("Updated quiz data:", quizData);
    }, [quizData]);  // ✅ quizData가 변경될 때마다 실행
    

    // 웹소켓 관련 설정
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
                type: action,
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

    // AI 채점 상태
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
            <QuizHeader title={quizData.title} tags={quizData.tags} count={180} />
            <QuizContent content={quizData.content} images={quizData.images} references={quizData.references} />
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
                title={quizData.title}
                opponentProfile={oppositeUser.profile}
                myResult={my.result}
                opponentResult={oppositeUser.result}
                myUser={my.user}
                disconnect={disconnect}
            />
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
