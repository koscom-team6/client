import Coin from "../../assets/homeSection/coin.png";
import Rocket from "../../assets/homeSection/rocket.png";

const SectionTwo = () => {
  return (
    <div className="section relative flex justify-between items-center min-h-screen bg-gray-100 px-16 py-24">
      {/* 왼쪽 텍스트 영역 */}
      <div className="w-1/2 space-y-6">
        <h2 className="text-5xl font-bold text-[#3B3B3B] leading-tight ml-40">
          혼자 · 같이 문제를 풀며<br />
          <span className="text-purple-500">금융 지식</span>을 확장해요
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed ml-40">
          혼자, 혹은 같이 금융 문제를 풀면서 부족한 금융 지식을 천천히 쌓아가요.
          금융 지식을 쌓아가다 보면 랭크를 높일 수 있어요.
          KINDA가 당신의 성장을 응원할게요.
        </p>

        {/* 버튼 리스트 (제목 아래 50px 간격) */}
        <div className="mt-[50px] space-y-4 ml-40">
          <button className="flex items-center space-x-3 text-gray-900 hover:text-purple-500 text-lg">
            <span>📖</span> <span className="underline">연습 문제 풀기 &gt;</span>
          </button>
          <button className="flex items-center space-x-3 text-gray-900 hover:text-purple-500 text-lg">
            <span>🏆</span> <span className="underline">아레나 입장하기 &gt;</span>
          </button>
          <button className="flex items-center space-x-3 text-gray-900 hover:text-purple-500 text-lg">
            <span>📊</span> <span className="underline">랭크 확인하기 &gt;</span>
          </button>
        </div>
      </div>

      {/* 오른쪽 이미지 (코인 & 로켓) - 섹션 기준 1시 방향에서 조정 */}
      <div className="absolute top-[+300px] right-[+400px] flex flex-col items-center">
        {/* 코인 이미지 (섹션 기준 1시 방향에서 300px 이동) */}
        <img src={Coin} alt="코인" className="w-70 relative" />

        {/* 로켓 이미지 (코인의 오른쪽 위로 150px 이동) */}
        <img
          src={Rocket}
          alt="로켓"
          className="w-70 absolute top-[-150px] right-[-250px] animate-bounce"
        />

        {/* 채팅 메시지 (코인 아래 50px 위치) */}
        <div className="absolute top-[calc(100%+50px)] bg-white p-5 rounded-xl shadow-md flex items-center space-x-3 
                w-[400px] h-[80px] right-[-200px]">
          <p className="text-gray-700 text-lg">KINDA가 내 금융 사고를 넓혀줄 수 있을까?</p>
          <span className="text-purple-500 text-xl">⬆</span>
        </div>

      </div>
    </div>
  );
};

export default SectionTwo;
