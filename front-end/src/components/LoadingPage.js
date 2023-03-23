import styled from "@emotion/styled";
import loading from "../assets/lottie/loading.json";
import Lottie from "react-lottie";
import { Common } from "../styles/Common";

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: ${Common.colors.white01};
  font-family: "Noto Sans KR", serif;

  .title-text {
    font-weight: 700;
    transition: all 0.3s ease-in-out;
    margin-top: 0;

    @media (min-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  }

  .info-text {
    margin: 0.4rem 0rem;
  }
`;

const LoadingPage = () => {
  const options = (lottiefile) => {
    return {
      loop: true,
      autoplay: true,
      animationData: lottiefile,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
  };

  return (
    <LoadingWrapper>
      <Lottie options={options(loading)} height={300} width={300}></Lottie>
      <p className="title-text">페이지를 불러오는 중입니다.</p>
      <p className="info-text">잠시만 기다려주세요.</p>
    </LoadingWrapper>
  );
};

export default LoadingPage;
