import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router";
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

const Search = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const niddle = params.get('query');

  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(String);
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchGameResults, setSearchGameResults] = useState([]);
  const [searchUserResults, setSearchUserResults] = useState([]);

  const gameResultWrapper = useRef();

  // condition
  const [priceStr, setPriceStr] = useState("Any Price");
  const [priceLimit, setPriceLimit] = useState(99999);
  const [genreList, setGenreList] = useState([]);
  const [isKoreanSupport, setIsKoreanSupport] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);
  // paging
  const [curGamePageNo, setCurGamePageNo] = useState(0);
  const [curUserPageNo, setCurUserPageNo] = useState(0);

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

  const dataSetting = useCallback((niddle) => {
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
        setUserName("김아무개");
        const getSeachHistory = ["star", "universe"];
        setSearchHistory(getSeachHistory);
        setIsLoading(false);
      })
      .catch((error) => { });
  }, []);

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
    }
  }, []);

  const priceInput = useRef();

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
      .catch((error) => { });
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
      .catch((error) => { });
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

  const tagDelete = (value) => {
    console.log(value + "delete");
  };

  const tagClick = (value) => {
    console.log(value + "search");
  };

  ///////////////////////////////////////
  ///////////////////////////////////////
  // RENDING

  const searchHistoryRend = () => {
    const result = [];
    result.push(
      <div key="searchHistory" className="tag-header">
        최근 {userName} 님의 검색
      </div>
    );
    const tagsRend = () => {
      const result = [];
      let idx = 0;
      searchHistory.forEach((e) => {
        result.push(
          <Tag key={idx} value={e} delete={tagDelete} click={tagClick}></Tag>
        );
        idx++;
      });
      if (searchHistory.length <= 0) {
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
      };
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
    if (
      searchGameResults &&
      searchGameResults.length > 0
    ) {
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
          Sorry 0 results match your search. : (
        </div>
      );
    }
    return result;
  };

  const userResultsRend = () => {
    const result = [];
    if (
      searchUserResults &&
      searchUserResults.length > 0
    ) {
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
          0 results match your search.
        </div>
      );
    }
    return result;
  };

  const userSearchResultsRend = () => {
    const result = [];
    result.push(
      <div key="userGearchResultHeader" className="user-search-results-header">
        User search results
      </div>
    );
    if (width <= 1160) {
      result.push(
        <div key="userResults" className="user-results">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView='auto'
            navigation
            pagination={{ clickable: true }}
          >
            {userResultsRend()}
          </Swiper>
        </div>);
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
          <SearchHistoryWrapper>{searchHistoryRend()}</SearchHistoryWrapper>
          <div className="game-search-results-header">Game search results</div>
          <SearchResultsWrapper className="search-result-wrapper" key="gameResult">
            <FilterWrapper className="filter-wrapper">
              {gameFilterRend()}
            </FilterWrapper>
            <div key="gameResults" className="results-wrapper" ref={gameResultWrapper}>
              {gameResultsRend()}
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
          <SearchHistoryWrapper>{searchHistoryRend()}</SearchHistoryWrapper>
          <div className="search-result-wrapper">
            <UserSearchResultsWrapper>
              {userSearchResultsRend()}
            </UserSearchResultsWrapper>
            <GameSearchResultsWrapper>
              <div className="game-search-results-header-mobile">Game search results</div>
              <MobileGameResult>
                <FilterWrapper className="filter-wrapper">
                  {gameFilterRend()}
                </FilterWrapper>
                <GameSearchResult className="results-wrapper" ref={gameResultWrapper}>
                  {gameResultsRend()}
                </GameSearchResult>
              </MobileGameResult>
            </GameSearchResultsWrapper>
          </div>
        </SearchWrapper >);
    }
  }
};

export default Search;
