import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { useCookies } from "react-cookie";
// import useBodyScrollLock from "./ScrollLock";
import { Common } from "../styles/Common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import gamemakase_logo from "../assets/gamemakase_logo.svg";
import { faSteam } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { BACKEND_URL } from "../config";

const LoginModalWrapper = styled(motion.div)`
  z-index: 999;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const LoginModalBody = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60%;
  background-image: linear-gradient(
    to bottom,
    rgba(50, 50, 50, 1),
    rgba(55, 51, 77, 1)
  );
  border: 2px solid ${Common.colors.white01};
  color: ${Common.colors.white01};
  transition: all 0.5s ease-in-out;
  font-family: "Sarpanch", sans-serif;

  @media (min-width: 1024px) {
    width: 25rem;
    min-height: 25rem;
    max-height: 30rem;
    border-radius: 2rem;
    padding: 2rem;
  }
  @media (max-width: 1024px) {
    width: 22rem;
    min-height: 25rem;
    max-height: 30rem;
    border-radius: 2rem;
    padding: 1.8rem;
  }
  @media (max-width: 768px) {
    width: 20rem;
    min-height: 25rem;
    max-height: 30rem;
    border-radius: 1.5rem;
    padding: 1.5rem;
  }
  @media (max-width: 500px) {
    width: 85%;
    height: 35rem;
    border-radius: 1rem;
    padding: 1rem;
  }

  .icon-container {
    width: 100%;
    display: flex;
    justify-content: end;

    transition: all 0.3s ease-in-out;

    @media (min-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
    @media (max-width: 500px) {
      font-size: 1rem;
    }

    .x-mark {
      cursor: pointer;
    }
  }

  .login-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 80%;
  }

  .logo-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .logo {
  }

  .welcome-text {
  }

  .login-btn {
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Common.colors.mainColor06};
    width: 10rem;
    height: 3rem;
    border-radius: 2rem;
    cursor: pointer;
  }
`;

const LoginModal = ({ loginView, setLoginView }) => {
  const outSection = useRef();
  const [cookies, setCookies] = useCookies(["token"]);

  // const { openScroll } = useBodyScrollLock();

  const handleClose = () => {
    // openScroll(scrollPosition);
    setLoginView(false);
  };

  const handleLogin = () => {
    window.location.assign(`${BACKEND_URL}api/login/steam`);
    // axios
    //   .get(`${BACKEND_URL}api/login/steam`, {
    //     headers: { "Content-Type": "application/json" },
    //   })
    //   .then(function (response) {
    //     console.log(response.data);
    //     // axios 요청해서 쿠키에 저장
    //     // setCookies('token', response.data.token)
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     // if (error.response.status === 500) {
    //     //   window.location.replace("/500");
    //     // } else {
    //     // }
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <AnimatePresence>
      {loginView ? (
        <LoginModalWrapper
          ref={outSection}
          onClick={(e) => {
            if (outSection.current === e.target) {
              handleClose();
            }
          }}
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoginModalBody
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {},
            }}
          >
            <div className="icon-container">
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => handleClose()}
                className="x-mark"
              />
            </div>
            <div className="login-wrapper">
              <div className="logo-wrapper">
                <img src={gamemakase_logo} alt="logo" className="logo" />
                <p className="welcome-text">Welcome to GameMakase !</p>
              </div>
              <div className="login-btn" onClick={() => handleLogin()}>
                <p className="login-text">
                  SIGN IN <FontAwesomeIcon icon={faSteam} />
                </p>
              </div>
            </div>
          </LoginModalBody>
        </LoginModalWrapper>
      ) : null}
    </AnimatePresence>
  );
};

export default LoginModal;
