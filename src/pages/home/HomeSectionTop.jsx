import Logo from "../../assets/Logo.png";
import "./HomeSectionTop.css"; // CSS 파일 import
const SectionOne = () => {
  const cards = [
    "전자 주식은 오를까, 내릴까?",
    "전세 사기를 예방하는 방법은?",
    "미국 금리가 우리나라에 어떤 영향을 미칠까?",
    "사회초년생에 유리한 대출 상품은 무엇일까?",
    "PER, PBR, ROE로 주가를 판단하자",
    "왜 지금 금값이 오르고 있을까?",
    "연금저축펀드와 IRP의 차이?",
    "월세, 전세 중 나에게 맞는 것은?",
    "ISA 계좌란 무엇일까?",
    "금리와 물가 상승, 주가와는 무슨 영향이 있을까?"
  ];

  return (
    <div className="section bg-[#F5F7FA] flex flex-col items-center justify-center text-center min-h-screen">
      {/* 로고와 제목 섹션 */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <img src={Logo} alt="Kinda Logo" className="w-17 h-17 rounded-lg mr-2" />
          <h1 className="text-2xl font-bold text-[#3B3B3B]" style={{ fontSize: "57px" }}>
            Kinda
          </h1>
        </div>
        <h2 className="text-3xl font-semibold text-[#3B3B3B] mb-4">
          어렵기만한 금융 지식, 이제 재미있게 습득하자
        </h2>
        <p className="text-lg text-gray-600">
          금융스타터를 위한 게이미피케이션 기반 학습 서비스, KINDA
        </p>
        <button className="mt-7 text-white" style={{backgroundColor: '#D097FF'}}>
          <p className="text-white">연습문제 풀기</p>
        </button>
      </div>


      <div className="cards-container w-full mt-20">
        <div className="first-row">
          {cards.slice(0, 5).map((card, index) => (
            <div
              key={index}
              className="card first-row-card bg-white shadow-md rounded-lg flex items-center justify-center text-center text-sm text-gray-700 p-4"
            >
              {card}
            </div>
          ))}
          {/* 무한 스크롤을 위한 복제 카드들 */}
          {cards.slice(0, 5).map((card, index) => (
            <div
              key={`duplicate-${index}`}
              className="card first-row-card bg-white shadow-md rounded-lg flex items-center justify-center text-center text-sm text-gray-700 p-4"
            >
              {card}
            </div>
          ))}
        </div>
        
        <div className="second-row">
          {cards.slice(5, 10).map((card, index) => (
            <div
              key={index}
              className="card second-row-card bg-white shadow-md rounded-lg flex items-center justify-center text-center text-sm text-gray-700 p-4"
            >
              {card}
            </div>
          ))}
          {/* 무한 스크롤을 위한 복제 카드들 */}
          {cards.slice(5, 10).map((card, index) => (
            <div
              key={`duplicate-${index}`}
              className="card second-row-card bg-white shadow-md rounded-lg flex items-center justify-center text-center text-sm text-gray-700 p-4"
            >
              {card}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
