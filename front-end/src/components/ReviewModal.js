import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import TranslucentBtn from "./TranslucentBtn";
import StarRating from "./StarRating";
import useBodyScrollLock from "./ScrollLock";

import {
  ReviewModalBody,
  ReviewModalWrapper,
} from "../styles/ReviewModalEmotion";
import { AnimatePresence } from "framer-motion";

const ReviewModal = ({ gameData, modalView, setModalView, scrollPosition }) => {
  const [contentLength, setContentLength] = useState(0);
  const [rating, setRating] = useState(1);
  const outSection = useRef();
  const reviewContent = useRef(null);

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

  const onChange = (e) => {
    reviewContent.current = e.target.value;
    setContentLength(e.target.value.length);
    // console.log(reviewContent.current);
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
                {/* todo : 별점 기능 구현 */}
                <StarRating handleRating={handleRating} />
                {/* {StarRating()} */}
              </div>
              <div className="review-content-box">
                <textarea
                  className="review-content"
                  onChange={onChange}
                  maxLength={2000}
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
                onClick={() => handleClose()}
              ></TranslucentBtn>
            </ReviewModalBody>
          </ReviewModalWrapper>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default ReviewModal;
