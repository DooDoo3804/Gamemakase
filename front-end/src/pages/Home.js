import { useNavigate } from "react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";
import Lottie from "react-lottie";
import axios from "axios";
import { motion } from "framer-motion";
import {
  HomeWrapper,
  Banner,
  RecommendWrapper,
  MoreGamesWrapper,
} from "../styles/HomeEmotion";
import banner_img from "../assets/banner_img.json";
import banner_img2 from "../assets/banner_img2.json";
import tinyLoading from "../assets/tinyLoading.gif";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import GameCarousel from "../components/GameCarousel";
import GameClip from "../components/GameClip";
import { BACKEND_URL } from "../config";
import InfoIcon from "../components/InfoIcon";

const Home = () => {
  const navigate = useNavigate();
  const [recommendGames, setRecommendGames] = useState([]);
  const [popularGames, setPopularGames] = useState([]);
  const [moreGames, setMoreGames] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendLoading, setRecommendLoading] = useState(true);
  const [popularLoading, setPopularLoading] = useState(true);
  const swiperRef = useRef(null);
  const popularNo = useRef(0);
  const recommendNo = useRef(0);
  const [ref, inView] = useInView();

  const size = 20;
  const userId = 1;

  // 임시 데이터
  const todayGames = [
    {
      gameId: 1,
      gameName: "Stray",
      gameImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/1332010/header_292x136.jpg?t=1670349423",
    },
    {
      gameId: 2,
      gameName: "Cult of the Lamb",
      gameImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/1313140/header_292x136.jpg?t=1674826230",
    },
    {
      gameId: 3,
      gameName: "Help Me!",
      gameImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/1557780/header_292x136_koreana.jpg?t=1640234732",
    },
    {
      gameId: 4,
      gameName: "Call of Duty",
      gameImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/1767320/header_292x136_koreana.jpg?t=1642579277",
    },
    {
      gameId: 5,
      gameName: "The Past Within",
      gameImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/1515210/header_292x136.jpg?t=1676931955",
    },
  ];

  // const moreGames = [
  //   {
  //     gameId: 1,
  //     gameName: "Stray",
  //     gameImage:
  //       "https://cdn.akamai.steamstatic.com/steam/apps/1332010/header_292x136.jpg?t=1670349423",
  //   },
  //   {
  //     gameId: 2,
  //     gameName: "Cult of the Lamb",
  //     gameImage:
  //       "https://cdn.akamai.steamstatic.com/steam/apps/1313140/header_292x136.jpg?t=1674826230",
  //   },
  //   {
  //     gameId: 3,
  //     gameName: "Help Me!",
  //     gameImage:
  //       "https://cdn.akamai.steamstatic.com/steam/apps/1557780/header_292x136_koreana.jpg?t=1640234732",
  //   },
  //   {
  //     gameId: 4,
  //     gameName: "Call of Duty",
  //     gameImage:
  //       "https://cdn.akamai.steamstatic.com/steam/apps/1767320/header_292x136_koreana.jpg?t=1642579277",
  //   },
  //   {
  //     gameId: 5,
  //     gameName: "The Past Within",
  //     gameImage:
  //       "https://cdn.akamai.steamstatic.com/steam/apps/1515210/header_292x136.jpg?t=1676931955",
  //   },
  // ];

  useEffect(() => {
    // todo : 로그인했을 때만 실행하도록 수정
    // todo : 로그인 기능 만들어지면 api 변경
    axios
      .get(
        `${BACKEND_URL}api/recommend/games/${userId}?page=${recommendNo.current}&size=${size}`,
        {
          headers: { "Content-Type": "application/json", userId: 1 },
        }
      )
      .then(function (response) {
        // console.log(response.data);
        setRecommendGames(response.data);
        setRecommendLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 500) {
          window.location.replace("/500");
        } else {
        }
      });
    axios
      .get(`${BACKEND_URL}api/recommend/popular?size=${size}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        // console.log(response.data);
        setPopularGames(response.data);
        setPopularLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 500) {
          window.location.replace("/500");
        } else {
        }
      });
  }, []);

  useEffect(() => {
    // console.log(inView, hasNextPage);
    if (inView && hasNextPage) {
      setIsLoading(true);
      getMoreGames();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const getMoreGames = useCallback(async () => {
    setIsLoading(true);

    await axios
      .get(
        `${BACKEND_URL}api/recommend/games/${userId}?page=${popularNo.current}&size=${size}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        if (response.data.length) {
          popularNo.current += 1;
        }
        setMoreGames((moreGames) => [...moreGames, ...response.data]);
        setHasNextPage(response.data.length === 20);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  });

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

  const recommendText =
    "나에게 딱 맞는 게임을 찾아보세요!\n겜마카세는 나의 게임 플레이 내역과 12000여개의 게임, 100만 여개의 리뷰 정보를 결합하여 코사인 유사도를 계산하고, KNN 알고리즘을 활용해 매일매일 개인 맞춤형 게임을 추천해드립니다. \nKNN 알고리즘은 나와 플레이 성향이 비슷한 유저들의 플레이 기록을 바탕으로, 내가 플레이하지 않은 게임에 대한 나의 평가를 예측해 계산합니다. \n<나를 위한 게임>에서 지금 바로 새롭고 즐거운 게임 라이프를 즐겨보세요! \n * 개인 추천 내역은(내 플레이 기록에 변동이 있을 경우) 24시간마다 갱신됩니다.";

  const popularText =
    "지금 인기 있는 게임들을 만나보세요! \n겜마카세는 Peak CCU(Peak Concurrent Users, 최고 동시 접속자 수)를 기준으로 하여 다양한 장르의 최신 인기게임들을 제공합니다. \n<인기게임>에서 지금 이 순간 가장 핫한 게임들을 즐겨보세요!";

  const renderGames = (games) => {
    const result = [];

    for (let i = 0; i < games.length; i++) {
      result.push(
        <SwiperSlide key={games[i].gameId}>
          <img
            src={games[i].gameImage}
            alt="game_img"
            className="game-img"
            onClick={() => navigate(`/detail/${games[i].gameId}`)}
          />
          <p className="game-title">{games[i].gameName}</p>
        </SwiperSlide>
      );
    }

    return result;
  };

  const renderMoreGames = () => {
    const result = [];

    for (let i = 0; i < moreGames.length; i++) {
      result.push(
        <GameClip
          key={i}
          title={moreGames[i].gameName}
          gameId={moreGames[i].gameId}
          imgUrl={moreGames[i].gameImage}
          price={moreGames[i].price}
          window={moreGames[i].window}
          apple={moreGames[i].apple}
          linux={moreGames[i].linux}
        ></GameClip>
      );
    }
    return result;
  };

  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };
  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  return (
    <HomeWrapper>
      <Swiper
        modules={[Autoplay, Navigation, Pagination, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        ref={swiperRef}
      >
        <SwiperSlide>
          <Banner
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="banner1">
              <div className="text-wrapper">
                <p className="subtitle">겜마카세가 추천하는,</p>
                <p className="title">오늘의 게임 5선</p>
              </div>
              <div className="games-wrapper">
                <GameCarousel gameData={todayGames}></GameCarousel>
              </div>
            </div>
          </Banner>
        </SwiperSlide>
        <SwiperSlide>
          <Banner
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="banner2">
              <div className="lottie-wrapper">
                <div className="single-lottie">
                  <Lottie
                    options={options(banner_img2)}
                    height={300}
                    width={300}
                  />
                </div>

                <div className="single-lottie">
                  <Lottie
                    options={options(banner_img)}
                    height={180}
                    width={180}
                  />
                </div>
              </div>
              <div className="text-wrapper">
                <p className="subtitle">잘 맞는 게임을 알고 싶다면</p>
                <p className="title">게임 성향 테스트</p>
                <div className="test-btn" onClick={() => navigate("/test")}>
                  <p className="btn-text">테스트하기</p>
                </div>
              </div>
            </div>
          </Banner>
        </SwiperSlide>
      </Swiper>
      <RecommendWrapper>
        {recommendLoading ? (
          <div className="loading-wrapper">
            <img src={tinyLoading} alt="loading..." />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <div className="rcm-title">
              나를 위한 게임<InfoIcon text={recommendText}></InfoIcon>
            </div>
            <Swiper
              modules={[Navigation]}
              slidesPerView={3}
              spaceBetween={10}
              navigation
              breakpoints={{
                360: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                500: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
            >
              {renderGames(recommendGames)}
            </Swiper>
          </motion.div>
        )}
        {popularLoading ? (
          <div className="loading-wrapper">
            <img src={tinyLoading} alt="loading..." />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <div className="rcm-title">
              인기 게임<InfoIcon text={popularText}></InfoIcon>
            </div>
            <Swiper
              modules={[Navigation]}
              slidesPerView={3}
              spaceBetween={10}
              navigation
              breakpoints={{
                360: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                500: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
            >
              {renderGames(popularGames)}
            </Swiper>
          </motion.div>
        )}
        {popularGames ? (
          <div>
            <div className="rcm-title">많은 게임</div>
            <MoreGamesWrapper>{renderMoreGames()}</MoreGamesWrapper>
          </div>
        ) : null}
        {isLoading ? (
          <div className="loading-wrapper">
            <img src={tinyLoading} alt="loading..."></img>
          </div>
        ) : (
          <div ref={ref} className="scroll-handler" />
        )}
      </RecommendWrapper>
    </HomeWrapper>
  );
};

export default Home;
