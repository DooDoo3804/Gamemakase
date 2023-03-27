import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../recoil/user";

import LoadingPage from "../components/LoadingPage";
import { BACKEND_URL } from "../config";

const Login = () => {
  const httpRequest = new XMLHttpRequest();
  const [cookies, setCookies] = useCookies(["access-token"]);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    // if (
    //   httpRequest.readyState === XMLHttpRequest.DONE &&
    //   httpRequest.status === 301
    // ) {
    // }
    // console.log(request.getHeaderNames());
    setCookies(
      "access-token",
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMyIsImV4cCI6MTY3OTg5MTcyNn0.itvzRMufou9u-w_gQQMrfgp9Al7bySObBThY262FmKV0HHolq0fbuzGcP3SUk8wHxBUNi8BvpA_p2FaNbTzbgA"
    );
    // console.log(httpRequest.getResponseHeader("access-token"));

    console.log(cookies);
    axios
      .get(`${BACKEND_URL}auth/user`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization:
          //   ,
        },
      })
      .then(function (response) {
        console.log(response.data);
        // setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <LoadingPage></LoadingPage>
    </div>
  );
};

export default Login;
