import { useState } from "react";
import useAuthStore from "../../store/authStore";

const SidebarLogout = () => {
  const { login } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username==="koscom@koscom.com" && password==="koscom") {
      alert("로그인 성공");
      login();
    } else {
      alert("아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="flex-grow flex flex-col p-4">
      {/* 로그인 폼 */}
      <h2 className="text-xl text-[#3B3B3B] font-bold mb-4">로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-2 p-2 rounded bg-[#E2E2E2] text-[#999999]"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 rounded bg-[#E2E2E2] text-[#999999]"
      />
      <div className="flex justify-between text-sm text-[#999999] mb-6">
          <p className="hover:underline" style={{fontSize: '11px', marginTop: '10px'}}>
            아이디·비밀번호 찾기
          </p>
          <p className="hover:underline" style={{fontSize: '11px', marginTop: '10px'}}>
            회원가입 하기
          </p>
          <button 
            onClick={handleLogin}
            className="bg-myPink text-white px-4 py-2 rounded-lg text-lg font-bold transition duration-300"
            style={{ backgroundColor: "#D097FF" }}
          >
             →
          </button>
      </div>
    </div>
  );
};

export default SidebarLogout;
