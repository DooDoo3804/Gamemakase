import { useLocation, useNavigate } from "react-router-dom";
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

const renderResult = (resultId) => {
  const results = {
    1: {
      name: "액션",
      description: "dasdfasdf",
      lottie: test_00,
      games: [
        {
          gameName: "PUBG: BATTLEGROUNDS",
          gameId: "578080",
          gameImage:
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg?t=1658287469",
        },
        {
          gameName: "ELDEN RING",
          gameId: "1245620",
          gameImage:
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg?t=1654259241",
        },
      ],
    },
    2: {
      name: "어드벤쳐",
      description: "",
      lottie: test_00,
      games: [
        {
          gameName: "Rust",
          gameId: "252490",
          gameImage:
            "https://cdn.akamai.steamstatic.com/steam/apps/252490/header.jpg?t=1656003795",
        },
        {
          gameName: "The Forest",
          gameId: "242760",
          gameImage:
            "https://cdn.akamai.steamstatic.com/steam/apps/242760/header.jpg?t=1590522045",
        },
      ],
    },
    3: {
      name: "전략",
      description: "",
      lottie: test_00,
      games: [
        {
          gameName: "Arma 3",
          gameId: "107410",
          gameImage:
            "https://cdn.akamai.steamstatic.com/steam/apps/107410/header.jpg?t=1655998601",
        },
        {
          gameName: "Sid Meier’s Civilization® VI",
          gameId: "289070",
          gameImage:
            "https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg?t=1658335453",
        },
      ],
    },
    4: {
      name: "RPG",
      description: "",
      lottie: test_00,
      games: [
        {
          gameName: "The Witcher® 3: Wild Hunt",
          gameId: "292030",
          gameImage:
            "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg?t=1646996408",
        },
        {
          gameName: "Stardew Valley",
          gameId: "413150",
          gameImage:
            "https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg?t=1608624324",
        },
      ],
    },
    5: {
      name: "인디",
      description: "",
      lottie: test_00,
      games: [
        {
          gameName: "Terraria",
          gameId: "105600",
          gameImage:
            "https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg?t=1590092560",
        },
        {
          gameName: "Don't Starve Together",
          gameId: "322330",
          gameImage:
            "https://cdn.akamai.steamstatic.com/steam/apps/322330/header_alt_assets_31.jpg?t=1656607265",
        },
      ],
    },
    6: {
      name: "캐주얼",
      description: "",
      lottie: test_00,
      games: [
        {
          gameName: "Among Us",
          gameId: "945360",
          gameImage:
            "https://cdn.akamai.steamstatic.com/steam/apps/945360/header.jpg?t=1646296970",
        },
        {
          gameName: "Vampire Survivors",
          gameId: "1794680",
          gameImage:
            "https://cdn.akamai.steamstatic.com/steam/apps/1794680/header.jpg?t=1657145362",
        },
      ],
    },
    7: {
      name: "시뮬",
      description: "",
      lottie: test_00,
      games: [
        {
          gameName: "Euro Truck Simulator 2",
          gameId: "227300",
          gameImage:
            "https://cdn.akamai.steamstatic.com/steam/apps/227300/header.jpg?t=1656428921",
        },
        {
          gameName: "Factorio",
          gameId: "427520",
          gameImage:
            "https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg?t=1620730652",
        },
      ],
    },
    8: {
      name: "스포츠",
      description: "",
      lottie: test_00,
      games: [
        {
          gameName: "Fall Guys",
          gameId: "1097150",
          gameImage:
            "https://cdn.akamai.steamstatic.com/steam/apps/1097150/header.jpg?t=1656022034",
        },
        {
          gameName: "Forza Horizon 5",
          gameId: "1551360",
          gameImage:
            "https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg?t=1658260306",
        },
      ],
    },
  };

  if (resultId < 1 || resultId > 8) {
    window.location.replace("/404");
  }

  return (
    <>
      <>
        <p className="type-text">나의 유형은</p>
        <div className="result-lottie-wrapper">
          <Lottie
            options={options(results[resultId].lottie)}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <p className="level">{results[resultId].name}</p>
        <p className="result-content">{results[resultId].description}</p>
      </>
      <div className="rcm-wrapper">
        <p className="rcm-text">나와 잘 맞는 게임</p>
        <div className="rcm-game-wrapper">
          <div
            className="single-game"
            onClick={() =>
              window.location.assign(
                `/detail/${results[resultId].games[0].gameId}`
              )
            }
          >
            <div className="gameimg-wrapper">
              <img
                className="game-img"
                alt="game_img"
                src={results[resultId].games[0].gameImage}
              />
            </div>
            <p className="game-title">{results[resultId].games[0].gameName}</p>
          </div>
          <div
            className="single-game"
            onClick={() =>
              window.location.assign(
                `/detail/${results[resultId].games[1].gameId}`
              )
            }
          >
            <div className="gameimg-wrapper">
              <img
                className="game-img"
                alt="game_img"
                src={results[resultId].games[1].gameImage}
              />
            </div>
            <p className="game-title">{results[resultId].games[1].gameName}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const TestResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resultId = location.pathname.split("/").reverse()[0];

  return (
    <TestWrapper>
      <motion.div
        className="testresult-body"
        animate={{ scale: 1, y: 0, opacity: 1 }}
        initial={{ scale: 0.5, y: 50, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {renderResult(resultId)}
        <div className="btns-wrapper">
          <div className="single-btn">
            <TranslucentBtn
              text={"다시하기"}
              onClick={() => navigate("/test")}
            ></TranslucentBtn>
          </div>
        </div>
      </motion.div>
    </TestWrapper>
  );
};

export default TestResult;
