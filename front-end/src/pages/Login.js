import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { useRecoilState } from "recoil";
import { userState } from "../recoil/user";

import { BACKEND_URL } from "../config";
import LoadingPage from "../components/LoadingPage";

const Login = () => {
  const [cookies, setCookies] = useCookies(["accessToken"]);
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <LoadingPage></LoadingPage>
    </div>
  );
};

export default Login;
