import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import { TestWrapper } from "../styles/TestEmotion";
import TranslucentBtn from "../components/TranslucentBtn";
import test_00 from "../assets/lottie/testpage_00.json";

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

const TestResult = () => {
  const navigate = useNavigate();

  return (
    <TestWrapper>
      <motion.div
        className="testresult-body"
        animate={{ scale: 1, y: 0, opacity: 1 }}
        initial={{ scale: 0.5, y: 50, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <>
          <p className="type-text">나의 유형은</p>
          <div className="result-lottie-wrapper">
            <Lottie
              options={options(test_00)}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <p className="level">싸움을 참지 못하는 다람쥐</p>
          <p className="result-content">
            싸움을 참지 못하는 다람쥐 유형의 사람들은 Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book.
          </p>
        </>
        <div className="rcm-wrapper">
          <p className="rcm-text">나와 잘 맞는 게임</p>
          <div className="rcm-game-wrapper">
            <div className="single-game">
              <div className="gameimg-wrapper">
                <img className="game-img" alt="game_img" />
              </div>
              <p className="game-title">게임 이름 1</p>
            </div>
            <div className="single-game">
              <div className="gameimg-wrapper">
                <img className="game-img" alt="game_img" />
              </div>
              <p className="game-title">게임 이름 1</p>
            </div>
          </div>
        </div>
        <div className="btns-wrapper">
          <div className="single-btn">
            <TranslucentBtn
              text={"다시하기"}
              onClick={() => navigate("/test")}
            ></TranslucentBtn>
          </div>
          <div className="single-btn">
            {/* todo : 공유 기능 만들기 */}
            <TranslucentBtn text={"공유하기"}></TranslucentBtn>
          </div>
        </div>
      </motion.div>
    </TestWrapper>
  );
};

export default TestResult;
