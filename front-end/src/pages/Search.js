import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
//Components
import Tag from "../components/Tag";
import CheckBox from "../components/CheckBox";
import Switch from "../components/Switch";
import ProfileCircle from "../components/ProfileCircle";
import GameClip from "../components/GameClip";
//Emotion
import {
  SearchWrapper,
  SearchHistoryWrapper,
  SearchResultsWrapper,
  UserSearchResultsWrapper,
} from "../styles/SearchEmotion";

const Search = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  const [userName, setUserName] = useState(String);
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchGameResults, setSearchGameResults] = useState([]);
  const [searchUserResults, setSearchUserResults] = useState([]);

  const [genreCheckedList, setGenreCheckList] = useState([]);
  const [priceStr, setPriceStr] = useState("Any Price");
  const [isMulti, setIsMulti] = useState(false);
  const [isKoreanSupport, setIsKoreanSupport] = useState(false);
  const genreList = [
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
  
  useEffect(() => {
    dataSetting();
  }, []);

  const priceInput = useRef();
  
  const dataSetting = () => {
    console.log();
    axios
    .get(`${BACKEND_URL}api/search`, {
      params: {
        niddle: "",
        gamePageNo: 0,
        userPageNo: 0,
      },
    })
    .then((response) => {
      setSearchGameResults(response.data.games);
      setSearchUserResults(response.data.users);
      setUserName("Name");
      const getSeachHistory = ["star", "universe"];
      setSearchHistory(getSeachHistory);
    })
    .catch((error) => {});
  };

  //////////////////////////////////
  // filter func
  const changePriceFilter = () => {
    const idx = Number(priceInput.current.value);
    setPriceStr(priceStrArr[idx]);
    //setPriceLimit(priceLimitArr[idx]);
    const list = [
      { price: 2, name: "2$" },
      { price: 40, name: "40$" },
      { price: 0, name: "free" },
      { price: 300, name: "300$" },
    ];
    const result = [];
    list.forEach((e) => {
      if (e.price <= priceLimitArr[idx]) {
        result.push(e.name);
      }
    });
    console.log(result);
  };

  const changeGenreFilter = (name, state) => {
    const tmp = genreCheckedList;
    if (state === "push") {
      tmp.push(name);
    } else if (state === "remove") {
      const idx = tmp.indexOf(name);
      tmp.splice(idx, 1);
    }
    setGenreCheckList(tmp);
    console.log(genreCheckedList);
  };

  const changeMultiFilter = (str) => {
    if (str === "on") {
      if (!isMulti) {
        setIsMulti(true);
        console.log("on");
      }
    } else if (str === "off") {
      if (isMulti) {
        setIsMulti(false);
        console.log("off");
      }
    } else {
      setIsMulti(!isMulti);
      if (!isMulti) {
        console.log("on");
      } else {
        console.log("off");
      }
    }
  };

  const changeKoreanFilter = (boolean) => {
    setIsKoreanSupport(boolean);
    if (boolean) {
      console.log("on");
    } else {
      console.log("off");
    }
  };


  const tagDelete = (value) => {
    console.log(value + "delete");
  };

  const tagClick = (value) => {
    console.log(value + "search");
  };

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

  const searchResultsRend = () => {
    ////////// Filter //////////
    const gameFilterRend = () => {
      const result = [];
      // price
      result.push(
        <div key="price" className="price-section">
          <div className="filter-header">Price</div>
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
        let idx = 0;
        genreList.forEach((e) => {
          result.push(
            <div key={idx}>
              <CheckBox
                name={e}
                list={genreCheckedList}
                event={changeGenreFilter}
                label={true}
              ></CheckBox>
            </div>
          );
          idx++;
        });
        return result;
      };
      result.push(
        <div key="genre" className="genre-section">
          <div className="filter-header">Genre</div>
          <div className="genre-wrapper">{genreRend()}</div>
          <div className="filter-line-wrapper">
            <div className="filter-line"></div>
          </div>
        </div>
      );
      // multiplayer
      result.push(
        <div key="MultiPlayer" className="multiplayer-section">
          <div className="filter-header">MultiPlayer</div>
          <div className="multi-wrapper">
            <div
              onClick={() => {
                changeMultiFilter("off");
              }}
              className="multi-str"
            >
              Solo
            </div>
            <Switch
              isOn={isMulti}
              onClick={() => {
                changeMultiFilter("toggle");
              }}
            />
            <div
              onClick={() => {
                changeMultiFilter("on");
              }}
              className="multi-str"
            >
              Multi
            </div>
          </div>
          <div className="filter-line-wrapper">
            <div className="filter-line"></div>
          </div>
        </div>
      );
      // korean
      result.push(
        <div key="koreanSupport" className="korean-support-section">
          <div className="filter-header">한국어 지원</div>
          <CheckBox
            name="한국어 지원"
            list={[]}
            event={changeKoreanFilter}
            label={false}
          ></CheckBox>
        </div>
      );
      return result;
    };
    ////////// Items //////////
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
    const result = [];
    result.push(
      <SearchResultsWrapper className="search-result-wrapper" key="gameResult">
        <div key="gameFilter" className="filter-wrapper">
          {gameFilterRend()}
        </div>
        <div key="gameResults" className="results-wrapper">
          {gameResultsRend()}
        </div>
        <UserSearchResultsWrapper>
          {userSearchResultsRend()}
        </UserSearchResultsWrapper>
      </SearchResultsWrapper>
    );
    return result;
  };

  const userSearchResultsRend = () => {
    const result = [];
    result.push(
      <div key="userGearchResultHeader" className="user-search-results-header">
        User search results
      </div>
    );
    const userResultsRend = () => {
      const result = [];
      if (
        searchUserResults &&
        searchUserResults.length > 0
      ) {
        let idx = 0;
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
          idx++;
        });
      } else {
        result.push(
          <div key="noUserResults" className="no-user-results">
            0 results match your search.
          </div>
        );
      }
      return result;
    };
    result.push(
      <div key="userResults" className="user-results">
        {userResultsRend()}
      </div>
    );
    return result;
  };

  return (
    <SearchWrapper>
      <SearchHistoryWrapper>{searchHistoryRend()}</SearchHistoryWrapper>
      <div className="game-search-results-header">Game search results</div>
      {searchResultsRend()}
    </SearchWrapper>
  );
};

export default Search;
