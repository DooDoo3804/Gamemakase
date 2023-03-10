import { useEffect, useState } from "react";
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
  ProfileReviewsSection,
} from "../styles/ProfileEmotion";
import { FaStar, ReviewWrapper, SingleReview } from "../styles/DetailEmotion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

// 임시 import 이미지
import exampleGameImg from "../assets/image 7.svg";
import profileImg from "../assets/profileImg.svg";

const Profile = () => {
  const location = useLocation();
  const userId = location.pathname.split("/").reverse()[0];

  const [userName, setUserName] = useState(String);

  const [mainContent, setMainContent] = useState(true);
  const [reviewsContent, setReviewsContent] = useState(false);
  //const [friendsContent, setFriendsContent] = useState(false);

  const [statisticsData, setStatisticsData] = useState(Array);
  const [statisticsSum, setStatisticsSum] = useState(Number);

  // paging 관련 state
  const [scrapGames, setScrapGames] = useState([]);
  const [gamesCount, setGamesCount] = useState(0);
  const [currentpage, setCurrentpage] = useState(1);
  const [countPerPage] = useState(6);

  const clickMainTap = () => {
    setMainContent(true);
    setReviewsContent(false);
    //setFriendsContent(false);
    mainDataRend();
  };
  const clickReviewsTap = () => {
    setMainContent(false);
    setReviewsContent(true);
    //setFriendsContent(false);
  };
  // const clickFriendsTap = () => {
  //   setMainContent(false);
  //   setReviewsContent(false);
  //   setFriendsContent(true);
  // };

  // main tap function
  const mainDataRend = () => {
    if (userId === "1") {
      const tmp = [
        { id: "Casual", value: 116 },
        { id: "Indie", value: 56 },
        { id: "RPG", value: 198 },
        { id: "Action", value: 519 },
        { id: "Adventure", value: 317 },
      ];
      setStatisticsData(
        tmp.sort((data1, data2) => {
          return data2.value - data1.value;
        })
      );
      setStatisticsSum(calStatisticsSum(tmp));
      setScrapGames([
        {
          image_path: exampleGameImg,
          game_name: "Star Survivor adsfasdfiq,mag asdf ff",
          window: true,
          apple: false,
          steam: true,
          price: "5.6",
        },
        {
          image_path: exampleGameImg,
          game_name: "Star Survivor",
          window: true,
          apple: false,
          steam: false,
          price: "5.6",
        },
        {
          image_path: exampleGameImg,
          game_name: "Star Survivor",
          window: false,
          apple: true,
          steam: false,
          price: "5.6",
        },
        {
          image_path: exampleGameImg,
          game_name: "Star Survivor",
          window: true,
          apple: true,
          steam: true,
          price: "5.6",
        },
        {
          image_path: exampleGameImg,
          game_name: "Star Survivor",
          window: true,
          apple: false,
          steam: true,
          price: "5.6",
        },
      ]);
      setGamesCount(5);
    } else if (userId === "2") {
      const tmp = [
        { id: "Casual", value: 116 },
        { id: "Indie", value: 56 },
      ];
      setStatisticsData(
        tmp.sort((data1, data2) => {
          return data2.value - data1.value;
        })
      );
      setStatisticsSum(calStatisticsSum(tmp));
      setScrapGames([]);
    } else if (userId === "3") {
      const tmp = [{ id: "Casual", value: 116 }];
      setStatisticsData(
        tmp.sort((data1, data2) => {
          return data2.value - data1.value;
        })
      );
      setStatisticsSum(calStatisticsSum(tmp));
      setScrapGames([]);
    } else {
      const tmp = [];
      setStatisticsData(
        tmp.sort((data1, data2) => {
          return data2.value - data1.value;
        })
      );
      setStatisticsSum(calStatisticsSum(tmp));
      setScrapGames([]);
    }
    setUserName("Username");
  };

  const calStatisticsSum = (Array) => {
    let statisticsSumTmp = 0;
    for (let i = 0; i < Array.length; i++) {
      statisticsSumTmp += Array[i].value;
    }
    return statisticsSumTmp;
  };

  const scrapJSX = () => {
    const result = [];
    let idx = 0;
    scrapGames.forEach((e) => {
      let tags = (
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
      result.push(tags);
      idx++;
    });
    return result;
  };

  // ReviewTap Function
  const setPage = (e) => {
    setCurrentpage(e);
    // 스크랩 컨텐츠 재설정 함수 부름
  };

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
        gameTitle :"Star Survivor" ,
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
        gameTitle :"Star Survivor" ,
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
        gameTitle :"Star Survivor" ,
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
        gameTitle :"Star Survivor" ,
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
                {renderStars(e.reviewGrade)}
              </div>
            </div>
          </div>
          <p className="review-title">{e.reviewTitle}</p>
          <p className="review-content">{e.reviewContent}</p>
        </SingleReview>
      );
    });
    return result;
  };

  useEffect(mainDataRend, [userId]);
  useEffect(() => {
    //setGamesCount(gamesCount);
  }, [currentpage, scrapGames, countPerPage]);

  return (
    <ProfileBackgroundWrapper>
      <div className="profile-box">
        <div>
          <ProfileImgWrapper>
            <img src={profileImg} alt="profileImage" />
            {userName != null ? (
              <p className="profile-name">{userName}</p>
            ) : (
              <div />
            )}
          </ProfileImgWrapper>
        </div>
        <nav>
          <ProfileNavWrapper>
            <div className="flex">
              <div
                className={`${
                  mainContent === true ? "nav-tap-clicked" : "nav-tap"
                }`}
                onClick={() => clickMainTap()}
              >
                Main
              </div>
              <div
                className={`${
                  reviewsContent === true ? "nav-tap-clicked" : "nav-tap"
                }`}
                onClick={() => clickReviewsTap()}
              >
                Reviews
              </div>
              {/* <div
                className={`${friendsContent === true ? "nav-tap-clicked" : "nav-tap"
                  }`}
                onClick={() => clickFriendsTap()}
              >
                Friends
              </div> */}
            </div>
            <div className="nav-line"></div>
          </ProfileNavWrapper>
        </nav>
        <section>
          {mainContent === true ? (
            <div>
              <ProfileMainStatistics>
                <div className="statistics">
                  {statisticsData.length > 0 ? (
                    <>
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
                          </h4>
                        ) : (
                          ""
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="no-data-msg">
                      아직 플레이 기록이 없어요 : (
                    </div>
                  )}
                </div>
              </ProfileMainStatistics>
              <div className="scrap-header">ScrapBook</div>
              <ProfileScrapBook>
                {(scrapGames.length > 0 && gamesCount > 6) ? (
                  <div>
                    <div className="box">{scrapJSX()}</div>
                    <Paging
                      page={currentpage}
                      count={gamesCount}
                      setPage={setPage}
                    />
                  </div>
                ) : (
                  <div className="no-data-msg">
                    아직 스크랩한 게임이 없어요 : ({" "}
                  </div>
                )}
              </ProfileScrapBook>
            </div>
          ) : reviewsContent === true ? (
            <div>
              <ProfileReviewsSection>
                <div className="review-header">내가 작성한 리뷰 모아보기</div>
                <ReviewWrapper>
                  {reviewData ? (
                    // 리뷰 내용 많을 때 처리해야 함
                    <div className="review-wrapper">{renderReviews()}</div>
                  ) : (
                    <div className="no-review">
                      <p>작성된 리뷰가 없습니다.</p>
                    </div>
                  )}
                </ReviewWrapper>
              </ProfileReviewsSection>
            </div>
          ) : (
            <div>
              <ProfileReviewsSection>
                <div className="review-header">내가 작성한 리뷰 모아보기</div>
              </ProfileReviewsSection>
            </div>
          )}
          <div></div>
        </section>
      </div>
    </ProfileBackgroundWrapper>
  );
};

export default Profile;
