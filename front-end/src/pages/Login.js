import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { useRecoilState } from "recoil";
import { userState } from "../recoil/user";

import { BACKEND_URL } from "../config";
import LoadingPage, { LoadingWrapper } from "../components/LoadingPage";
import Lottie from "react-lottie";

import calc_loading from "../assets/lottie/calc-loading.json";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies(["accessToken"]);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    handleLogin();
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

      if (loginResponse.data.djangoRequest) {
        setLoading(true);
        const calcResponse = await axios.get(
          `${BACKEND_URL}recommend/games/small/${loginResponse.data.userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(calcResponse.status);
        setLoading(false);
        if (calcResponse.status === 201) {
          console.log("계산을 완료했습니다.");
        } else {
          console.log("계산에 실패했습니다.");
        }
      }
    } catch (error) {
      console.log(error);
      alert("로그인 도중 오류가 발생했습니다.");
      handleLogout();
    }

    if (cookies["redirect-url"]) {
      window.location.replace(cookies["redirect-url"]);
    } else {
      window.location.replace("/");
    }
  };

  const handleLogout = () => {
    setUser(null);
    removeCookie("accessToken");
  };

  const options = (lottiefile) => {
    return {
      loop: true,
      autoplay: true,
      animationData: lottiefile,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
  };

  if (loading) {
    return (
      <div>
        <LoadingWrapper>
          <Lottie
            options={options(calc_loading)}
            height={300}
            width={300}
          ></Lottie>
          <p> </p>
          <p className="title-text">사용자의 게임 기록을 분석 중입니다.</p>
          <p className="info-text">잠시만 기다려주세요.</p>
        </LoadingWrapper>
      </div>
    );
  }

  return (
    <div>
      <LoadingPage></LoadingPage>
    </div>
  );
};

export default Login;
