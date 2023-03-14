import { TestWrapper } from "../styles/TestEmotion";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import lottiefile2 from "../assets/banner_img.json";

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

// 아래와 같이 사용
{
  /* <Lottie
  options={options(lottiefile2)}
  style={{ width: "100%", height: "100%" }}
/>; */
}

const Test = () => {
  return (
    <TestWrapper>
      <motion.div
        className="test-body"
        animate={{ scale: 1, y: 0, opacity: 1 }}
        initial={{ scale: 0.5, y: 50, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lottie-wrapper">
          <Lottie
            options={options(lottiefile2)}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <p className="level">01</p>
        <p className="content">질ㄴ문 내용이 ㄱ여 깅에 들ㅇ거아요</p>
      </motion.div>
    </TestWrapper>
  );
};

export default Test;
