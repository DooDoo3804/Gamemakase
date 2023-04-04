import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Lottie from "react-lottie";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/user";

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
import appleSvg from "../assets/fontAwesomeSvg/apple.svg";
import windowSvg from "../assets/fontAwesomeSvg/windows.svg";
import linuxSvg from "../assets/fontAwesomeSvg/linux.svg";
import editIcon from "../assets/fontAwesomeSvg/pen-to-square-solid.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  faCommentDots,
  faStar as faRegularStar,
} from "@fortawesome/free-regular-svg-icons";
import no_game from "../assets/lottie/no-game.json";
import reviewLoadingImg from "../assets/tinyLoading.gif";
import defaultUserImg from "../assets/profileImg.svg";

import TranslucentBtn from "../components/TranslucentBtn";
import useBodyScrollLock from "../components/ScrollLock";
import ChatModal from "../components/ChatModal";

import { BACKEND_URL } from "../config";
import { useInView } from "react-intersection-observer";
import LoadingPage from "../components/LoadingPage";
import ReviewEditModal from "../components/ReviewEditModal";

const Detail = () => {
  const navigate = useNavigate();
  const [modalView, setModalView] = useState(false);
  const [editModalView, setEditModalView] = useState(false);
  const [chatView, setChatView] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [gameData, setGameData] = useState(null);
  const [recommendedUsers, setRecommendedUsers] = useState(null);
  const [reviewData, setReviewData] = useState(null);
  const [editReviewData, setEditReviewData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [hasNextPage, setHasNextPage] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [ref, inView] = useInView();
  const pageNo = useRef(1);

  const [user, setUser] = useRecoilState(userState);
  const [cookies, setCookie] = useCookies(["accessToken"]);

  const { lockScroll } = useBodyScrollLock();
  const location = useLocation();
  const gameId = location.pathname.split("/").reverse()[0];

  useEffect(() => {
    let userId = -1;
    if (user) {
      userId = user.userId;
    }

    axios
      .get(`${BACKEND_URL}api/game/${gameId}`, {
        headers: { "Content-Type": "application/json", userId: userId },
      })
      .then(function (response) {
        // console.log(response.data);
        setGameData(response.data);
        setRecommendedUsers(response.data.recommendedUsers);
        setReviewData(response.data.reviews);
        setIsLiked(response.data.isLiked);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 500) {
          // window.location.replace("/500");
        } else {
          setIsLoading(false);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      setReviewLoading(true);
      getReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getReviews = useCallback(async () => {
    setReviewLoading(true);

    await axios
      .get(`${BACKEND_URL}api/reviews/${gameId}`, {
        params: {
          pageNo: pageNo.current,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.length) {
          pageNo.current += 1;
        }
        setReviewData((reviewData) => [...reviewData, ...response.data]);
        setHasNextPage(response.data.length === 12);
        setReviewLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setReviewLoading(false);
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
    let maxLength = gameData.images.length;
    if (maxLength > 11) maxLength = 11;

    for (let i = 0; i < maxLength; i++) {
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
              <img
                src={
                  recommendedUsers[i].userImagePath
                    ? recommendedUsers[i].userImagePath
                    : defaultUserImg
                }
                alt="profile_img"
              />
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

    if (reviewData.length) {
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
                onClick={() => {
                  if (reviewData[i].userName !== "탈퇴한 유저") {
                    navigate(`/profile/${reviewData[i].userId}`);
                  }
                }}
              >
                <img
                  src={
                    reviewData[i].userImagePath
                      ? reviewData[i].userImagePath
                      : defaultUserImg
                  }
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
              {user && reviewData[i].userId === user.userId ? (
                <div
                  className="edit-icon"
                  onClick={() => handleEdit(reviewData[i])}
                >
                  <img src={editIcon} alt="edit_icon" />
                </div>
              ) : null}
            </div>
            <p className="review-title">{reviewData[i].reviewTitle}</p>
            <p className="review-content">{reviewData[i].reviewContent}</p>
          </SingleReview>
        );
      }
    } else {
      result.push(
        <motion.div
          key={0}
          className="no-review"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.1 },
          }}
        >
          <p>리뷰가 존재하지 않습니다.</p>
        </motion.div>
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

  const handleScrap = () => {
    if (user) {
      if (isLiked) {
        // 스크랩 취소
        axios
          .delete(`${BACKEND_URL}auth/user/bookmarks/${gameData.likeId}`, {
            headers: {
              "Content-Type": "application/json",
              accessToken: cookies["accessToken"],
            },
          })
          .then((response) => {
            setIsLiked(!isLiked);
          })
          .catch((error) => {
            console.log(error);
            // if (error.response.status === 401) {
            //   window.location.replace(window.location.href);
            // }
            alert("스크랩 취소에 실패했습니다.");
          });
      } else {
        // 스크랩 하기
        axios
          .post(
            `${BACKEND_URL}auth/user/bookmarks/${gameData.gameId}`,
            {
              game: gameData,
            },
            {
              headers: {
                "Content-Type": "application/json",
                accessToken: cookies["accessToken"],
              },
            }
          )
          .then((response) => {
            setIsLiked(!isLiked);
            let tempGameData = gameData;
            tempGameData.likeId = response.data.likeId;
            setGameData(tempGameData);
          })
          .catch((error) => {
            console.log(error);
            // if (error.response.status === 401) {
            //   window.location.replace(window.location.href);
            // }
            alert("스크랩에 실패했습니다.");
          });
      }
    } else {
      alert("로그인 후 스크랩 기능을 사용할 수 있습니다.");
    }
  };

  const handleEdit = (editData) => {
    setScrollPosition(lockScroll());
    setEditReviewData(editData);
    setEditModalView(true);
  };

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

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
          <ReviewEditModal
            reviewData={editReviewData}
            modalView={editModalView}
            setModalView={setEditModalView}
            scrollPosition={scrollPosition}
          ></ReviewEditModal>
          <ChatModal
            gameData={gameData}
            chatView={chatView}
            setChatView={setChatView}
            scrollPosition={scrollPosition}
          ></ChatModal>
          <div className="detail-main">
            <div className="main-wrapper">
              <div className="title-info-wrapper">
                <motion.div
                  className="title-wrapper"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.1 },
                  }}
                >
                  <div className="title-logo">
                    <p className="title">{gameData.gameName}</p>
                    <div>
                      <div className="logo-box">
                        {gameData.windows ? (
                          <img
                            src={windowSvg}
                            className="brand-logo"
                            alt="windowSvg"
                          />
                        ) : null}
                        {gameData.mac ? (
                          <img
                            src={appleSvg}
                            className="brand-logo"
                            alt="appleSvg"
                          />
                        ) : (
                          ""
                        )}
                        {gameData.linux ? (
                          <img
                            src={linuxSvg}
                            className="brand-logo"
                            alt="linuxSvg"
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      {gameData.isOwned ? (
                        <div className="own-game">
                          <div className="own-btn">보유중</div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <p className="discription">{gameData.gameDescription}</p>
                  <div
                    className="steam-btn"
                    onClick={() =>
                      window.open(
                        `https://store.steampowered.com/app/${gameData.gameId}`
                      )
                    }
                  >
                    스팀에서 보기
                  </div>
                </motion.div>
              </div>
              <div className="scrap-wrapper" onClick={() => handleScrap()}>
                <FontAwesomeIcon icon={isLiked ? faStar : faRegularStar} />
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
                <p className="info-title">선호도</p>
                <p className="info-content">{gameData.score + "%"}</p>
              </span>
              <span className="single-info">
                <p className="info-title">가격</p>
                <p className="info-content">
                  {gameData.gamePrice ? "$" + gameData.gamePrice : "Free"}
                </p>
              </span>
              <span className="single-info">
                <p className="info-title">장르</p>
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
            {gameData.youtube.length ? (
              <div className="video-wrapper">
                <p className="video-text">관련 영상</p>
                <div className="videos">
                  <iframe
                    src={
                      "https://www.youtube.com/embed/" +
                      gameData.youtube[0].youtubeId
                    }
                    title={gameData.youtube[0].youtubeName}
                    className="single-video"
                    allow="fullscreen"
                  ></iframe>
                  <iframe
                    src={
                      "https://www.youtube.com/embed/" +
                      gameData.youtube[1].youtubeId
                    }
                    title={gameData.youtube[1].youtubeName}
                    className="single-video"
                    allow="fullscreen"
                  ></iframe>
                </div>
              </div>
            ) : null}
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
            <div className="gradient-second"></div>
          </RecommendUsers>
          <ReviewWrapper>
            <div className="review-title-wrapper">
              <p className="title-text">리뷰</p>
              {gameData.canReview ? (
                <TranslucentBtn
                  text="작성하기"
                  onClick={() => handleModalOpen()}
                ></TranslucentBtn>
              ) : null}
            </div>
            {reviewData ? (
              <>
                <div className="review-wrapper">{renderReviews()}</div>
                {reviewLoading ? (
                  <div className="review-loading">
                    <img src={reviewLoadingImg} alt="loading..."></img>
                  </div>
                ) : (
                  <div ref={ref} className="scroll-handler" />
                )}
              </>
            ) : null}
          </ReviewWrapper>
        </DetailWrapper>
      ) : (
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
