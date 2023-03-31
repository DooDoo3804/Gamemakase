import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import { TestWrapper } from "../styles/TestEmotion";
import TranslucentBtn from "../components/TranslucentBtn";
import testresult_01 from "../assets/lottie/testresult_01.json";
import testresult_02 from "../assets/lottie/testresult_02.json";
import testresult_03 from "../assets/lottie/testresult_03.json";
import testresult_04 from "../assets/lottie/testresult_04.json";
import testresult_05 from "../assets/lottie/testresult_05.json";
import testresult_06 from "../assets/lottie/testresult_06.json";
import testresult_07 from "../assets/lottie/testresult_07.json";
import testresult_08 from "../assets/lottie/testresult_08.json";

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
      name: "액션 애호가",
      description:
        '"힘을 무찌를 수 있는 건 오직 더 강한 힘뿐이다." - 알버트 웨스커\n《바이오하자드 7 레지던트 이블 》\n\n당신은 액션 애호가 (Action Enthusiast) 입니다!\n액션 애호가는 도전적이고 모험적인 성격을 가진 사람들입니다. 겉으로는 활동적이고 용기있어 보이지만, 사실 따뜻한 마음을 간직하고 있습니다. 경쟁과 협동을 즐기며, 게임에서 빠른 결정과 도전적인 레벨을 극복하는 것을 좋아합니다.',
      lottie: testresult_01,
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
      name: "어드벤쳐 애호가",
      description:
        '"모든 모험은 결국 삶의 양식이 되기 떄문에 인생에 헛된 것은 하나도 없다." - 미야모토 시게루\n\n당신은 모험 정신 가득한 어드벤처 애호가 (Adventure Enthusiast) 입니다!\n어드벤처 애호가는 호기심이 많고 탐험을 즐기는 사람들입니다. 겉으로는 다양한 경험을 추구하며, 새로운 것에 도전하는 것을 좋아합니다. 게임에서도 그들은 스토리, 탐험, 그리고 상호작용을 중요하게 여깁니다.',
      lottie: testresult_02,
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
      name: "전략 마니아",
      description:
        '"순순히 금을 내놓는다면 유혈사태는 일어나지 않을 것입니다." - 마하트마 간디\n《시드 마이어의 문명 V》\n\n당신은 체계적인 전략 마니아 (Strategic Maniac) 입니다!\n전략 마니아는 계획적이고 체계적인 사고를 가진 사람들입니다. 겉으로는 침착하고 냉정해 보이지만, 사실 게임에서 승리를 위한 전략을 세우는 것을 즐깁니다. 게임에서도 그들은 미래를 예측하고, 계획을 세우며, 상대방의 움직임을 분석하는 것을 중요하게 여깁니다.',
      lottie: testresult_03,
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
      name: "RPG 애호가",
      description:
        '"우리가 사는 현실은 망가졌다. 게임 디자이너들이 망가진 현실을 고칠 수 있다." - 제인 맥고니걸\n\n당신은 RPG 애호가 (RPG Enthusiast)입니다!\nRPG 애호가는 상상력이 풍부하고 이야기에 몰입하기 좋아하는 사람들입니다. 캐릭터를 만들고 성장시켜나가는 과정에서 느껴지는 성취감과 이야기를 경험하는 것을 좋아합니다. RPG 게임은 여러가지 선택과 결정을 내리는 것을 요구하기 때문에, 자신의 결정이 이후 이야기에 어떤 영향을 미치는지를 탐구하는 것을 좋아합니다.',
      lottie: testresult_04,
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
      name: "인디 게임 애호가",
      description:
        "당신은 창의적인 인디 게임 애호가 (Creative Indie Enthusiast) 입니다!\n\n인디 게임 애호가는 독창적이고 창의적인 게임을 즐기는 사람들입니다. 겉으로는 다양한 아이디어와 독특한 게임 메커니즘에 관심이 많으며, 게임에서 그들은 새로운 경험과 도전을 추구합니다.",
      lottie: testresult_05,
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
      name: "캐주얼 게임 애호가",
      description:
        "당신은 캐주얼 게임 애호가(Casual Gamer)입니다!\n\n캐주얼 게임 애호가는 일상적이고 무난한 게임을 즐기는 사람들입니다. 게임을 즐길 때에는 경쟁보다는 즐길거리를 중요시하며, 스트레스를 푸는 용도로 즐기는 경우가 많습니다. 간단하면서도 중독성이 높은 게임으로, 다른 유저들과 함께 진행하는 재미가 있습니다. 위에서 인용한 Walt Disney의 명언처럼, 게임은 열정과 재미를 제공하는 것 외에도, 더 많은 것을 배울 수 있는 유익한 측면도 가지고 있습니다. 게임을 즐기면서 새로운 것을 배우고, 자신만의 재미있는 경험을 만들어보세요!",
      lottie: testresult_06,
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
      name: "시뮬레이션 열정가",
      description:
        '"모방은 누구나 할 수 있지만 남보다 먼저 개혁하는 것은 아무나 할 수 없다." - Columbus\n\n당신은 시뮬레이션 열정가(Simulation Enthusiast)입니다.\n시뮬레이션 열정가들은 매우 창의적이며, 생각해낸 아이디어를 현실에 구현하는 능력이 뛰어납니다. 이들은 적극적으로 정보를 수집하고 분석하는 능력을 지니고 있으며, 문제 상황에서도 집중력을 유지하며 해결책을 찾아냅니다.\n당신은 시간을 보내면서 새로운 경험을 추구하는 열정적인 사람입니다. 시뮬레이션 게임을 즐기면서 현실에서는 어려운 경험을 할 수 있고, 상상력을 발휘하며 새로운 아이디어를 창출할 수 있습니다.',
      lottie: testresult_07,
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
      name: "스포츠 열정가",
      description:
        '"절대 안 된다는 말은 하지 말아라. 한계는 두려움과 마찬가지로 환상일 뿐이다." - 마이클 조던\n\n당신은 스포츠 열정가(Sports Enthusiast)입니다.\n스포츠 열정가는 경쟁적인 성향과 끊임없는 도전을 즐기는 성격으로, 스포츠 경기에서 최고의 성과를 이루기 위해 노력하는 것을 좋아합니다. 이들은 인내심과 강인함을 지니고 있으며, 힘든 시기에도 포기하지 않고 계속해서 자신의 목표를 추구합니다. 또한 이들은 타인에게 대한 관심이 많으며, 팀워크를 중요시하며 협동심이 뛰어납니다.',
      lottie: testresult_08,
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
