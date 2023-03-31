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
import TranslucentLongBtn from "../components/TranslucentLongBtn";

import test_00 from "../assets/lottie/testpage_00.json";
import test_01 from "../assets/lottie/testpage_01.json";
import test_02 from "../assets/lottie/testpage_02.json";
import test_03 from "../assets/lottie/testpage_03.json";
import test_04 from "../assets/lottie/testpage_04.json";
import test_05 from "../assets/lottie/testpage_05.json";
import test_06 from "../assets/lottie/testpage_06.json";
import test_07 from "../assets/lottie/testpage_07.json";
import test_08 from "../assets/lottie/testpage_08.json";
import test_09 from "../assets/lottie/testpage_09.json";
import test_10 from "../assets/lottie/testpage_10.json";
import test_11 from "../assets/lottie/testpage_11.json";
import test_12 from "../assets/lottie/testpage_12.json";

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
  const [score, setScore] = useState({
    액션: { name: "액션", value: 0, address: 1 },
    어드벤쳐: { name: "어드벤쳐", value: 0, address: 2 },
    전략: { name: "전략", value: 0, address: 3 },
    RPG: { name: "RPG", value: 0, address: 4 },
    인디: { name: "인디", value: 0, address: 5 },
    캐주얼: { name: "캐주얼", value: 0, address: 6 },
    시뮬: { name: "시뮬", value: 0, address: 7 },
    스포츠: { name: "스포츠", value: 0, address: 8 },
  });

  const renderQuestions = () => {
    const test = [
      {
        lottie: test_00,
        title: "게임 성향 테스트",
        question: "시작해볼까요?",
        answers: [{ text: "바로가기", value: [] }],
      },
      {
        lottie: test_01,
        title: "01",
        question: "이세계로 떨어진 당신, 주위에 먼저 보이는 것은?",
        answers: [
          { text: "몬스터 무리", value: ["액션", "RPG", "전략", "어드벤쳐"] },
          { text: "친절한 주민", value: ["인디", "캐주얼", "시뮬", "스포츠"] },
        ],
      },
      {
        lottie: test_02,
        title: "02",
        question: "오랜만에 휴가를 떠났다. 나는",
        answers: [
          {
            text: "실내에 있기 싫다. 바로 밖으로 뛰쳐나간다.",
            value: ["액션", "시뮬", "스포츠", "어드벤쳐"],
          },
          {
            text: "나가는 건 귀찮은 일이다. 여유를 즐긴다.",
            value: ["인디", "캐주얼", "RPG", "전략"],
          },
        ],
      },
      {
        lottie: test_03,
        title: "03",
        question:
          "우연히 발견한 타임머신을 타고 시간여행을 떠났다. 도착한 시대는?",
        answers: [
          {
            text: "어느 유럽의 중세시대",
            value: ["액션", "어드벤쳐", "전략", "RPG"],
          },
          {
            text: "사이버펑크 2077",
            value: ["인디", "캐주얼", "스포츠", "시뮬"],
          },
        ],
      },
      {
        lottie: test_04,
        title: "04",
        question:
          "상대방의 움직임을 예측하여 승리하고자 할 때, 당신이 선택하는 전략은?",
        answers: [
          {
            text: "상대방의 패턴을 파악하여 그에 맞게 대응하는 전략",
            value: ["액션", "어드벤쳐", "전략", "RPG"],
          },
          {
            text: "감각적으로 상대방의 움직임을 파악하고 그에 맞게 대응하는 전략",
            value: ["인디", "캐주얼", "스포츠", "시뮬"],
          },
        ],
      },
      {
        lottie: test_05,
        title: "05",
        question:
          "보상을 많이 주는 퀘스트를 수행하던 중, 엄청나게 강한 적이 나타났다.",
        answers: [
          {
            text: "적을 물리칠 수 있을 만큼 충분히 강해졌다면 전략을 짜고 도전해본다.",
            value: ["전략", "RPG"],
          },
          {
            text: "적의 능력치가 나에 비해 너무나도 높다면 일단 도망치고 본다.",
            value: ["시뮬", "캐주얼", "인디"],
          },
          {
            text: "만 번 죽더라도 계속해서 도전한다.",
            value: ["액션", "어드벤쳐", "스포츠"],
          },
        ],
      },
      {
        lottie: test_06,
        title: "06",
        question:
          "적군 진영에 들키지 않고 잠입해서 정보를 빼와야 한다! 어떻게 해야 될까?!",
        answers: [
          {
            text: "조심스럽게 적들의 경로를 분석하며 기회를 엿본다.",
            value: ["전략", "시뮬"],
          },
          {
            text: "적들을 속임수로 농락하며 진행한다.",
            value: ["인디", "캐주얼", "어드벤쳐"],
          },
          {
            text: "적들을 제거하면서 최대한 빠르게 목표 지점으로 접근한다.",
            value: ["액션", "스포츠", "RPG"],
          },
        ],
      },
      {
        lottie: test_07,
        title: "07",
        question: "전략 / 시뮬레이션 게임에서 적국과의 협상이 무산되었다.",
        answers: [
          {
            text: "그래도 전쟁은 안돼! 전쟁을 피하기 위해 계속 추가적인 협상을 시도한다.",
            value: ["인디", "캐주얼"],
          },
          {
            text: "내 편 아니면 적이다! 병사를 길러 바로 적국에게 선제 공격을 가한다.",
            value: ["액션", "어드벤쳐", "스포츠"],
          },
          {
            text: "일단 힘을 기르자! 국방력을 기르고 동맹국들과 협력하여 언제 올지 모를 적국의 공격에 대응한다.",
            value: ["전략", "시뮬", "RPG"],
          },
        ],
      },
      {
        lottie: test_08,
        title: "08",
        question:
          "모든 적들을 물리치고 마지막까지 살아 남아야 하는 상황! 나와 다른 플레이어 한 명만 남았다.",
        answers: [
          {
            text: "상대의 위치를 파악하고, 접근해서 상대방을 제거하고 승리를 쟁취한다.",
            value: ["액션", "어드벤쳐", "스포츠"],
          },
          {
            text: "상대의 위치를 파악한 후 섣불리 접근하지 않고, 거리를 유지하며 멀리서 원거리 공격을 시도한다.",
            value: ["전략", "시뮬"],
          },
          {
            text: "지형 지물을 활용해 안전한 곳에 숨어 기다렸다 상대가 오면 기습한다",
            value: ["인디", "캐주얼"],
          },
        ],
      },
      {
        lottie: test_09,
        title: "09",
        question: "모험 게임을 하던 당신, 수상한 통로를 발견했다!",
        answers: [
          {
            text: "모험이야말로 게임의 즐거움! 비밀 통로를 따라 들어가 새로운 지역을 탐험한다.",
            value: ["어드벤쳐", "인디", "캐주얼"],
          },
          {
            text: "일단 메인 퀘스트 먼저! 현재 탐험하던 지역을 계속 탐험하고 새로운 비밀 통로는 나중에 다시 찾아온다.",
            value: ["RPG", "액션", "스포츠"],
          },
          {
            text: "돌다리도 두들겨 보고! 인터넷에 해당 비밀 통로에 대한 내용을 검색해 만반의 준비를 하고 통로에 들어간다.",
            value: ["전략", "시뮬"],
          },
        ],
      },
      {
        lottie: test_10,
        title: "10",
        question:
          "파티원들과 함께 레이드를 통해 강력한 보스를 잡고 희귀한 아이템을 얻었다.",
        answers: [
          {
            text: "신상이다! 획득한 아이템을 바로 내 캐릭터에 장착해서 써본다.",
            value: ["RPG", "액션", "어드벤쳐"],
          },
          {
            text: "부르는 게 값! 상점에 비싸게 팔아서 돈을 번다.",
            value: ["전략", "시뮬"],
          },
          {
            text: "팀원사랑 나라사랑. 마침 해당 아이템을 필요로 하던 다른 파티원에게 양보한다.",
            value: ["캐주얼", "인디", "스포츠"],
          },
        ],
      },
      {
        lottie: test_11,
        title: "11",
        question: "여행을 떠나는 당신, 함께할 동료를 선택할 수 있다면?",
        answers: [
          { text: "귀엽고 애교 많은 고양이", value: ["인디"] },
          { text: "낭만 가득한 드래곤", value: ["RPG", "어드벤쳐", "액션"] },
          {
            text: "언제나 나만을 바라봐주는 충성심 강한 강아지",
            value: ["캐주얼", "스포츠"],
          },
          {
            text: "아이언맨 부럽지 않은 최첨단 AI 비서",
            value: ["전략", "시뮬"],
          },
        ],
      },
      {
        lottie: test_12,
        title: "12",
        question:
          "퀘스트 보상으로 새로운 스킬을 하나 익힐 수 있다. 어느 것을 고를까?",
        answers: [
          {
            text: "낮은 확률로 히든 스킬을 획득할 수 있는 랜덤 스킬",
            value: ["어드벤쳐"],
          },
          {
            text: "아무런 효과는 없지만 예쁜 이펙트를 볼 수 있는 불꽃놀이 스킬",
            value: ["인디", "스포츠"],
          },
          {
            text: "한번에 적들을 몰살할 수 있는 강력한 공격 스킬",
            value: ["RPG", "액션"],
          },
          {
            text: "새로운 아이템을 만들 수 있는 제작 스킬",
            value: ["캐주얼", "전략", "시뮬"],
          },
        ],
      },
    ];

    const handleClick = (values) => {
      let tempScore = score;
      let result = [];
      let testResult = [];

      for (let i = 0; i < values.length; i++) {
        tempScore[values[i]].value += 1;
      }
      setIndex(index + 1);
      setScore(tempScore);

      if (index === 12) {
        for (let name in tempScore) {
          result.push([
            tempScore[name].name,
            tempScore[name].value,
            tempScore[name].address,
          ]);
        }
        testResult = result.sort((a, b) => {
          return b[1] - a[1];
        });
        navigate(`/testresult/${testResult[0][2]}`);
      }
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
            if (item.text.length > 8) {
              return (
                <TranslucentLongBtn
                  onClick={() => handleClick(item.value)}
                  key={idx}
                  text={item.text}
                ></TranslucentLongBtn>
              );
            } else {
              return (
                <TranslucentBtn
                  onClick={() => handleClick(item.value)}
                  key={idx}
                  text={item.text}
                ></TranslucentBtn>
              );
            }
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
      </motion.div>
    </TestWrapper>
  );
};

export default Test;
