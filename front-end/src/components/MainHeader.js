import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { MainHeaderWrapper, SearchWrapper } from "../styles/MainHeaderEmotion";
import Logo from "../assets/gamemakase_logo.svg";
import FontLogo from "../assets/font_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

const MainHeader = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState();
  const keyword = useRef();

  const searchBarHandler = (e) => {
    keyword.current = e.target.value;
  };

  return (
    <MainHeaderWrapper>
      <div
        className="logo-wrapper"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => navigate("/")}
      >
        <img
          src={FontLogo}
          alt="Logo"
          className={hover ? "logo-img hover" : "logo-img hidden"}
        />
        <img
          src={Logo}
          alt="Logo"
          className={hover ? "logo-img hidden" : "logo-img hover"}
        />
      </div>
      <SearchWrapper>
        <input
          className="search-bar"
          placeholder="search here..."
          onChange={searchBarHandler}
        ></input>
        <FontAwesomeIcon
          icon={faSearch}
          onClick={() =>
            navigate("/search", { state: { keyword: keyword.current } })
          }
          className="search-icon"
        />
        {/* search 페이지에서 useLocation().state.keyword 로 받아서 사용 */}
      </SearchWrapper>
      <div className="menu-wrapper">
        <div className="profile-img">
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
        </div>
        {/* 아래 코드는 로그인 기능 생기고 수정 필요함 */}
        <p className="single-menu" onClick={() => navigate(`/profile/1`)}>
          USERNAME
        </p>
        <p className="single-menu"> </p>
        <p className="single-menu">LOGOUT</p>
      </div>
    </MainHeaderWrapper>
  );
};

export default MainHeader;
