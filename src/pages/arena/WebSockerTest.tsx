import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { matchingTest } from "../../libs/apis/matchingApi";
import Trophy from "../../assets/arena/Trophy.png";

const WebSocketTest = () => {
    const navigate = useNavigate();
    
    const [stompClient, setStompClient] = useState(null);
    const [responseMessage, setResponseMessage] = useState(null);
    const [isMatching, setIsMatching] = useState(false);
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [isMatched, setIsMatched] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [matchSessionId, setMatchSessionId] = useState(null);

    // 매칭 요청 버튼 클릭 시 WebSocket 연결 시작
    const handleStartMatching = () => {
        if (isMatching) {
            cancelMatching();
            return;
        }
        connectWebSocket(); // WebSocket 먼저 연결
    };

    // WebSocket 연결 함수
    const connectWebSocket = () => {
        const socket = new SockJS("http://localhost:8080/ws-match");
        const stomp = Stomp.over(socket);

        stomp.connect({}, () => {
            console.log("WebSocket 연결 성공!");
            setStompClient(stomp);
            setIsMatching(true);

            handlePostRequest(); // WebSocket 연결 성공 후 POST 요청 실행

            // 매칭 성공 시 처리
            stomp.subscribe("/sub/matching", (message) => {
                console.log("메시지 수신:", message.body);
                const { matchSessionId } = JSON.parse(message.body);
                setMatchSessionId(matchSessionId);
                setResponseMessage(message.body);
                handleMatchingSuccess();
            });
        }, (error) => {
            console.error("WebSocket 연결 실패:", error);
        });
    };

    // 매칭 요청 (WebSocket 연결 후 실행됨)
    const handlePostRequest = async () => {
        const randomId = Math.floor(Math.random() * 100) + 1;
        try {
            const response = await matchingTest(randomId);
            console.log("POST 응답:", response);
            setResponseMessage(response.data);
            startTimer(); // 타이머 시작
        } catch (error) {
            console.error("POST 요청 실패:", error);
            setResponseMessage("요청 실패");
        }
    };

    // 매칭 성공 후 3초 후 페이지 이동
    const handleMatchingSuccess = () => {
        stopTimer();
        setIsMatched(true); // 모달 표시

        let count = 3;
        const countdownInterval = setInterval(() => {
            setCountdown(count);
            count--;
            if (count < 0) {
                clearInterval(countdownInterval);
                disconnectWebSocket(); // 웹소켓 연결 해제
                navigate(`/next-page/${matchSessionId}`); // UUID와 함께 다음 페이지로 이동
            }
        }, 1000);
    };

    // 웹소켓 연결 해제 함수
    const disconnectWebSocket = () => {
        if (stompClient) {
            stompClient.disconnect(() => {
                console.log("WebSocket 연결 해제됨");
                setStompClient(null);
                setIsMatching(false);
            });
        }
    };

    // 매칭 취소 함수
    const cancelMatching = () => {
        disconnectWebSocket();
        stopTimer();
    };

    // 타이머 시작
    const startTimer = () => {
        setTimer(0);
        const id = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);
        setIntervalId(id);
    };

    // 타이머 정지
    const stopTimer = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F7FC] relative">
            <img src={Trophy} alt="Trophy" className="w-80 h-70 mb-6" />
            <h2 className="text-2xl font-bold text-gray-800">상대와 매칭해드릴게요</h2>
            <p className="text-gray-600 mt-2 text-center">
                상대와 같이 문제를 풀면서 재미도, 상식도 쌓아봐요
            </p>
            <button
                className="mt-6 px-6 py-3 text-white text-lg rounded-full shadow-md transition"
                style={{
                    backgroundColor: isMatching ? "#A0A0A0" : "#D097FF",
                    cursor: "Pointer",
                }}
                onClick={handleStartMatching} // 버튼 클릭 시 WebSocket 연결
            >
                {isMatching ? "매칭 취소하기" : "매칭 신청하기"}
            </button>
            {isMatching && <p className="mt-4 text-gray-600">{timer}초</p>}

            {/* 매칭 성공 시 모달 표시 */}
            {isMatched && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-40">
                    <div className="bg-white w-full max-w-md h-auto p-6 sm:p-10 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl sm:text-4xl font-bold text-gray-800">매칭 성공!</h2>
                        <p className="text-5xl sm:text-7xl font-extrabold text-purple-600 mt-4">
                            {countdown > 0 ? countdown : ""}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WebSocketTest;
