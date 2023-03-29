import { useRef, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/user";
import { useCookies } from "react-cookie";
import { AnimatePresence } from "framer-motion";

import TranslucentBtn from "./TranslucentBtn";
import StarRating from "./StarRating";
import useBodyScrollLock from "./ScrollLock";
import {
  ReviewModalBody,
  ReviewModalWrapper,
} from "../styles/ReviewModalEmotion";
import { BACKEND_URL } from "../config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ReviewModal = ({ gameData, modalView, setModalView, scrollPosition }) => {
  const [contentLength, setContentLength] = useState(0);
  const [rating, setRating] = useState(1);
  const outSection = useRef();
  const reviewTitle = useRef(null);
  const reviewContent = useRef(null);

  const [user, setUser] = useRecoilState(userState);
  const [cookies, setCookie] = useCookies(["accessToken"]);

  const { openScroll } = useBodyScrollLock();

  const handleClose = () => {
    reviewContent.current = null;
    setContentLength(0);
    openScroll(scrollPosition);
    setModalView(false);
  };

  const handleRating = (newValue) => {
    setRating(newValue);
  };

  const handleContent = (e) => {
    reviewContent.current = e.target.value;
    setContentLength(e.target.value.length);
  };

  const handleTitle = (e) => {
    reviewTitle.current = e.target.value;
  };

  const handleWriting = () => {
    if (!reviewTitle.current) {
      alert("리뷰 제목을 작성해주세요.");
    } else if (!reviewContent.current) {
      alert("내용을 입력해주세요.");
    } else {
      axios
        .post(
          `${BACKEND_URL}auth/reviews`,
          {
            gameId: gameData.gameId,
            userId: user.userId,
            reviewTitle: reviewTitle.current,
            reviewContent: reviewContent.current,
            reviewGrade: rating,
          },
          {
            headers: {
              "Content-Type": "application/json",
              accessToken: cookies["accessToken"],
            },
          }
        )
        .then((response) => {
          console.log(response);
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <AnimatePresence>
        {modalView ? (
          <ReviewModalWrapper
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
            <ReviewModalBody
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
              <p className="game-title">{gameData.gameName}에 관한 리뷰 쓰기</p>

              <div className="game-title rating-container">
                <StarRating handleRating={handleRating} />
              </div>
              <div className="review-content-box">
                <textarea
                  className="review-title"
                  onChange={handleTitle}
                  maxLength={20}
                  placeholder="제목을 입력하세요."
                />
                <textarea
                  className="review-content"
                  onChange={handleContent}
                  maxLength={2000}
                  placeholder="내용을 입력하세요."
                />
                <div className="count-wrapper">
                  <div className="character-counter">
                    {contentLength}
                    /2000
                  </div>
                </div>
              </div>
              <TranslucentBtn
                text={"작성하기"}
                onClick={() => handleWriting()}
              ></TranslucentBtn>
            </ReviewModalBody>
          </ReviewModalWrapper>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default ReviewModal;
