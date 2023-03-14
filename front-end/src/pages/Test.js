import {
  ProgressBarWrapper,
  SingleProgressBar,
  TestWrapper,
} from "../styles/TestEmotion";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import test_00 from "../assets/lottie/testpage_00.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const ProgressBar = ({ num, index }) => {
  const renderBars = () => {
    const result = [];

    for (let i = 0; i < num; i++) {
      result.push(
        <SingleProgressBar key={i} active={i < index} num={num}>
          <div className="inactive-bar"></div>
          <motion.div
            className="active-bar"
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.5 }}
            whileInView={{ scaleX: 1 }}
          ></motion.div>
        </SingleProgressBar>
      );
    }

    return result;
  };

  return <ProgressBarWrapper>{renderBars()}</ProgressBarWrapper>;
};

const Test = () => {
  const [index, setIndex] = useState(1);
  const navigate = useNavigate();

  return (
    <TestWrapper>
      <motion.div
        className="test-body"
        animate={{ scale: 1, y: 0, opacity: 1 }}
        initial={{ scale: 0.5, y: 50, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProgressBar num={12} index={index}></ProgressBar>
        <>
          <div className="lottie-wrapper">
            <Lottie
              options={options(test_00)}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <p className="level">
            {index < 10 ? "0" : null}
            {index}
          </p>
          <p className="content">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry?
          </p>
        </>
        {index < 12 ? (
          <button onClick={() => setIndex(index + 1)}>index + 1</button>
        ) : (
          <button onClick={() => navigate("/testResult/1")}>결과 보기</button>
        )}
      </motion.div>
    </TestWrapper>
  );
};

export default Test;
