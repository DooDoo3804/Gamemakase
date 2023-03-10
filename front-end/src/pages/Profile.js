import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ResponsivePie } from "@nivo/pie";
import { Common } from "../styles/Common";
import GameSummary from "../components/GameSummary";
import { Paging } from "../components/Paging";
import {
  ProfileBackgroundWrapper,
  ProfileImgWrapper,
  ProfileNavWrapper,
  ProfileMainStatistics,
  ProfileScrapBook,
  ProfileReviewsWrapper,
  SingleReview,
} from "../styles/ProfileEmotion";
import { FaStar } from "../styles/DetailEmotion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// 임시 import 이미지
import exampleGameImg from "../assets/image 7.svg";
import profileImg from "../assets/profileImg.svg";

const Profile = () => {
  const location = useLocation();
  const userId = location.pathname.split("/").reverse()[0];

  const [userName, setUserName] = useState(String);

  const [mainContent, setMainContent] = useState(true);
  const [reviewsContent, setReviewsContent] = useState(false);

  const [statisticsData, setStatisticsData] = useState(Array);
  const [statisticsSum, setStatisticsSum] = useState(Number);

  // paging 관련 state
  const [scrapGames, setScrapGames] = useState([{},]);
  const [gamesCount, setGamesCount] = useState(0);
  const [currentpage, setCurrentpage] = useState(1);
  //const [countPerPage] = useState(6);

  // tap 클릭시 실행될 function
  const clickMainTap = () => {
    setMainContent(true);
    setReviewsContent(false);
    mainDataSetting();
  };

  const clickReviewsTap = () => {
    setMainContent(false);
    setReviewsContent(true);
  };

  ////////////////////////////////////////////
  //          HARD CODING 임시 DATA         //
  ////////////////////////////////////////////
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
        steam: true,
        price: 5.6,
      },
      {
        image_path: exampleGameImg,
        game_name: "Star Survivor",
        window: true,
        apple: false,
        steam: false,
        price: 5.6,
      },
      {
        image_path: exampleGameImg,
        game_name: "Star Survivor",
        window: false,
        apple: true,
        steam: false,
        price: 5.6,
      },
      {
        image_path: exampleGameImg,
        game_name: "Star Survivor",
        window: true,
        apple: true,
        steam: true,
        price: 5.6,
      },
      {
        image_path: exampleGameImg,
        game_name: "Star Survivor",
        window: true,
        apple: false,
        steam: true,
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
        gameTitle: "Star Survivor",
        reviewTitle: "홀리 게임이에요",
        reviewContent: "이걸 이제야 알다니",
        reviewGrade: 4,
        createdAt: "2023-03-01",
        updatedAt: "0000-00-00",
      },
      {
        reviewId: 3,
        gameId: 4,
        gameImagePath: exampleGameImg,
        gameTitle: "Star Survivor",
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
        createdAt: "2023-03-01",
        updatedAt: "0000-00-00",
      },
    ],
    page: {
      pageNum: 1,
      size: 5,
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
                  return (
                    Math.ceil((e.value / statisticsSum) * 100) + "%"
                  );
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
                  {statisticsData[1].id}, {statisticsData[2].id}{" "}
                  장르도 선호하는 장르입니다.
                </h4>) : ""}
            </div>
          </div>);
      } else {
        result.push(
          <div className="statistics" key="statisticsBox">
            <div className="no-data-msg">
              아직 플레이 기록이 없어요 : (
            </div>
          </div>
        );
      }
      return result;
    }

    const result = [];
    result.push(<div key="mainContent">
      <ProfileMainStatistics>{statisticsRend()}</ProfileMainStatistics>
      <div className="scrap-header">ScrapBook</div>
      <ProfileScrapBook>{scrapGamesRend()}</ProfileScrapBook>
    </div>);
    return result;
  }

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
            steam={e.steam}
            price={e.price}
          ></GameSummary>
        );
        idx++;
      });
      return result;
    };
    const setPage = (e) => {
      setCurrentpage(e);
    };
    const result = [];
    if (scrapGames && scrapGames.length > 0) {
      result.push((
        <div key={"scrapGames"}>
          <div className="box">{singleScrapDataRend()}</div>
          {gamesCount > 6 ? (<Paging
            page={currentpage}
            count={gamesCount}
            setPage={setPage}
          />) : ""}
        </div>));
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
        result.push(
          <FaStar active={(i < rating).toString()} key={i}>
            <FontAwesomeIcon icon={faStar} className="fa-star" />
          </FaStar>
        );
      }
      return result;
    };
    const reivewRend = () => {
      const result = [];
      reviewData.result.forEach((e) => {
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
                  src={e.gameImagePath}
                  alt="profile"
                  className="game-img"
                />
              </div>
              <div className="game-content-wrapper">
                <p className="game-title">{e.gameTitle}</p>
                <div className="star-wrapper">
                  {starsRend(e.reviewGrade)}
                </div>
              </div>
              <FontAwesomeIcon icon={faPenToSquare} className="fa-star" />
            </div>
            <p className="review-title">{e.reviewTitle}</p>
            <p className="review-content">{e.reviewContent}</p>
          </SingleReview>
        );
      });
      return result;
    };
    const result = [];
    result.push(
      <ProfileReviewsWrapper key="reviewTapData">
        <div className="review-header">내가 작성한 리뷰 모아보기</div>
        {reviewData ? (<div className="review-wrapper">{reivewRend()}</div>)
          : (<div className="no-review"><p>작성된 리뷰가 없습니다.</p></div>)}
      </ProfileReviewsWrapper>
    );
    return result;
  };

  useEffect(mainDataSetting, [userId, setMainTapData]);

  return (
    <ProfileBackgroundWrapper>
      <div className="profile-box">
        <div>
          <ProfileImgWrapper>
            <img src={profileImg} alt="profileImage" />
            {userName != null ? (
              <p className="profile-name">{userName}</p>
            ) : ""}
          </ProfileImgWrapper>
        </div>
        <nav>
          <ProfileNavWrapper>
            <div className="flex">
              <div
                className={`${mainContent === true ? "nav-tap-clicked" : "nav-tap"}`}
                onClick={() => clickMainTap()}>
                Main
              </div>
              <div
                className={`${reviewsContent === true ? "nav-tap-clicked" : "nav-tap"}`}
                onClick={() => clickReviewsTap()}>
                Reviews
              </div>
            </div>
            <div className="nav-line"></div>
          </ProfileNavWrapper>
        </nav>
        <section>
          {mainContent === true ? mainTapRend()
            : reviewsContent === true ? reviewTapRend()
              : ""}
          <div></div>
        </section>
      </div>
    </ProfileBackgroundWrapper>
  );
};

export default Profile;
