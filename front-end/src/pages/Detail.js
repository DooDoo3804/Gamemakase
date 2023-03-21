import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "react-lottie";
import { motion } from "framer-motion";
import ReviewModal from "../components/ReviewModal";
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
import scrap_hover from "../assets/fontAwesomeSvg/scrap_hover.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  faCommentDots,
  faStar as faRegularStar,
} from "@fortawesome/free-regular-svg-icons";
import no_game from "../assets/lottie/no-game.json";

import TranslucentBtn from "../components/TranslucentBtn";
import useBodyScrollLock from "../components/ScrollLock";
import ChatModal from "../components/ChatModal";

import { BACKEND_URL } from "../config";

const Detail = () => {
  const navigate = useNavigate();
  const [modalView, setModalView] = useState(false);
  const [chatView, setChatView] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [gameData, setGameData] = useState(null);
  const [recommendedUsers, setRecommendedUsers] = useState(null);
  const [reviewData, setReviewData] = useState(null);

  const { lockScroll } = useBodyScrollLock();
  const location = useLocation();
  const gameId = location.pathname.split("/").reverse()[0];

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/game/${gameId}`, {
        // todo : userId 수정해야함
        headers: { "Content-Type": "application/json", userId: 1 },
      })
      .then(function (response) {
        console.log(response.data);
        setGameData(response.data);
        setRecommendedUsers(response.data.recommendedUsers);
        setReviewData(response.data.reviews);
      })
      .catch(function (error) {
        console.log(error);
        // if (error.response.status === 404) {
        //   navigate("/*");
        // } else if (error.response.status === 401) {
        // }
      });
  }, []);

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

    if (recommendedUsers && recommendedUsers.length) {
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
    } else {
      result.push(
        <div key={0} className="no-user">
          해당 게임을 좋아하는 사용자가 없습니다.
        </div>
      );
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

  const handleModalOpen = () => {
    setScrollPosition(lockScroll());
    setModalView(true);
  };

  const handleChatOpen = () => {
    setScrollPosition(lockScroll());
    setChatView(true);
  };

  const handleScrap = () => {};

  return (
    <div>
      {gameData ? (
        <DetailWrapper
          src={gameData.images[0].imagePath}
          scrap_src={scrap_img}
          scrap_hover={scrap_hover}
          img_len={gameData.images.length}
        >
          <ReviewModal
            gameData={gameData}
            modalView={modalView}
            setModalView={setModalView}
            scrollPosition={scrollPosition}
          ></ReviewModal>
          <ChatModal
            gameData={gameData}
            chatView={chatView}
            setChatView={setChatView}
            scrollPosition={scrollPosition}
          ></ChatModal>
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
              {/* todo : 스크랩 기능 연결하기, hover시에 색상 변경 */}
              <div className="scrap-wrapper" onClick={() => handleScrap()}>
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
                <p className="info-content">{gameData.score + "%"}</p>
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
              {gameData.canReview ? (
                <TranslucentBtn
                  text="작성하기"
                  onClick={() => handleModalOpen()}
                ></TranslucentBtn>
              ) : null}
            </div>
            {reviewData ? (
              <div className="review-wrapper">{renderReviews()}</div>
            ) : (
              <div className="no-review">
                <p>작성된 리뷰가 없습니다.</p>
              </div>
            )}
          </ReviewWrapper>
        </DetailWrapper>
      ) : (
        // todo : CSS 수정 필요함
        <DetailWrapper>
          <div className="no-game">
            <Lottie
              options={options(no_game)}
              height={300}
              width={300}
            ></Lottie>
            <p>존재하지 않는 게임입니다.</p>
            <TranslucentBtn
              text={"홈으로 가기"}
              onClick={() => navigate("/")}
            ></TranslucentBtn>
          </div>
        </DetailWrapper>
      )}
      <ChatBtn onClick={() => handleChatOpen()}>
        <FontAwesomeIcon icon={faCommentDots} />
      </ChatBtn>
    </div>
  );
};

export default Detail;
