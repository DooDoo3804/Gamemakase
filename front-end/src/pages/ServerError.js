import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "react-lottie";

import errorpage from "../assets/lottie/errorpage.json";
import TranslucentBtn from "../components/TranslucentBtn";
import { NotFoundWrapper } from "./NotFound.js";

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

const ServerError = () => {
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
            Internal Server Error
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
            페이지가 응답하지 않습니다.
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
            잠시 기다리시거나, 나중에 다시 시도해주세요.
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

export default ServerError;
