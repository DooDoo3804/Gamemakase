import { useEffect, useState } from "react";
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

// 임시 import 이미지
import exampleGameImg from "../assets/image 7.svg";
import profileImg from "../assets/profileImg.svg";

const Profile = () => {
  const [userName, setUserName] = useState(String);

  const [mainContent, setMainContent] = useState(true);
  const [reviewsContent, setReviewsContent] = useState(false);
  //const [friendsContent, setFriendsContent] = useState(false);

  const [mainData, setMainData] = useState(Array);
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
    setMainData(
      [
        { id: "Casual", value: 116 },
        { id: "Indie", value: 56 },
        { id: "RPG", value: 198 },
        { id: "Action", value: 519 },
        { id: "Adventure", value: 317 },
      ].sort((data1, data2) => {
        return data2.value - data1.value;
      })
    );
    setStatisticsSum(116 + 56 + 198 + 519 + 317);
    setGamesCount(18);
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
    setUserName("Username");
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

  const setPage = (e) => {
    setCurrentpage(e);
    // 스크랩 컨텐츠 재설정 함수 부름
  };

  useEffect(mainDataRend, []);
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
                className={`${mainContent === true ? "nav-tap-clicked" : "nav-tap"
                  }`}
                onClick={() => clickMainTap()}
              >
                Main
              </div>
              <div
                className={`${reviewsContent === true ? "nav-tap-clicked" : "nav-tap"
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
                  <div className="pie-chart">
                    <ResponsivePie
                      data={mainData}
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
                  {mainData != null && mainData[0] != null ? (
                    <div className="mention">
                      <h2>{mainData[0].id} 게임을 선호하시는군요!</h2>
                      <h4>
                        {mainData[1].id}, {mainData[2].id} 장르도 선호하는
                        장르입니다.
                      </h4>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </ProfileMainStatistics>
              <div className="scrap-header">ScrapBook</div>
              <ProfileScrapBook>
                {scrapGames.length > 0 ? (
                  <div className="box">{scrapJSX()}</div>
                ) : (
                  <div></div>
                )}
                <Paging
                  page={currentpage}
                  count={gamesCount}
                  setPage={setPage}
                />
              </ProfileScrapBook>
            </div>
          ) : reviewsContent === true ? (
            <div>
              <ProfileReviewsSection>
                <div className="review-header">내가 작성한 리뷰 모아보기</div>
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
