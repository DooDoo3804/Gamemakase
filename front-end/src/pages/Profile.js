import axios from "axios";
import { BACKEND_URL } from "../config";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
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
  //state
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState(defaultUserImg);

  const [statisticsData, setStatisticsData] = useState([]);
  const [statisticsSum, setStatisticsSum] = useState(0);
  const [reviewsData, setReviewsData] = useState([]);

  const [isMainTap, setIsMainTap] = useState(true);
  const [scrapDeleteAlertView, setScrapDeleteAlertView] = useState(false);
  const [reviewDeleteAlertView, setReviewDeleteAlertView] = useState(false);
  const [scrapGames, setScrapGames] = useState([]);
  
  // paging state
  const [gamesCount, setGamesCount] = useState(0);
  const [gameCurrentpage, setGameCurrentpage] = useState(0);
  const [reviewCurrentpage, setReviewCurrentpage] = useState(0);
  //const [countPerPage] = useState(6);

  // etc func
  const clickMainTap = () => {
    setIsMainTap(true);
  };
  const clickReviewsTap = () => {
    setIsMainTap(false);
    axios
      .get(`${BACKEND_URL}api/profile/reviews`, {
        params: {
          userId: userId,
          pageNo: 0,
        },
      })
      .then((response) => {
        setReviewsData(response.data.reviews);
      })
      .catch((error) => {

      });
  };
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
  const calStatisticsSum = (Array) => {
    let statisticsSumTmp = 0;
    Array.forEach((e) => {
      statisticsSumTmp += e.value;
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

  // Data setting at mount
  const setMainTapData = useCallback(() => {
    axios
      .get(`${BACKEND_URL}api/profile`, {
        params: {
          userId: userId,
          pageNo: 0,
        },
      })
      .then((response) => {
        const mapping = { genre: 'id', value: 'value' };
        const statistics = renameKeys(mapping,  response.data.statistics);
        setStatisticsData(
          statistics.sort((data1, data2) => {
            return data2.value - data1.value;
          })
        );
        setStatisticsSum(calStatisticsSum(statistics));
        setScrapGames(response.data.scrap);
        setGamesCount(response.data.scrap.length);
        setUserName(response.data.user.userName);
        const userImg = response.data.user.userImagePath;
        if (userImg == null || userImg.length <= 0) {
          setUserImage(defaultUserImg);
        } else {
          setUserImage(userImg);
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          navigate("/500");
        } else if (error.response.status === 404) {
          navigate("/*")
        }
        // error logic
      });
  }, [userId, navigate]);

  const mainDataSetting = () => {
    setMainTapData();
  };

  const reviewEdit = () => {
    console.log("edit!");
  };

  const reviewDelete = () => {
    console.log("리뷰 삭제!");
  };

  const scrapDelete = () => {
    console.log("스크랩 삭제");
  };

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
                margin={{ top: 30, right: 140, bottom: 30, left: 30 }}
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
                      fontSize: 18,
                      fill: `${Common.colors.white01}`,
                    },
                  },
                  legends: {
                    text: {
                      fontSize: 14,
                      fill: `${Common.colors.white01}`,
                    },
                  },
                }}
                legends={[
                  {
                    anchor: "right",
                    direction: "column",
                    justify: false,
                    translateX: 130,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 30,
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
          <div className="scrap-header">스크랩 북</div>
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
            gameId={e.gameId}
            setAlertView={setScrapDeleteAlertView}
          ></GameSummary>
        );
        idx++;
      });
      return result;
    };
    const setPage = (e) => {
      setGameCurrentpage(e);
    };
    const result = [];
    if (scrapGames && scrapGames.length > 0) {
      result.push(
        <div key={"scrapGames"}>
          <div className="box">{singleScrapDataRend()}</div>
          {gamesCount > 6 ? (
            <Paging
              page={gameCurrentpage}
              count={gamesCount}
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
                <div className="create-date">{dateStringKo}</div>
              </div>
              <EditModal
                editFunction={reviewEdit}
                deleteFunction={() => {
                  setReviewDeleteAlertView(true);
                }}
              ></EditModal>
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
      if (reviewsData.length > 3) {
        const setPage = (e) => {
          setReviewCurrentpage(e);
        };
        result.push(
          <Paging
            key="reviewPaging"
            page={reviewCurrentpage}
            count={reviewsData.page.size}
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
            <div className="review-header">내가 작성한 리뷰</div>
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

  useEffect(mainDataSetting, [userId, setMainTapData]);

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
