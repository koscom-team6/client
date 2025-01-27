import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === "koscom@koscom.com" && password === "koscom") {
      navigate('/home');
    } else {
      alert("이메일 혹은 비밀번호를 다시 확인해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-96 fixed font-sans">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">로그인</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input
              type="email"
              name="email" // name 속성 추가
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none bg-white text-gray-900"
              placeholder="your@email.com"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
            <input
              type="password"
              name="password" // name 속성 추가
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none bg-white text-gray-900"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors mt-6"
          >
            로그인
          </button>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-500 hover:text-blue-600">비밀번호를 잊으셨나요?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
