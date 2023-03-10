import { useNavigate } from "react-router-dom";
import {
  ChatBtn,
  DetailWrapper,
  FaStar,
  RecommendUsers,
  ReviewWrapper,
  SingleReview,
} from "../styles/DetailEmotion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import scrap_img from "../assets/scrap_img.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  faCommentDots,
  faStar as faRegularStar,
} from "@fortawesome/free-regular-svg-icons";

import { motion } from "framer-motion";
import TranslucentBtn from "../components/TranslucentBtn";

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

  const reviewData = [
    {
      reviewId: 1,
      gameId: 2,
      reviewTitle: "재밌는 게임이에요",
      reviewContent:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typeset",
      reviewGrade: 5,
      createdAt: "2023-03-01",
      updatedAt: "2023-03-03",
      userImagePath:
        "https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66f604e7b0e6900f9ac53a43965300eb9a",
      userName: "홍길동",
      userId: 3,
    },
    {
      reviewId: 2,
      gameId: 2,
      reviewTitle: "홀리 게임이에요",
      reviewContent: "이걸 이제야 알다니",
      reviewGrade: 4,
      createdAt: "2023-03-01",
      updatedAt: "0000-00-00",
      userImagePath:
        "https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66113e2bd2b7407c8202a97d2241a96625",
      userName: "배고파",
      userId: 2,
    },
    {
      reviewId: 3,
      gameId: 2,
      reviewTitle: "재밌는 게임이에요",
      reviewContent: "이걸 이제야 알다니",
      reviewGrade: 5,
      createdAt: "2023-03-01",
      updatedAt: "2023-03-03",
      userImagePath:
        "https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66f604e7b0e6900f9ac53a43965300eb9a",
      userName: "홍길동",
      userId: 3,
    },
    {
      reviewId: 4,
      gameId: 2,
      reviewTitle: "홀리 게임이에요",
      reviewContent:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
      reviewGrade: 4,
      createdAt: "2023-03-01",
      updatedAt: "0000-00-00",
      userImagePath:
        "https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66113e2bd2b7407c8202a97d2241a96625",
      userName: "배고파",
      userId: 2,
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

  const renderStars = (rating) => {
    const result = [];

    for (let i = 0; i < 5; i++) {
      result.push(
        <FaStar active={(i < rating).toString()} key={i}>
          <FontAwesomeIcon icon={faStar} className="fa-star" />
        </FaStar>
      );
    }

    return result;
  };

  const renderReviews = () => {
    const result = [];

    for (let i = 0; i < reviewData.length; i++) {
      result.push(
        <SingleReview
          key={reviewData[i].reviewId}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.1 },
          }}
        >
          <div className="profile-wrapper">
            <div
              className="profile-img-wrapper"
              onClick={() => navigate(`/profile/${reviewData[i].userId}`)}
            >
              <img
                src={reviewData[i].userImagePath}
                alt="profile"
                className="profile-img"
              />
            </div>
            <div className="profile-content-wrapper">
              <p className="user-name">{reviewData[i].userName}</p>
              <div className="star-wrapper">
                {renderStars(reviewData[i].reviewGrade)}
              </div>
            </div>
          </div>
          <p className="review-title">{reviewData[i].reviewTitle}</p>
          <p className="review-content">{reviewData[i].reviewContent}</p>
        </SingleReview>
      );
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
              <motion.div
                className="title-wrapper"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: 0.1 },
                }}
              >
                <p className="title">{gameData.gameName}</p>
                <p className="discription">{gameData.gameDescription}</p>
              </motion.div>
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
            <motion.div
              className="info-wrapper"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.7 },
              }}
            >
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
            </motion.div>
            <div className="scrennshots-wrapper">
              <p className="screenshot-text">스크린샷</p>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
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
            <motion.div
              className="users-wrapper"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.1 },
              }}
            >
              {renderUsers()}
            </motion.div>
            <div className="gradient"></div>
          </RecommendUsers>
          <ReviewWrapper>
            <div className="title-wrapper">
              <p className="title-text">리뷰</p>
              {/* 로그인했을 때만 노출 */}
              <TranslucentBtn text="작성하기"></TranslucentBtn>
            </div>
            {reviewData ? (
              // 리뷰 내용 많을 때 처리해야 함
              <div className="review-wrapper">{renderReviews()}</div>
            ) : (
              <div className="no-review">
                <p>작성된 리뷰가 없습니다.</p>
              </div>
            )}
          </ReviewWrapper>
        </DetailWrapper>
      ) : (
        // CSS 수정 필요함
        <DetailWrapper>존재하지 않는 게임입니다.</DetailWrapper>
      )}
      <ChatBtn>
        <FontAwesomeIcon icon={faCommentDots} />
      </ChatBtn>
    </div>
  );
};

export default Detail;
