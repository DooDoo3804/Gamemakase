import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Lottie from "react-lottie";

import { useRecoilState } from "recoil";
import { userState } from "../recoil/user";

import { BACKEND_URL } from "../config";
import LoadingPage from "../components/LoadingPage";
import { LoadingWrapper } from "../components/LoadingPage";

import calc_loading from "../assets/lottie/calc-loading.json";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const [user, setUser] = useRecoilState(userState);

  // 임시 데이터
  const userId = 1;

  // useEffect(() => {
  //   console.log(cookies["accessToken"]);

  //   axios
  //     .get(`${BACKEND_URL}auth/user`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         accessToken: cookies["accessToken"],
  //       },
  //     })
  //     .then(function (response) {
  //       console.log(response.data);
  //       // setUser(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

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
      setUser(loginResponse.data);
    } catch (error) {
      console.log(error);
    }

    // todo : 가입시에만 하도록 처리
    try {
      console.log("계산 요청을 시작합니다.");
      setLoading(true);
      const calcResponse = await axios.get(
        `${BACKEND_URL}auth/recommend/users/small/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            accessToken: cookies["accessToken"],
          },
        }
      );
      console.log(calcResponse.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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
