import React from "react";


const WebSocketTest = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500">
        <div className="bg-white p-10 rounded-lg shadow-lg w-[400px] text-center">
          <h2 className="text-2xl font-bold text-gray-800">WebSocket 테스트</h2>
          <p className="text-gray-600 mt-2">WebSocket 기능을 테스트할 페이지입니다.</p>
  
          <div className="mt-6">
            <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
              WebSocket 연결
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default WebSocketTest;
  