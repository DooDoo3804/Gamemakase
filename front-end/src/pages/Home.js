import { useNavigate } from "react-router";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";
import Lottie from "react-lottie";
import {
  HomeWrapper,
  Banner,
  RecommendWrapper,
  SingleGame,
  GamesWrapper,
  MoreGamesWrapper,
} from "../styles/HomeEmotion";
import banner_img from "../assets/banner_img.json";
import banner_img2 from "../assets/banner_img2.json";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const navigate = useNavigate();
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [ref, inView] = useInView();

  // 임시 데이터
  const recommendGames = [
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

  const popularGames = [
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

  const option1 = {
    loop: true,
    autoplay: true,
    animationData: banner_img,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const option2 = {
    loop: true,
    autoplay: true,
    animationData: banner_img2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const renderGames = (games) => {
    const result = [];

    for (let i = 0; i < games.length; i++) {
      result.push(
        <SwiperSlide key={games[i].gameId}>
          <SingleGame onClick={() => navigate(`/detail/${games[i].gameId}`)}>
            <div>
              <div className="img-wrapper">
                <img
                  src={games[i].gameImage}
                  alt="game_img"
                  className="game-img"
                />
              </div>
              <p className="game-title">{games[i].gameName}</p>
            </div>
          </SingleGame>
        </SwiperSlide>
      );
    }

    return result;
  };

  const renderMoreGames = () => {
    const result = [];

    for (let i = 0; i < moreGames.length; i++) {
      result.push(
        <div key={i} className="single-game">
          {moreGames[i].gameName}
        </div>
      );
    }
    return result;
  };

  return (
    <HomeWrapper>
      <Swiper
        modules={[Autoplay, Navigation, Pagination, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <Banner>
            <div className="banner1">
              <div className="text-wrapper">
                <p className="subtitle">겜마카세가 추천하는,</p>
                <p className="title">오늘의 게임 5선</p>
              </div>
            </div>
          </Banner>
        </SwiperSlide>
        <SwiperSlide>
          <Banner>
            <div className="banner2">
              <div className="lottie-wrapper">
                <div className="single-lottie">
                  <Lottie options={option2} height={300} width={300} />
                </div>

                <div className="single-lottie">
                  <Lottie options={option1} height={180} width={180} />
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
        {recommendGames ? (
          <div>
            <div className="rcm-title">나를 위한 게임</div>
            <Swiper
              modules={[Navigation]}
              spaceBetween={0}
              slidesPerView={3}
              navigation
            >
              {renderGames(recommendGames)}
            </Swiper>
          </div>
        ) : null}
        {popularGames ? (
          <div>
            <div className="rcm-title">인기 게임</div>
            <Swiper
              modules={[Navigation]}
              spaceBetween={0}
              slidesPerView={3}
              navigation
            >
              {renderGames(popularGames)}
            </Swiper>
          </div>
        ) : null}
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
