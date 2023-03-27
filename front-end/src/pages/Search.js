import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
//Components
import Tag from "../components/Tag";
import CheckBox from "../components/CheckBox";
import Switch from "../components/Switch";
import ProfileCircle from "../components/ProfileCircle";
import GameClip from "../components/GameClip";
import LoadingPage from "../components/LoadingPage";
//Emotion
import {
  SearchWrapper,
  SearchHistoryWrapper,
  SearchResultsWrapper,
  UserSearchResultsWrapper,
  FilterWrapper,
  GameSearchResult,
  GameSearchResultsWrapper,
  MobileGameResult,
} from "../styles/SearchEmotion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import search from "../assets/fontAwesomeSvg/search.svg";

const Search = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const niddle = params.get("query");
  const [width, setWidth] = useState(window.innerWidth);

  // 임시
  const [userId, setUserId] = useState(1);
  const [userName, setUserName] = useState("");

  // ajax data
  const [isLoading, setIsLoading] = useState(true);
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchGameResults, setSearchGameResults] = useState([]);
  const [searchUserResults, setSearchUserResults] = useState([]);

  // use ref
  const gameResultWrapper = useRef();
  const keyword = useRef();

  // filter condition
  const [priceStr, setPriceStr] = useState("Any Price");
  const [priceLimit, setPriceLimit] = useState(99999);
  const [genreList, setGenreList] = useState([]);
  const [isKoreanSupport, setIsKoreanSupport] = useState(false);
  // paging
  const [curGamePageNo, setCurGamePageNo] = useState(0);
  const [curUserPageNo, setCurUserPageNo] = useState(0);
  const [ref, inView] = useInView();
  const [hasNextPage, setHasNextPage] = useState(true);

  // static info
  const genreNameList = [
    "액션",
    "어드벤쳐",
    "전략",
    "RPG",
    "인디",
    "캐쥬얼",
    "시뮬레이션",
    "레이싱",
    "스포츠",
    "디자인",
    "유틸리티",
  ];
  const genreEngNameList = [
    "Action",
    "Adventure",
    "Strategy",
    "RPG",
    "Indie",
    "Casual",
    "Simulation",
    "Racing",
    "Sports",
    "Design & Illustration",
    "Utilities",
  ];
  const priceStrArr = [
    "Free",
    "Under $5",
    "Under $10",
    "Under $15",
    "Under $20",
    "Under $25",
    "Under $30",
    "Under $35",
    "Under $40",
    "Under $45",
    "Under $50",
    "Under $55",
    "Under $60",
    "Any Price",
  ];
  const priceLimitArr = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 99999999,
  ];

  const dataSetting = useCallback(
    (niddle) => {
      // login시
      if (userId) {
        setUserName("김아무개");
        // 현재 검색기록을 post
        if (niddle && niddle.length > 0) {
          axios
            .post(`${BACKEND_URL}api/search/history`, {
              userId: userId,
              content: niddle,
            })
            .catch((error) => {
              console.log(error);
            });
        }
        // 검색기록 가져오기
        axios
          .get(`${BACKEND_URL}api/search/history`, {
            params: {
              userId: userId,
            },
          })
          .then((response) => {
            const history = response.data;
            if (history.indexOf(niddle) < 0 && niddle && niddle.length > 0) {
              history.push(niddle);
            }
            setSearchHistory(history);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      // 검색 결과 가져오기
      axios
        .get(`${BACKEND_URL}api/search`, {
          params: {
            niddle: niddle,
            gamePageNo: 0,
            userPageNo: 0,
          },
        })
        .then((response) => {
          setSearchGameResults(response.data.games);
          setSearchUserResults(response.data.users);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [userId]
  );

  const priceInput = useRef();

  //////////////////////////////
  // use effect

  useEffect(() => {
    dataSetting(niddle);
  }, [dataSetting, niddle]);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getMoreGames = useCallback(async () => {
    let genreParamString = "";
    for (let i = 0; i < genreList.length; i++) {
      genreParamString += genreList[i];
      if (i !== genreList.length - 1) {
        genreParamString += ",";
      }
    }
    axios
      .get(`${BACKEND_URL}api/search/game`, {
        params: {
          niddle: niddle,
          price: priceLimit,
          useIsKorean: isKoreanSupport ? true : false,
          isKorean: isKoreanSupport,
          genreList: genreParamString,
          gamePageNo: curGamePageNo + 12,
        },
      })
      .then((response) => {
        setCurGamePageNo(curGamePageNo + 12);
        setSearchGameResults((searchGameResults) => [
          ...searchGameResults,
          ...response.data,
        ]);
        setHasNextPage(response.data.length < 12 ? false : true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [niddle, curGamePageNo, genreList, isKoreanSupport, priceLimit]);

  useEffect(() => {
    if (inView && hasNextPage) {
      getMoreGames();
    }
  }, [getMoreGames, inView, hasNextPage]);

  //////////////////////////////////
  // filter func

  const changePriceFilter = () => {
    gameResultWrapper.current.className = "results-wrapper loading";
    const idx = Number(priceInput.current.value);
    setPriceStr(priceStrArr[idx]);
    setPriceLimit(priceLimitArr[idx]);
    let genreParamString = "";
    for (let i = 0; i < genreList.length; i++) {
      genreParamString += genreList[i];
      if (i !== genreList.length - 1) {
        genreParamString += ",";
      }
    }
    axios
      .get(`${BACKEND_URL}api/search/game`, {
        params: {
          niddle: niddle,
          price: priceLimitArr[idx],
          userIsKorean: isKoreanSupport ? true : false,
          isKorean: isKoreanSupport,
          genreList: genreParamString,
          gamePageNo: 0,
        },
      })
      .then((response) => {
        setSearchGameResults(response.data);
        gameResultWrapper.current.className = "results-wrapper";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeGenreFilter = (name, state) => {
    gameResultWrapper.current.className = "results-wrapper loading";
    const tmp = genreList;
    if (state === "push") {
      tmp.push(name);
    } else if (state === "remove") {
      const idx = tmp.indexOf(name);
      tmp.splice(idx, 1);
    }
    setGenreList(tmp);
    let paramString = "";
    for (let i = 0; i < tmp.length; i++) {
      paramString += tmp[i];
      if (i !== tmp.length - 1) {
        paramString += ",";
      }
    }
    axios
      .get(`${BACKEND_URL}api/search/game`, {
        params: {
          niddle: niddle,
          price: priceLimit,
          userIsKorean: isKoreanSupport ? true : false,
          isKorean: isKoreanSupport,
          genreList: paramString,
          gamePageNo: 0,
        },
      })
      .then((response) => {
        setSearchGameResults(response.data);
        gameResultWrapper.current.className = "results-wrapper";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeKoreanFilter = () => {
    gameResultWrapper.current.className = "results-wrapper loading";
    setIsKoreanSupport(!isKoreanSupport);
    let genreParamString = "";
    for (let i = 0; i < genreList.length; i++) {
      genreParamString += genreList[i];
      if (i !== genreList.length - 1) {
        genreParamString += ",";
      }
    }
    axios
      .get(`${BACKEND_URL}api/search/game`, {
        params: {
          niddle: niddle,
          price: priceLimit,
          userIsKorean: !isKoreanSupport,
          isKorean: !isKoreanSupport,
          genreList: genreParamString,
          gamePageNo: 0,
        },
      })
      .then((response) => {
        setSearchGameResults(response.data);
        gameResultWrapper.current.className = "results-wrapper";
      })
      .catch((error) => { });
  };

  /////////////////////////////////////
  // etc func

  const tagAllDelete = () => {
    axios
      .delete(`${BACKEND_URL}api/search/history/all`, {
        params: {
          userId: userId,
        },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const tagDelete = (value) => {
    axios
      .delete(`${BACKEND_URL}api/search/history`, {
        params: {
          userId: userId,
          content: value,
        },
      })
      .then((response) => {
        // let history = searchHistory;
        // const idx = history.indexOf(value);
        // history.splice(idx, 1);
        // setSearchHistory(history);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const tagClick = (value) => {
    window.location.assign("/search?query=" + value);
  };

  const enterSearchHandler = (e) => {
    if (e.key === "Enter") {
      if (keyword.current && keyword.current.value) {
        window.location.assign("/search?query=" + keyword.current.value);
        keyword.current.value = "";
      } else {
        window.location.assign("/search?query=");
      }
    }
  };

  const clickSearchHandler = () => {
    if (keyword.current && keyword.current.value) {
      window.location.assign("/search?query=" + keyword.current.value);
      keyword.current.value = "";
    } else {
      window.location.assign("/search?query=");
    }
  };

  ///////////////////////////////////////
  ///////////////////////////////////////
  // RENDING

  const searchHistoryRend = () => {
    const result = [];
    result.push(
      <div key="searchHistory" className="tag-header">
        최근 {userName} 님의 검색
        {searchHistory && searchHistory.length > 0 ? (
          <div onClick={() => {tagAllDelete()}} className="all-delete-btn">
            전체삭제
          </div>
        ) : (
          ""
        )}
      </div>
    );
    const tagsRend = () => {
      const result = [];
      let idx = 0;
      if (searchHistory && searchHistory.length > 0) {
        searchHistory.forEach((e) => {
          result.push(
            <Tag key={idx} value={e} delete={() => {tagDelete(e)}} click={() => {tagClick()}}></Tag>
          );
          idx++;
        });
      } else {
        result.push(
          <div className="no-history-msg" key={idx}>
            아직 검색 내역이 없어요.
          </div>
        );
      }
      return result;
    };
    result.push(
      <div key="tags" className="tags-wrapper">
        {tagsRend()}
      </div>
    );
    result.push(<div key="tagsLine" className="tags-line"></div>);
    return result;
  };

  const gameFilterRend = () => {
    const result = [];
    // price
    result.push(
      <div key="price" className="price-section">
        <div className="filter-header">가격</div>
        <div className="range-wrapper">
          <input
            type="range"
            min="0"
            max="13"
            step="1"
            ref={priceInput}
            onChange={changePriceFilter}
          />
          <div className="price-str">{priceStr}</div>
        </div>
        <div className="filter-line-wrapper">
          <div className="filter-line"></div>
        </div>
      </div>
    );
    // genre
    const genreRend = () => {
      const result = [];
      for (let i = 0; i < genreEngNameList.length; i++) {
        result.push(
          <div key={i}>
            <CheckBox
              engName={genreEngNameList[i]}
              korName={genreNameList[i]}
              list={genreList}
              event={changeGenreFilter}
              label={true}
            ></CheckBox>
          </div>
        );
      }
      return result;
    };
    result.push(
      <div key="genre" className="genre-section">
        <div className="filter-header">장르</div>
        <div className="genre-wrapper">{genreRend()}</div>
        <div className="filter-line-wrapper">
          <div className="filter-line"></div>
        </div>
      </div>
    );
    // korean
    result.push(
      <div key="MultiPlayer" className="korean-support-section">
        <div className="filter-header">한국어 지원</div>
        <div className="korean-support-wrapper">
          <Switch
            isOn={isKoreanSupport}
            onClick={() => {
              changeKoreanFilter();
            }}
          />
        </div>
      </div>
    );
    return result;
  };

  const gameResultsRend = () => {
    const result = [];
    if (searchGameResults && searchGameResults.length > 0) {
      searchGameResults.forEach((e) => {
        result.push(
          <GameClip
            key={e.gameId}
            title={e.gameName}
            gameId={e.gameId}
            imgUrl={e.imagePath}
            price={e.price}
            window={e.window}
            apple={e.apple}
            linux={e.linux}
          ></GameClip>
        );
      });
    } else {
      result.push(
        <div key="noGameResults" className="no-game-results-msg">
          검색과 매칭되는 결과가 0개입니다. : (
        </div>
      );
    }
    return result;
  };

  const userResultsRend = () => {
    const result = [];
    if (searchUserResults && searchUserResults.length > 0) {
      if (width <= 1160) {
        searchUserResults.forEach((e) => {
          result.push(
            <SwiperSlide key={e.userId}>
              <ProfileCircle
                userId={e.userId}
                profileImg={e.userImagePath}
                name={e.userName}
                online={e.state}
              ></ProfileCircle>
            </SwiperSlide>
          );
        });
      } else {
        searchUserResults.forEach((e) => {
          result.push(
            <ProfileCircle
              key={e.userId}
              userId={e.userId}
              profileImg={e.userImagePath}
              name={e.userName}
              online={e.state}
            ></ProfileCircle>
          );
        });
      }
    } else {
      result.push(
        <div key="noUserResults" className="no-user-results">
          검색과 매칭되는 결과가 0개 입니다.
        </div>
      );
    }
    return result;
  };

  const userSearchResultsRend = () => {
    const result = [];
    result.push(
      <div key="userGearchResultHeader" className="user-search-results-header">
        유저 검색 결과
      </div>
    );
    if (searchUserResults && searchUserResults.length > 0 && width <= 1160) {
      result.push(
        <div key="userResults" className="user-results">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView="auto"
            navigation
            pagination={{ clickable: true }}
          >
            {userResultsRend()}
          </Swiper>
        </div>
      );
    } else {
      result.push(
        <div key="userResults" className="user-results">
          {userResultsRend()}
        </div>
      );
    }
    return result;
  };

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  } else {
    if (width > 1160) {
      return (
        <SearchWrapper>
          {userId ? (
            <SearchHistoryWrapper>{searchHistoryRend()}</SearchHistoryWrapper>
          ) : (
            ""
          )}
          <div className="game-search-results-header">게임 검색 결과</div>
          <SearchResultsWrapper
            className="search-result-wrapper"
            key="gameResult"
          >
            <FilterWrapper className="filter-wrapper">
              {gameFilterRend()}
            </FilterWrapper>
            <div
              key="gameResults"
              className="results-wrapper"
              ref={gameResultWrapper}
            >
              {gameResultsRend()}
              <div ref={ref} className="scroll-handler" />
            </div>
            <UserSearchResultsWrapper>
              {userSearchResultsRend()}
            </UserSearchResultsWrapper>
          </SearchResultsWrapper>
        </SearchWrapper>
      );
    } else {
      return (
        <SearchWrapper>
          {width < 562 ? (
            <div className="search-section">
              <input
                type="text"
                className="search-bar"
                placeholder="search here..."
                ref={keyword}
                onKeyDown={(e) => enterSearchHandler(e)}
              ></input>
              <img
                src={search}
                alt="search-icon"
                onClick={() => clickSearchHandler()}
                className="search-icon"
              />
            </div>
          ) : (
            ""
          )}
          {userId ? (
            <SearchHistoryWrapper>{searchHistoryRend()}</SearchHistoryWrapper>
          ) : (
            ""
          )}
          <div className="search-result-wrapper">
            <UserSearchResultsWrapper>
              {userSearchResultsRend()}
            </UserSearchResultsWrapper>
            <GameSearchResultsWrapper>
              <div className="game-search-results-header-mobile">
                게임 검색 결과
              </div>
              <MobileGameResult>
                <FilterWrapper className="filter-wrapper">
                  {gameFilterRend()}
                </FilterWrapper>
                <GameSearchResult
                  className="results-wrapper"
                  ref={gameResultWrapper}
                >
                  {gameResultsRend()}
                  <div ref={ref} className="scroll-handler" />
                </GameSearchResult>
              </MobileGameResult>
            </GameSearchResultsWrapper>
          </div>
        </SearchWrapper>
      );
    }
  }
};

export default Search;
