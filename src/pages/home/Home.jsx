import ReactFullPage from "@fullpage/react-fullpage";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";

const Home = () => {
  return (
    <ReactFullPage
      scrollingSpeed={700} // 스크롤 속도 (ms 단위)
      render={() => (
        <ReactFullPage.Wrapper>
          <SectionOne />
          <SectionTwo />
          <SectionThree />
        </ReactFullPage.Wrapper>
      )}
    />
  );
};

export default Home;
