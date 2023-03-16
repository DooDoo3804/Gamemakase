import Lottie from "react-lottie";
import errorpage from "../assets/lottie/errorpage.json";
import TranslucentBtn from "../components/TranslucentBtn";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Common } from "../styles/Common";
import { useNavigate } from "react-router-dom";

export const NotFoundWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 3.9rem);

  background-image: linear-gradient(
    to bottom,
    rgba(50, 50, 50, 1),
    rgba(153, 136, 189, 1)
  );

  transition: all 0.3s ease-in-out;

  .notfound-body {
    display: flex;
    flex-wrap: wrap;

    justify-content: center;
  }

  .lottie-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: end;
    margin: 2rem;
    min-width: 330px;
    max-width: 500px;
  }

  .info-text-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: end;
    margin: 0rem 2rem;
    margin-bottom: 4rem;
    color: ${Common.colors.white01};
    font-family: "Noto Sans KR", serif;
  }

  .title-text {
    font-weight: 700;
    transition: all 0.3s ease-in-out;
    margin-top: 0;

    @media (min-width: 768px) {
      font-size: 3rem;
    }
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 500px) {
      font-size: 1.5rem;
    }
  }

  .info-text {
    margin: 0.4rem 0rem;
  }

  .btn-wrapper {
    margin-top: 1.5rem;
  }
`;

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

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundWrapper>
      <div className="notfound-body">
        <motion.div
          className="lottie-wrapper"
          initial={{ opacity: 0, x: -40 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.1 },
          }}
        >
          <Lottie
            options={options(errorpage)}
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>
        <div className="info-text-wrapper">
          <motion.p
            className="title-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.3 },
            }}
          >
            Page Not Found
          </motion.p>
          <motion.p
            className="info-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.7 },
            }}
          >
            페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
          </motion.p>
          <motion.p
            className="info-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.9 },
            }}
          >
            입력하신 주소가 정확한지 확인해주세요.
          </motion.p>
          <motion.div
            className="btn-wrapper"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,

              transition: { delay: 1.1 },
            }}
          >
            <TranslucentBtn
              text={"홈으로 가기"}
              onClick={() => navigate("/")}
            ></TranslucentBtn>
          </motion.div>
        </div>
      </div>
    </NotFoundWrapper>
  );
};

export default NotFound;
