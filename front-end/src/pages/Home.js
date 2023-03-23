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

const Home = () => {
  const navigate = useNavigate();
  const [recommendGames, setRecommendGames] = useState([]);
  const [popularGames, setPopularGames] = useState([]);
  // const [moreGames, setMoreGames] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
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

  const moreGames = [
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

  // const getMoreGames = useCallback(async () => {
  //   setIsLoading(true);

  //   await axios
  //     .get(
  //       `${BACKEND_URL}api/recommend/games/${userId}?page=${popularNo.current}&size=${size}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       if (response.data.length) {
  //         popularNo.current += 1;
  //       }
  //       set((reviewData) => [...reviewData, ...response.data]);
  //       setHasNextPage(response.data.length === 12);
  //       setReviewLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setReviewLoading(false);
  //     });
  // });

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
            <div className="rcm-title">나를 위한 게임</div>
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
            <div className="rcm-title">인기 게임</div>
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
      </RecommendWrapper>
    </HomeWrapper>
  );
};

export default Home;
