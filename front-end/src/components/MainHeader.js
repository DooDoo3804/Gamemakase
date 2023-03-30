import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/user";

import { MainHeaderWrapper, SearchWrapper } from "../styles/MainHeaderEmotion";
import Logo from "../assets/gamemakase_logo.svg";
import FontLogo from "../assets/font_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
// import useBodyScrollLock from "./ScrollLock";
import LoginModal from "./LoginModal";

import { BACKEND_URL } from "../config";

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

  useEffect(() => {
    if (cookies["accessToken"]) {
      handleLogin();
    }
  }, []);

  const handleLogin = async () => {
    try {
      // console.log(cookies["accessToken"]);
      const loginResponse = await axios.get(`${BACKEND_URL}auth/user`, {
        headers: {
          "Content-Type": "application/json",
          accessToken: cookies["accessToken"],
        },
      });
      // console.log(loginResponse.data);
      setUser(loginResponse.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        alert("유효 시간 경과로 자동 로그아웃 처리되었습니다.");
        handleLogout();
      }
    }
  };

  const handleLoginOpen = () => {
    // setScrollPosition(lockScroll());
    setLoginView(true);
  };

  const handleLogout = () => {
    setUser(null);
    removeCookie("accessToken", { path: "/" });
    removeCookie("redirect-url", { path: "/" });
    window.location.replace(window.location.href);
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
