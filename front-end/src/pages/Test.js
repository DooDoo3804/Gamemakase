import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import { motion } from "framer-motion";

import {
  ProgressBarWrapper,
  SingleProgressBar,
  TestWrapper,
} from "../styles/TestEmotion";
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
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  let score = {
    액션: 0,
    어드벤쳐: 0,
    전략: 0,
    RPG: 0,
    인디: 0,
    캐주얼: 0,
    시뮬: 0,
    스포츠: 0,
  };

  const renderQuestions = () => {
    const test = [
      {
        lottie: test_00,
        title: "게임 성향 테스트",
        question: "시작해볼까요?",
        answers: [{ text: "바로가기", value: [] }],
      },
      {
        lottie: test_00,
        title: "01",
        question: "질문을 시작해볼까요?",
        answers: [
          { text: "이렇게 한다", value: ["전략", "인디", "시뮬"] },
          { text: "저렇게 한다", value: ["액션", "RPG"] },
        ],
      },
      {
        lottie: test_00,
        title: "02",
        question: "질문을 시작해볼까요?",
        answers: [
          { text: "이렇게 한다", value: ["전략", "인디", "시뮬"] },
          { text: "저렇게 한다", value: ["액션", "RPG"] },
        ],
      },
      {
        lottie: test_00,
        title: "03",
        question: "질문을 시작해볼까요?",
        answers: [
          { text: "이렇게 한다", value: ["전략", "인디", "시뮬"] },
          { text: "저렇게 한다", value: ["액션", "RPG"] },
        ],
      },
      {
        lottie: test_00,
        title: "01",
        question: "질문을 시작해볼까요?",
        answers: [
          { text: "이렇게 한다", value: ["전략", "인디", "시뮬"] },
          { text: "저렇게 한다", value: ["액션", "RPG"] },
        ],
      },
      {
        lottie: test_00,
        title: "02",
        question: "질문을 시작해볼까요?",
        answers: [
          { text: "이렇게 한다", value: ["전략", "인디", "시뮬"] },
          { text: "저렇게 한다", value: ["액션", "RPG"] },
        ],
      },
      {
        lottie: test_00,
        title: "03",
        question: "질문을 시작해볼까요?",
        answers: [
          { text: "이렇게 한다", value: ["전략", "인디", "시뮬"] },
          { text: "저렇게 한다", value: ["액션", "RPG"] },
        ],
      },
      {
        lottie: test_00,
        title: "01",
        question: "질문을 시작해볼까요?",
        answers: [
          { text: "이렇게 한다", value: ["전략", "인디", "시뮬"] },
          { text: "저렇게 한다", value: ["액션", "RPG"] },
        ],
      },
      {
        lottie: test_00,
        title: "02",
        question: "질문을 시작해볼까요?",
        answers: [
          { text: "이렇게 한다", value: ["전략", "인디", "시뮬"] },
          { text: "저렇게 한다", value: ["액션", "RPG"] },
        ],
      },
      {
        lottie: test_00,
        title: "03",
        question: "질문을 시작해볼까요?",
        answers: [
          { text: "이렇게 한다", value: ["전략", "인디", "시뮬"] },
          { text: "저렇게 한다", value: ["액션", "RPG"] },
        ],
      },
    ];

    const handleClick = (values) => {
      setIndex(index + 1);
      for (let i = 0; i < values.length; i++) {
        score[values[i]] += 1;
      }
      // console.log(score);
    };

    return (
      <>
        <div className="lottie-wrapper">
          <Lottie
            options={options(test[index].lottie)}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <p className="level">{test[index].title}</p>
        <p className="content">{test[index].question}</p>
        <div className="btns-wrapper">
          {test[index].answers.map((item, idx) => {
            return (
              <TranslucentBtn
                onClick={() => handleClick(item.value)}
                key={idx}
                text={item.text}
              ></TranslucentBtn>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <TestWrapper>
      <motion.div
        className="test-body"
        animate={{ scale: 1, y: 0, opacity: 1 }}
        initial={{ scale: 0.5, y: 50, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProgressBar num={12} index={index}></ProgressBar>
        <>{renderQuestions()}</>
        {index < 12 ? null : ( // <button onClick={() => setIndex(index + 1)}>index + 1</button>
          <button onClick={() => navigate("/testResult/1")}>결과 보기</button>
        )}
      </motion.div>
    </TestWrapper>
  );
};

export default Test;
