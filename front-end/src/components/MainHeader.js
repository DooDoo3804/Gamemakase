import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/user";

import { MainHeaderWrapper, SearchWrapper } from "../styles/MainHeaderEmotion";
import Logo from "../assets/gamemakase_logo.svg";
import FontLogo from "../assets/font_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
// import useBodyScrollLock from "./ScrollLock";
import LoginModal from "./LoginModal";
import { useCookies } from "react-cookie";

const MainHeader = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState();
  const [loginView, setLoginView] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  // const [scrollPosition, setScrollPosition] = useState(0);

  // const { lockScroll } = useBodyScrollLock();
  const keyword = useRef();

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

  const handleLoginOpen = () => {
    // setScrollPosition(lockScroll());
    setLoginView(true);
  };

  const handleLogout = () => {
    setUser(null);
    removeCookie("accessToken");
    console.log("로그아웃이 정상적으로 처리되었습니다.");
    window.location.replace("/");
  };

  return (
    <>
      <LoginModal
        loginView={loginView}
        setLoginView={setLoginView}
        // scrollPosition={scrollPosition}
      ></LoginModal>
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
            type="text"
            className="search-bar"
            placeholder="search here..."
            ref={keyword}
            onKeyDown={(e) => enterSearchHandler(e)}
          ></input>
          <FontAwesomeIcon
            icon={faSearch}
            onClick={() => clickSearchHandler()}
            className="search-icon"
          />
        </SearchWrapper>
        <div className="menu-wrapper">
          {user ? (
            <>
              <div
                className="profile-img"
                onClick={() => navigate(`/profile/${user.userId}`)}
              >
                {user.imagePath ? (
                  <img
                    src={user.imagePath}
                    alt="profile_img"
                    className="user-profile-img"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                )}
              </div>
              <p
                className="single-menu"
                onClick={() => navigate(`/profile/${user.userId}`)}
              >
                {user.userName}
              </p>
              <p className="single-menu"> </p>
              <p className="single-menu" onClick={() => handleLogout()}>
                LOGOUT
              </p>
            </>
          ) : (
            <p className="single-menu" onClick={() => handleLoginOpen()}>
              LOGIN
            </p>
          )}
        </div>
      </MainHeaderWrapper>
    </>
  );
};

export default MainHeader;
