import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ResponsivePie } from "@nivo/pie";
import { Common } from "../styles/Common";
import { motion } from "framer-motion";
//Components
import GameSummary from "../components/GameSummary";
import { Paging } from "../components/Pagination";
import EditModal from "../components/EditModal";
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
//임시
import exampleGameImg from "../assets/임시게임이미지.svg";
import profileImg from "../assets/profileImg.svg";

const Profile = () => {
  const location = useLocation();
  const userId = location.pathname.split("/").reverse()[0];
  //state
  const [userName, setUserName] = useState("");
  const [isMainTap, setIsMainTap] = useState(true);
  const [statisticsData, setStatisticsData] = useState([]);
  const [statisticsSum, setStatisticsSum] = useState(0);
  // paging state
  const [scrapGames, setScrapGames] = useState([{}]);
  const [gamesCount, setGamesCount] = useState(0);
  const [gameCurrentpage, setGameCurrentpage] = useState(1);
  const [reviewCurrentpage, setReviewCurrentpage] = useState(1);
  //const [countPerPage] = useState(6);

  // tap switching func
  const clickMainTap = () => {
    setIsMainTap(true);
  };
  const clickReviewsTap = () => {
    setIsMainTap(false);
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
    const genre = [
      { id: "Casual", value: 116 },
      { id: "Indie", value: 56 },
      { id: "RPG", value: 198 },
      { id: "Action", value: 519 },
      { id: "Adventure", value: 317 },
    ];
    const scrap = [
      {
        image_path: exampleGameImg,
        game_name: "Star Survivor adsfasdfiq,mag asdf ff",
        window: true,
        apple: false,
        linux: true,
        price: 5.6,
      },
      {
        image_path: exampleGameImg,
        game_name: "Star Survivor",
        window: true,
        apple: false,
        linux: false,
        price: 5.6,
      },
      {
        image_path: exampleGameImg,
        game_name: "Star Survivor",
        window: false,
        apple: true,
        linux: false,
        price: 5.6,
      },
      {
        image_path: exampleGameImg,
        game_name: "Star Survivor",
        window: true,
        apple: true,
        linux: true,
        price: 5.6,
      },
      {
        image_path: exampleGameImg,
        game_name: "Star Survivor",
        window: true,
        apple: false,
        linux: true,
        price: 5.6,
      },
    ];
    setScrapGames(scrap);
    setStatisticsData(
      genre.sort((data1, data2) => {
        return data2.value - data1.value;
      })
    );
    const calStatisticsSum = (Array) => {
      let statisticsSumTmp = 0;
      Array.forEach((e) => {
        statisticsSumTmp += e.value;
      });
      return statisticsSumTmp;
    };
    setStatisticsSum(calStatisticsSum(genre));
    setGamesCount(8);
  }, []);
  const reviewData = {
    user: {
      userImagePath:
        "https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66f604e7b0e6900f9ac53a43965300eb9a",
      userName: "홍길동",
      userId: 3,
    },
    result: [
      {
        reviewId: 1,
        gameId: 2,
        gameImagePath: exampleGameImg,
        gameTitle: "Star Survivor",
        reviewTitle: "재밌는 게임이에요",
        reviewContent:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typeset",
        reviewGrade: 5,
        createdAt: "2023-03-01",
        updatedAt: "2023-03-03",
      },
      {
        reviewId: 2,
        gameId: 3,
        gameImagePath: exampleGameImg,
        gameTitle: "Star Survivor asdf werqdfasd fdsfsdf",
        reviewTitle: "홀리 게임이에요",
        reviewContent: "이걸 이제야 알다니",
        reviewGrade: 4,
        createdAt: "2018-02-01",
        updatedAt: "0000-00-00",
      },
      {
        reviewId: 3,
        gameId: 4,
        gameImagePath: exampleGameImg,
        gameTitle: "Star Survivor af asdfads sdfew",
        reviewTitle: "재밌는 게임이에요",
        reviewContent: "이걸 이제야 알다니",
        reviewGrade: 5,
        createdAt: "2023-03-01",
        updatedAt: "2023-03-03",
      },
      {
        reviewId: 4,
        gameId: 5,
        gameImagePath: exampleGameImg,
        gameTitle: "Star Survivor",
        reviewTitle: "홀리 게임이에요",
        reviewContent:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
        reviewGrade: 4,
        createdAt: "2023-04-01",
        updatedAt: "0000-00-00",
      },
      {
        reviewId: 5,
        gameId: 6,
        gameImagePath: exampleGameImg,
        gameTitle: "Star Survivor",
        reviewTitle: "홀리 게임이에요",
        reviewContent:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
        reviewGrade: 4,
        createdAt: "2021-01-01",
        updatedAt: "0000-00-00",
      },
      {
        reviewId: 6,
        gameId: 7,
        gameImagePath: exampleGameImg,
        gameTitle: "Star Survivor",
        reviewTitle: "홀리 게임이에요",
        reviewContent:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
        reviewGrade: 3,
        createdAt: "2023-12-01",
        updatedAt: "0000-00-00",
      },
      {
        reviewId: 7,
        gameId: 8,
        gameImagePath: exampleGameImg,
        gameTitle: "Star Survivor",
        reviewTitle: "홀리 게임이에요",
        reviewContent:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
        reviewGrade: 2,
        createdAt: "2023-03-01",
        updatedAt: "0000-00-00",
      },
    ],
    page: {
      pageNum: 1,
      size: 7,
      count: 5,
    },
  };

  const mainDataSetting = () => {
    setMainTapData();
    setUserName("Username");
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
          <div className="scrap-header">ScrapBook</div>
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
            imgUrl={e.image_path}
            title={e.game_name}
            window={e.window}
            apple={e.apple}
            linux={e.linux}
            price={e.price}
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

    const reviewEdit = () => {
      console.log("edit!");
    };
    const reviewDelete = () => {
      console.log("delete!");
    };

    const reivewRend = () => {
      const month = [
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
      reviewData.result.forEach((e) => {
        const dateArr = e.createdAt.split("-");
        const year = Number(dateArr[0]);
        const monthIdx = Number(dateArr[1]);
        const dateNum = Number(dateArr[2]);
        const dateString = dateNum + " " + month[monthIdx] + ", " + year;

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
                <img src={e.gameImagePath} alt="profile" className="game-img" />
              </div>
              <div className="game-content-wrapper">
                <p className="game-title">{e.gameTitle}</p>
                <div className="star-wrapper">{starsRend(e.reviewGrade)}</div>
                <div className="create-date">{dateString}</div>
              </div>
              <EditModal
                editFunction={reviewEdit}
                deleteFunction={reviewDelete}
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
      if (reviewData.result.length > 3) {
        const setPage = (e) => {
          setReviewCurrentpage(e);
        };
        result.push(
          <Paging
            key="reviewPaging"
            page={reviewCurrentpage}
            count={reviewData.page.size}
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
        {reviewData != null && reviewData.result != null ? (
          <>
            <div className="review-header">My Reviews</div>
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
      <div className="profile-box">
        <div>
          <ProfileImgWrapper>
            <img src={profileImg} alt="profileImage" />
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
          {isMainTap ? mainTapRend() : reviewTapRend()}
          <div></div>
        </section>
      </div>
    </ProfileBackgroundWrapper>
  );
};

export default Profile;
