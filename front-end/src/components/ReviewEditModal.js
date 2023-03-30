import { useEffect, useRef, useState } from "react";
import axios from "axios";
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
import AlertModal from "./AlertModal";

const ReviewEditModal = ({
  reviewData,
  modalView,
  setModalView,
  scrollPosition,
}) => {
  const [contentLength, setContentLength] = useState(0);
  const [rating, setRating] = useState(null);
  const outSection = useRef();
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewDeleteAlertView, setReviewDeleteAlertView] = useState(false);

  const [cookies, setCookie] = useCookies(["accessToken"]);

  const { openScroll } = useBodyScrollLock();

  const handleClose = () => {
    openScroll(scrollPosition);
    setModalView(false);
  };

  const handleRating = (newValue) => {
    setRating(newValue);
  };

  const handleContent = (e) => {
    setReviewContent(e.target.value);
    setContentLength(e.target.value.length);
  };

  const handleTitle = (e) => {
    setReviewTitle(e.target.value);
  };

  const handleWriting = () => {
    if (!reviewTitle) {
      alert("리뷰 제목을 작성해주세요.");
    } else if (!reviewContent) {
      alert("내용을 입력해주세요.");
    } else {
      axios
        .put(
          `${BACKEND_URL}auth/reviews`,
          {
            reviewId: reviewData.reviewId,
            reviewTitle: reviewTitle,
            reviewContent: reviewContent,
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
          window.location.replace(window.location.href);
          handleClose();
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            if (cookies["accessToken"]) {
              alert("작성 권한이 없습니다.");
            } else {
              alert("재로그인이 필요합니다.");
            }
          }
        });
    }
  };

  const reviewDelete = () => {
    axios
      .delete(`${BACKEND_URL}auth/reviews/${reviewData.reviewId}`, {
        headers: {
          "Content-Type": "application/json",
          accessToken: cookies["accessToken"],
        },
      })
      .then((response) => {
        console.log(response);
        window.location.replace(window.location.href);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    setReviewDeleteAlertView(true);
  };

  useEffect(() => {
    if (reviewData) {
      setReviewTitle(reviewData.reviewTitle);
      setReviewContent(reviewData.reviewContent);
      setContentLength(reviewData.reviewContent.length);
      setRating(reviewData.reviewGrade);
    }
  }, [modalView]);

  return (
    <>
      <AnimatePresence>
        {modalView && reviewData ? (
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
              <AlertModal
                alertView={reviewDeleteAlertView}
                setAlertView={setReviewDeleteAlertView}
                msg="해당 리뷰를 삭제하시겠습니까?"
                confrimMsg="삭제"
                cancelMsg="취소"
                goFunction={reviewDelete}
              ></AlertModal>
              <div className="icon-container">
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => handleClose()}
                  className="x-mark"
                />
              </div>
              <p className="game-title">리뷰 수정하기</p>

              <div className="game-title rating-container">
                <StarRating
                  handleRating={handleRating}
                  initial={reviewData.reviewGrade}
                />
              </div>
              <div className="review-content-box">
                <textarea
                  className="review-title"
                  onChange={handleTitle}
                  maxLength={20}
                  placeholder="제목을 입력하세요."
                  value={reviewTitle}
                ></textarea>
                <textarea
                  className="review-content"
                  onChange={handleContent}
                  maxLength={2000}
                  placeholder="내용을 입력하세요."
                  value={reviewContent}
                ></textarea>
                <div className="count-wrapper">
                  <div className="character-counter">
                    {contentLength}
                    /2000
                  </div>
                </div>
              </div>
              <div className="btns-wrapper">
                <TranslucentBtn
                  text={"작성하기"}
                  onClick={() => handleWriting()}
                ></TranslucentBtn>
                <TranslucentBtn
                  text={"삭제하기"}
                  onClick={() => handleDelete()}
                ></TranslucentBtn>
              </div>
            </ReviewModalBody>
          </ReviewModalWrapper>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default ReviewEditModal;
