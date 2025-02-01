import ReactFullPage from "@fullpage/react-fullpage";
import HomeSectionTop from "./HomeSectionTop";
import HomeSectionMiddle from "./HomeSectionMiddle";
import HomeSectionBottom from "./HomeSectionBottom";

const Home = () => {
  return (
    <ReactFullPage
      scrollingSpeed={700} // 스크롤 속도 (ms 단위)
      render={() => (
        <ReactFullPage.Wrapper>
          <HomeSectionTop />
          <HomeSectionMiddle />
          <HomeSectionBottom />
        </ReactFullPage.Wrapper>
      )}
    />
  );
};

export default Home;
