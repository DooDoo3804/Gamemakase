import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "@emotion/styled";
import { Common } from "../styles/Common";
import caret from "../assets/fontAwesomeSvg/caret-down-solid.svg";
import qna_img from "../assets/qna_img.png";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/user";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const QnAWrapper = styled.div`
  color: ${Common.colors.white01};
  font-family: "Noto Sans KR", serif;
  padding: 0rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .qna-title {
    font-size: 1.5rem;
    font-weight: 600;
    padding: 0.5rem 0rem;
    margin: 1rem 0rem;

    display: flex;
    align-items: center;
  }

  .single-board {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    border: 2px solid ${Common.colors.white01};
    background: rgba(255, 255, 255, 0.2);
    margin-bottom: 2rem;

    transition: all 0.5s ease-in-out;
    overflow: hidden;

    @media (min-width: 768px) {
      width: 40rem;
    }
    @media (max-width: 768px) {
      width: 25rem;
    }
    @media (max-width: 500px) {
      width: 20rem;
    }

    .board-title-wrapper {
      display: flex;
      justify-content: space-between;
    }

    .num-title {
      display: flex;
    }

    .board-num {
      font-weight: 700;

      @media (min-width: 768px) {
        width: 8rem;
      }
      @media (max-width: 768px) {
        width: 5rem;
      }
      @media (max-width: 500px) {
        width: 4rem;
      }
    }
  }

  .icon-wrapper {
    display: flex;
    align-items: center;

    .caret-icon {
      height: 2rem;
      object-fit: cover;
      cursor: pointer;
    }
  }

  .board-wrapper {
    padding: 2rem 1rem;
  }

  .board-content-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .board-content {
    white-space: pre-wrap;
    display: inline-block;
    margin: 0.2rem 0rem;
    line-height: 1.8rem;
  }
  .content-link {
    border-bottom: 2px solid ${Common.colors.white01};
    cursor: pointer;
    display: inline-block;
    margin: 0rem;
  }

  .content-img {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 1rem 0rem;

    img {
      object-fit: contain;

      @media (min-width: 768px) {
        width: 30rem;
      }
      @media (max-width: 768px) {
        width: 20rem;
      }
      @media (max-width: 500px) {
        width: 15rem;
      }
    }
  }
`;

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const QnA = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [cookies, , removeCookie] = useCookies(["accessToken"]);
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();

  useEffect(() => {
    if (cookies["accessToken"]) {
      handleLogin();
    } else {
      alert("로그인 후 접근할 수 있는 페이지입니다.");
      navigate(-1);
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

  const handleLogout = () => {
    setUser(null);
    removeCookie("accessToken", { path: "/" });
    removeCookie("redirect-url", { path: "/" });
    window.location.assign("/");
  };

  return (
    <QnAWrapper>
      <div className="qna-title">자주 묻는 질문</div>
      <motion.div
        className="single-board"
        animate={{
          height: isOpen ? "100%" : 55,
        }}
      >
        <div className="board-title-wrapper">
          <div className="num-title">
            <p className="board-num">01</p>
            <p className="board-title">추천 게임을 불러올 수 없어요.</p>
          </div>
          <motion.div
            className="icon-wrapper"
            initial={isOpen ? "open" : "closed"}
            animate={isOpen ? "open" : "closed"}
            variants={iconVariants}
          >
            <img
              src={caret}
              alt="caret"
              className="caret-icon"
              onClick={() => setIsOpen((isOpen) => !isOpen)}
            />
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              className="board-wrapper"
              initial={{ height: 0 }}
              animate={{ height: "100%", delay: 0.5 }}
            >
              <p className="board-content">
                {
                  "추천 게임이 표시되지 않는 데는 여러 문제가 있을 수 있습니다.\n\n1. 사용자의 스팀 프로필이 비공개일 수 있습니다.\n"
                }
              </p>
              <div className="content-img">
                <img src={qna_img} alt="qna_img" />
              </div>
              <div className="board-content-wrapper">
                <p className="board-content">
                  <p
                    className="content-link"
                    onClick={() =>
                      window.open(
                        `https://steamcommunity.com/profiles/${user.userSteamId}/edit/settings`
                      )
                    }
                  >
                    이 링크를 클릭
                  </p>
                  {"하여 스팀에서 프로필 공개 여부를 위와 같이 설정해주세요."}
                </p>
              </div>
              <p className="board-content">
                {
                  "설정한 후에는 겜마카세에 다시 로그인해야 추천 기능이 작동합니다."
                }
              </p>

              <p className="board-content">
                {"\n2. 사용자의 게임 기록이 없을 수 있습니다."}
              </p>
              <p className="board-content">
                {
                  "\n스팀에서 게임을 구매하지 않았거나, 플레이 기록이 없어 추천 게임을 불러올 수 없는 경우입니다.\n게임을 1개 이상 플레이하고 재로그인하면 맞춤 추천을 받아볼 수 있습니다."
                }
              </p>
              <p className="board-content">
                {
                  "\n기타 사항은 gamemakase@gmail.com 으로 문의하시면 답변을 받아보실 수 있습니다.\n"
                }
              </p>
              <p className="board-content">{"감사합니다."}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </QnAWrapper>
  );
};

export default QnA;
