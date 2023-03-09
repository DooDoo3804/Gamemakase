import { useNavigate } from "react-router-dom";
import { DetailWrapper, RecommendUsers } from "../styles/DetailEmotion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import scrap_img from "../assets/scrap_img.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";

const Detail = () => {
  const navigate = useNavigate();
  // 임시 데이터
  const gameData = {
    gameId: 1,
    gameName: "Melatonin",
    gamePrice: 50000,
    releaseDate: "2023-03-01",
    gameDescription:
      "Melatonin is a rhythm game about dreams and reality merging together. It uses animations and sound cues to keep you on beat without any intimidating overlays or interfaces. Harmonize through a variety of dreamy levels containing surprising challenges, hand-drawn art, and vibrant music.",
    metacriticScore: 60,
    averagePlaytime: 7,
    publisher: "블리자드",
    isKorean: true,
    isLiked: true,
    // isLiked: false,
    genres: [
      {
        genreId: 1,
        genreName: "전략",
      },
      {
        genreId: 2,
        genreName: "어드벤쳐",
      },
    ],
    images: [
      {
        imageId: 1,
        imagePath:
          "https://cdn.akamai.steamstatic.com/steam/apps/1585220/ss_3d3dfb1e10ab6c6ae11e7f1002b89f3353344ca7.1920x1080.jpg?t=1673291010",
      },
      {
        imageId: 2,
        imagePath:
          "https://cdn.akamai.steamstatic.com/steam/apps/1585220/ss_a556d9ce0a51e0245391ebe7b899804392c36be0.600x338.jpg?t=1673291010",
      },
      {
        imageId: 3,
        imagePath:
          "https://cdn.akamai.steamstatic.com/steam/apps/1585220/ss_e2b8065eb4f6ad6517f4a2358684fb7a0a61da1c.600x338.jpg?t=1673291010",
      },
    ],
    reviews: [
      {
        reviewId: 1,
        gameId: 2,
        reviewTitle: "재밌는 게임이에요",
        reviewContent: "이걸 이제야 알다니",
        reviewGrade: 5,
        createdAt: "2023-03-01",
        updatedAt: "2023-03-03",
        userImagePath:
          "https://avatars.akamai.steamstatic.com/34adcd2a2c63e40ce323f872f4781ef5ee322413.jpg",
        userName: "홍길동",
        userId: 3,
      },
      {
        reviewId: 2,
        gameId: 2,
        reviewTitle: "재밌는 게임이에요",
        reviewContent: "이걸 이제야 알다니",
        reviewGrade: 5,
        createdAt: "2023-03-01",
        updatedAt: "2023-03-03",
        userImagePath:
          "https://avatars.akamai.steamstatic.com/34adcd2a2c63e40ce323f872f4781ef5ee322413.jpg",
        userName: "홍길동",
        userId: 3,
      },
    ],
    recommendedUsers: [
      {
        userId: 3,
        userName: "홍길동",
        userImagePath:
          "https://avatars.akamai.steamstatic.com/34adcd2a2c63e40ce323f872f4781ef5ee322413.jpg",
      },
      {
        userId: 4,
        userName: "강호동",
        userImagePath:
          "https://avatars.akamai.steamstatic.com/34adcd2a2c63e40ce323f872f4781ef5ee322413.jpg",
      },
    ],
  };

  const recommendedUsers = [
    {
      userId: 3,
      userName: "홍길동",
      profilePath:
        "https://avatars.akamai.steamstatic.com/34adcd2a2c63e40ce323f872f4781ef5ee322413.jpg",
      "2weekPlayTime": 9999,
    },
    {
      userId: 1,
      userName: "김길동",
      profilePath:
        "https://avatars.akamai.steamstatic.com/34adcd2a2c63e40ce323f872f4781ef5ee322413.jpg",
      "2weekPlayTime": 8888,
    },
    {
      userId: 2,
      userName: "이길동",
      profilePath:
        "https://avatars.akamai.steamstatic.com/34adcd2a2c63e40ce323f872f4781ef5ee322413.jpg",
      "2weekPlayTime": 7777,
    },
  ];

  const renderGenres = () => {
    const result = [];

    if (gameData) {
      for (let i = 0; i < gameData.genres.length; i++) {
        result.push(gameData.genres[i].genreName);
        if (i + 1 !== gameData.genres.length) {
          result.push(", ");
        }
      }
    }

    return result;
  };

  const renderScreenshots = () => {
    const result = [];

    for (let i = 0; i < gameData.images.length; i++) {
      result.push(
        <SwiperSlide key={gameData.images[i].imageId}>
          <img
            src={gameData.images[i].imagePath}
            alt="screenshot"
            className="screenshot-img"
          />
        </SwiperSlide>
      );
    }

    return result;
  };

  const renderUsers = () => {
    const result = [];

    if (recommendedUsers) {
      for (let i = 0; i < recommendedUsers.length; i++) {
        result.push(
          <div className="single-user" key={recommendedUsers[i].userId}>
            <div
              className="profile-wrapper"
              onClick={() => navigate(`/profile/${recommendedUsers[i].userId}`)}
            >
              <img src={recommendedUsers[i].profilePath} alt="profile_img" />
            </div>
            <p className="username">{recommendedUsers[i].userName}</p>
          </div>
        );
      }
    }
    return result;
  };

  return (
    <div>
      {gameData ? (
        <DetailWrapper
          src={gameData.images[0].imagePath}
          scrap_src={scrap_img}
          img_len={gameData.images.length}
        >
          <div className="detail-main">
            <div className="main-wrapper">
              <div className="title-wrapper">
                <p className="title">{gameData.gameName}</p>
                <p className="discription">{gameData.gameDescription}</p>
              </div>
              {/* 로그인했을 때 노출 */}
              <div className="scrap-wrapper">
                {gameData.isLiked ? (
                  <FontAwesomeIcon icon={faStar} />
                ) : (
                  <FontAwesomeIcon icon={faRegularStar} />
                )}
              </div>
            </div>
          </div>
          <div className="detail-sub">
            <div className="info-wrapper">
              <span className="single-info">
                <p className="info-title">Preference</p>
                <p className="info-content">{gameData.gamePrice + "%"}</p>
              </span>
              <span className="single-info">
                <p className="info-title">Price</p>
                <p className="info-content">{"$" + gameData.gamePrice}</p>
              </span>
              <span className="single-info">
                <p className="info-title">Genres</p>
                <p className="info-content">{renderGenres()}</p>
              </span>
            </div>
            <div className="scrennshots-wrapper">
              <p className="screenshot-text">스크린샷</p>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={2}
                navigation
                pagination={{ clickable: true }}
              >
                {renderScreenshots()}
              </Swiper>
            </div>
          </div>
          <div className="gradient"></div>
          <RecommendUsers>
            <p className="title-text">이 게임을 좋아하는 유저</p>
            <div className="users-wrapper">{renderUsers()}</div>
            <div className="gradient"></div>
          </RecommendUsers>
        </DetailWrapper>
      ) : (
        // CSS 수정 필요함
        <DetailWrapper>존재하지 않는 게임입니다.</DetailWrapper>
      )}
    </div>
  );
};

export default Detail;
