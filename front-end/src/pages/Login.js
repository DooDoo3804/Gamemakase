import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { useRecoilState } from "recoil";
import { userState } from "../recoil/user";

import { BACKEND_URL } from "../config";
import LoadingPage from "../components/LoadingPage";

const Login = () => {
  const [cookies, setCookies, removeCookie] = useCookies(["accessToken"]);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    console.log(cookies["redirect-url"]);
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
      if (cookies["redirect-url"]) {
        window.location.replace(cookies["redirect-url"]);
      } else {
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
      alert("로그인 도중 오류가 발생했습니다.");
      handleLogout();
      if (cookies["redirect-url"]) {
        window.location.replace(cookies["redirect-url"]);
      } else {
        window.location.replace("/");
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    removeCookie("accessToken");
  };

  return (
    <div>
      <LoadingPage></LoadingPage>
    </div>
  );
};

export default Login;
