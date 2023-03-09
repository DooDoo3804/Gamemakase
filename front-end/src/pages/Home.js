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
  MoreGamesWrapper,
} from "../styles/HomeEmotion";
import banner_img from "../assets/banner_img.json";
import banner_img2 from "../assets/banner_img2.json";
import banner_plate from "../assets/banner_plate.svg";

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

  const renderTodayGames = () => {
    const result = [];

    for (let i = 0; i < todayGames.length; i++) {
      result.push(
        <div key={i} className="single-game">
          <img
            src={todayGames[i].gameImage}
            alt="game_img"
            className="game-img"
          />
          <img src={banner_plate} alt="plate" className="plate" />
        </div>
      );
    }

    return result;
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
        // autoplay={{ delay: 4000, disableOnInteraction: false }}
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
              <div className="games-wrapper">
                {todayGames ? renderTodayGames() : null}
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
          </div>
        ) : null}
        {popularGames ? (
          <div>
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
