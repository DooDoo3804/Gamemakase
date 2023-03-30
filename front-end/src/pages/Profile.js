import axios from "axios";
import { BACKEND_URL } from "../config";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/user";
import { ResponsivePie } from "@nivo/pie";
import { Common } from "../styles/Common";
import { motion } from "framer-motion";
//Components
import GameSummary from "../components/GameSummary";
import { Paging } from "../components/Pagination";
import EditModal from "../components/EditModal";
import AlertModal from "../components/AlertModal";
//Emotions
import {
  ProfileBackgroundWrapper,
  ProfileImgWrapper,
  ProfileNavWrapper,
  ProfileMainStatistics,
  ProfileScrapBook,
  ProfileReviewsWrapper,
  SingleReview,
  NoReivew,
} from "../styles/ProfileEmotion";
//Lottie
import Lottie from "react-lottie";
import analysis from "../assets/lottie/analysis.json";
import noReivew from "../assets/lottie/review.json";
//Svg
import starSvgYellow from "../assets/fontAwesomeSvg/star-yellow.svg";
import starSvgEmpty from "../assets/fontAwesomeSvg/star-empty.svg";
//empty profile img
import defaultUserImg from "../assets/profileImg.svg";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.pathname.split("/").reverse()[0];
  const [width, setWidth] = useState(window.innerWidth);
  const [cookies] = useCookies(["accessToken"]);

  //state
  const [isKo, setIsKo] = useState(true);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState(defaultUserImg);
  const [user] = useRecoilState(userState);

  // sync
  const [scrapId, setScrapId] = useState();
  const [reviewId, setReviewId] = useState();

  const [statisticsData, setStatisticsData] = useState([]);
  const [statisticsSum, setStatisticsSum] = useState(0);
  const [reviewsData, setReviewsData] = useState([]);
  const [reviewDataSize, setReviewDataSize] = useState(0);

  const [isMainTap, setIsMainTap] = useState(true);
  const [scrapDeleteAlertView, setScrapDeleteAlertView] = useState(false);
  const [reviewDeleteAlertView, setReviewDeleteAlertView] = useState(false);
  const [scrapGames, setScrapGames] = useState([]);

  // paging state
  const [gamesTotalCount, setGamesTotalCount] = useState(0);
  const [gameCurrentpage, setGameCurrentpage] = useState(0);
  const [reviewCurrentpage, setReviewCurrentpage] = useState(0);
  //const [countPerPage] = useState(6);

  const clickMainTap = () => {
    setIsMainTap(true);
  };
  const clickReviewsTap = () => {
    setIsMainTap(false);
    reviewDataRend(1);
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 객체 배열의 key값 일괄 변경 func
  const renameKeys = (mapping, objArr) => {
    const renameObjArr = [];
    for (let obj of objArr) {
      const renameObj = {};
      for (let [before, after] of Object.entries(mapping)) {
        if (obj[before]) {
          renameObj[after] = obj[before];
        }
      }
      renameObjArr.push(renameObj);
    }
    return renameObjArr;
  };

  // 배열의 value값의 sum값을 구하는 func
  const calStatisticsSum = (Array) => {
    let statisticsSumTmp = 0;
    Array.forEach((e) => {
      const value = Number(e.value);
      if (isNaN(value)) {
        statisticsSumTmp += 1;
        e.value = 1;
      } else {
        statisticsSumTmp += Number(e.value);
      }
    });
    return statisticsSumTmp;
  };

  // lottie option
  const option = (data) => {
    return {
      loop: true,
      autoplay: true,
      animationData: data,
    };
  };

  // Data setting
  // Main Data
  const setMainTapData = useCallback(() => {
    setIsKo(true);
    axios
      .get(`${BACKEND_URL}api/profile`, {
        params: {
          userId: userId,
          pageNo: 0,
        },
      })
      .then((response) => {
        const mapping = { genre: "id", value: "value" };
        const statistics = renameKeys(mapping, response.data.statistics);
        setStatisticsData(
          statistics.sort((data1, data2) => {
            return data2.value - data1.value;
          })
        );
        const sum = calStatisticsSum(statistics);
        console.log(sum);
        setStatisticsSum(calStatisticsSum(statistics));
        setScrapGames(response.data.scrap);
        setGamesTotalCount(response.data.page.size);
        setUserName(response.data.user.userName);
        const userImg = response.data.user.userImagePath;
        if (userImg == null || userImg.length <= 0) {
          setUserImage(defaultUserImg);
        } else {
          setUserImage(userImg);
        }
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_REQUEST") {
          navigate("/404");
        }
      });
  }, [userId, navigate]);

  // Review Data
  const reviewDataRend = (e) => {
    axios
      .get(`${BACKEND_URL}api/profile/reviews`, {
        params: {
          userId: userId,
          pageNo: (e - 1),
        },
      })
      .then((response) => {
        setReviewsData(response.data.reviews);
        setReviewDataSize(response.data.page.size);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /////////////////////////////////////////////
  /////             REST API             //////
  /////////////////////////////////////////////

  const reviewEdit = () => {
    console.log("edit!");
  };

  const reviewDeleteClick = (reviewId) => {
    setReviewId(reviewId);
    setReviewDeleteAlertView(true);
  }

  const reviewDelete = () => {
    axios
      .delete(`${BACKEND_URL}auth/reviews/${reviewId}`, {
        headers: {
          "Content-Type": "application/json",
          accessToken: cookies["accessToken"],
        },
      })
      .then((response) => {
        setReviewsData(reviewsData.filter(reviewsData => reviewsData.reviewId !== reviewId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const scrapDeleteClick = (scrapId) => {
    setScrapId(scrapId);
    setScrapDeleteAlertView(true);
  };

  const scrapDelete = () => {
    axios
      .delete(`${BACKEND_URL}auth/user/bookmarks/${scrapId}`, {
        headers: {
          "Content-Type": "application/json",
          accessToken: cookies["accessToken"],
        },
      })
      .then((response) => {
        setScrapGames(scrapGames.filter(scrapGames => scrapGames.likeId !== scrapId));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => { setMainTapData() }, [setMainTapData]);

  /////////////////////////////////////////////
  /////         rending function         //////
  /////////////////////////////////////////////

  const mainTapRend = () => {
    const statisticsRend = () => {
      const result = [];
      if (statisticsData && statisticsData.length > 0) {
        result.push(
          <div className="statistics" key="statisticsBox">
            <div className="pie-chart">
              <ResponsivePie
                data={statisticsData}
                margin={{ top: 30, right: width < 500 ? 130 : 200, bottom: 30, left: 30 }}
                innerRadius={0.6}
                padAngle={4}
                cornerRadius={10}
                arcLabel={(e) => {
                  return Math.ceil((e.value / statisticsSum) * 100) + "%";
                }}
                colors={[
                  `${Common.colors.mainColor02}`,
                  `${Common.colors.mainColor03}`,
                  `${Common.colors.mainColor04}`,
                  `${Common.colors.mainColor05}`,
                  `${Common.colors.mainColor06}`,
                ]}
                activeOuterRadiusOffset={20}
                borderWidth={0}
                enableArcLinkLabels={false}
                theme={{
                  labels: {
                    text: {
                      fontSize: width < 500 ? 12 : 18,
                      fill: `${Common.colors.white01}`,
                    },
                  },
                  legends: {
                    text: {
                      fontSize: width < 500 ? 12 : 14,
                      fill: `${Common.colors.white01}`,
                    },
                  },
                }}
                legends={[
                  {
                    anchor: "right",
                    direction: "column",
                    justify: false,
                    translateX: 10,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemWidth: 0,
                    itemHeight: width < 500 ? 20 : 30,
                    itemDirection: "left-to-right",
                    itemOpacity: "100%",
                    symbolSize: 20,
                    symbolShape: "circle",
                  },
                ]}
              />
            </div>
            <div className="statistics-line"></div>
            <div className="mention">
              <h2>{statisticsData[0].id} 게임을 선호하시는군요!</h2>
              {statisticsData.length > 2 ? (
                <h4>
                  {statisticsData[1].id}, {statisticsData[2].id} 장르도 선호하는
                  장르입니다.
                </h4>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      } else {
        result.push(
          <div className="statistics" key="statisticsBox">
            <motion.div
              className="no-data-msg"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Lottie
                options={option(analysis)}
                height={300}
                width={300}
              ></Lottie>
              아직 플레이 기록이 없어요 : (
            </motion.div>
          </div>
        );
      }
      return result;
    };

    const result = [];
    result.push(
      <div key="mainContent">
        <ProfileMainStatistics
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.1 },
          }}
        >
          {statisticsRend()}
        </ProfileMainStatistics>
        <ProfileScrapBook
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.1 },
          }}
        >
          <div className="main-header">스크랩 북</div>
          {scrapGamesRend()}
        </ProfileScrapBook>
      </div>
    );
    return result;
  };

  const scrapGamesRend = () => {
    const singleScrapDataRend = () => {
      const result = [];
      let idx = 0;
      scrapGames.forEach((e) => {
        result.push(
          <GameSummary
            key={idx}
            imgUrl={e.imagePath}
            title={e.gameName}
            window={e.window}
            apple={e.apple}
            linux={e.linux}
            price={e.price}
            scrapId={e.likeId}
            gameId={e.gameId}
            clickFunc={scrapDeleteClick}
            isMine={user ? Number(userId) === Number(user.userId) : false}
          ></GameSummary>
        );
        idx++;
      });
      return result;
    };
    const setPage = (e) => {
      setGameCurrentpage(e);
      axios
        .get(`${BACKEND_URL}api/profile/scraps`, {
          params: {
            userId: userId,
            pageNo: (e - 1),
          },
        })
        .then((response) => {
          setScrapGames(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const result = [];
    if (scrapGames && scrapGames.length > 0) {
      result.push(
        <div key={"scrapGames"}>
          <div className="box">{singleScrapDataRend()}</div>
          {gamesTotalCount > 6 ? (
            <Paging
              page={gameCurrentpage}
              count={gamesTotalCount}
              setPage={setPage}
              countPerPage={6}
            />
          ) : (
            ""
          )}
        </div>
      );
    } else {
      result.push(
        <div className="no-data-msg" key="noGameData">
          아직 스크랩한 게임이 없어요 : (
        </div>
      );
    }
    return result;
  };

  const reviewTapRend = () => {
    const starsRend = (rating) => {
      const result = [];
      for (let i = 0; i < 5; i++) {
        if (i < rating) {
          result.push(<img src={starSvgYellow} alt="starSvg" key={i} />);
        } else {
          result.push(<img src={starSvgEmpty} alt="starEmptySvg" key={i} />);
        }
      }
      return result;
    };

    const reivewRend = () => {
      const monthEng = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const result = [];
      reviewsData.forEach((e) => {
        const year = Number(e.createdAt[0]);
        const monthIdx = Number(e.createdAt[1]);
        const dateNum = Number(e.createdAt[2]);
        const dateStringEng = dateNum + " " + monthEng[monthIdx] + ", " + year;
        const dateStringKo = year + "년 " + monthIdx + "월 " + dateNum + "일";

        result.push(
          <SingleReview
            key={e.reviewId}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.1 },
            }}
          >
            <div className="game-wrapper">
              <div className="game-img-wrapper">
                <img
                  onClick={() => {
                    navigate(`/detail/${e.gameId}`);
                  }}
                  src={e.gameImagePath}
                  alt="profile"
                  className="game-img"
                />
              </div>
              <div className="game-content-wrapper">
                <p className="game-title">{e.gameTitle}</p>
                <div className="star-wrapper">{starsRend(e.reviewGrade)}</div>
                <div className="create-date">
                  {isKo ? dateStringKo : dateStringEng}
                </div>
              </div>
              {
                Number(user.userId) === Number(userId) ? <EditModal
                  editFunction={reviewEdit}
                  deleteFunction={() => {
                    reviewDeleteClick(e.reviewId);
                  }}
                ></EditModal> : ""}
            </div>
            <p className="review-title">{e.reviewTitle}</p>
            <p className="review-content">{e.reviewContent}</p>
          </SingleReview>
        );
      });
      return result;
    };

    const reviewPaging = () => {
      const result = [];
      if (reviewDataSize > 3) {
        const setPage = (e) => {
          setReviewCurrentpage(e);
          reviewDataRend(e);
        };
        result.push(
          <Paging
            key="reviewPaging"
            page={reviewCurrentpage}
            count={reviewDataSize}
            setPage={setPage}
            countPerPage={6}
          />
        );
      }
      return result;
    };

    const result = [];
    result.push(
      <ProfileReviewsWrapper key="reviewTapData">
        {reviewsData != null &&
          reviewsData != null &&
          reviewsData.length > 0 ? (
          <>
            <div className="review-header">작성한 리뷰</div>
            <div className="review-wrapper">{reivewRend()}</div>
            {reviewPaging()}
          </>
        ) : (
          <NoReivew
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.1 },
            }}
          >
            <div className="no-review-wrapper">
              <motion.div
                className="lottie-wrapper"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Lottie
                  options={option(noReivew)}
                  height={300}
                  width={300}
                ></Lottie>
                아직 작성한 리뷰가 없어요 : (
              </motion.div>
            </div>
          </NoReivew>
        )}
      </ProfileReviewsWrapper>
    );
    return result;
  };

  /////////////////////////////////////////////
  /////              return              //////
  /////////////////////////////////////////////

  return (
    <ProfileBackgroundWrapper>
      <AlertModal
        alertView={scrapDeleteAlertView}
        setAlertView={setScrapDeleteAlertView}
        msg="해당 스크랩을 삭제하시겠습니까?"
        confrimMsg="삭제"
        cancelMsg="취소"
        goFunction={scrapDelete}
      ></AlertModal>
      <AlertModal
        alertView={reviewDeleteAlertView}
        setAlertView={setReviewDeleteAlertView}
        msg="해당 리뷰를 삭제하시겠습니까?"
        confrimMsg="삭제"
        cancelMsg="취소"
        goFunction={reviewDelete}
      ></AlertModal>
      <div className="profile-box">
        <div>
          <ProfileImgWrapper>
            <img src={userImage} alt="profileImage" />
            {userName != null ? <p className="profile-name">{userName}</p> : ""}
          </ProfileImgWrapper>
        </div>
        <nav>
          <ProfileNavWrapper>
            <div className="flex">
              <div
                className={`${isMainTap ? "nav-tap-clicked" : "nav-tap"}`}
                onClick={() => clickMainTap()}
              >
                Main
              </div>
              <div
                className={`${!isMainTap ? "nav-tap-clicked" : "nav-tap"}`}
                onClick={() => clickReviewsTap()}
              >
                Reviews
              </div>
            </div>
            <div className="nav-line"></div>
          </ProfileNavWrapper>
        </nav>
        <section>
          <div>{isMainTap ? mainTapRend() : reviewTapRend()}</div>
        </section>
      </div>
    </ProfileBackgroundWrapper>
  );
};

export default Profile;
