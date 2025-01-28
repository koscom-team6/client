import ChatBubble from "../../assets/homeSection/chatbubble.png";

const SectionThree = () => {
  return (
    <div className="section flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
      <h2 className="text-5xl font-bold text-[#3B3B3B] leading-tight">
        주관적인 답변,<br />
        이제는 <span className="text-purple-500">AI</span>가 채점해요
      </h2>
      <p className="text-xl text-gray-600 mt-4">
        세상에는 다양한 답변이 있어요. 금융도 마찬가지예요.<br />
        이제는 AI가 당신의 답변을 최대한 이해하고 정확한 평가를 해줄 거예요.
      </p>

      {/* 이미지 */}
      <img src={ChatBubble} alt="채팅 말풍선" className="w-60 mt-10" />
    </div>
  );
};

export default SectionThree;
