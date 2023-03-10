import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Common } from "../styles/Common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import TranslucentBtn from "./TranslucentBtn";
import useBodyScrollLock from "./ScrollLock";

const ReviewModalWrapper = styled.div`
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

const ReviewModalBody = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70%;
  background-image: linear-gradient(
    to bottom,
    rgba(50, 50, 50, 1),
    rgba(55, 51, 77, 1)
  );
  border: 2px solid ${Common.colors.white01};
  transition: all 0.5s ease-in-out;

  @media (min-width: 1024px) {
    width: 48rem;
    min-height: 35rem;
    max-height: 40rem;
    border-radius: 2rem;
    padding: 2rem;
  }
  @media (max-width: 1024px) {
    width: 38rem;
    min-height: 35rem;
    max-height: 40rem;
    border-radius: 2rem;
    padding: 1.8rem;
  }
  @media (max-width: 768px) {
    width: 28rem;
    min-height: 30rem;
    max-height: 40rem;
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

  .game-title {
    font-family: "Noto Sans KR", serif;
    font-weight: 700;
    margin: 0;

    transition: all 0.3s ease-in-out;

    @media (min-width: 768px) {
      font-size: 1.8rem;
    }
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  }

  .rating-container {
    @media (min-width: 768px) {
      margin: 1rem;
    }
    @media (max-width: 768px) {
      margin: 0.5rem;
    }
    @media (max-width: 500px) {
      margin: 0.5rem;
    }
  }

  .review-content-box {
    background-color: rgba(255, 255, 255, 0.2);
    border: 1.5px solid ${Common.colors.white01};
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    transition: all 0.3s ease-in-out;

    @media (min-width: 1024px) {
      width: 40rem;
      min-height: 15rem;
      max-height: 30rem;
      border-radius: 2rem;
      padding: 2rem;
      margin-top: 1rem;
      margin-bottom: 2.5rem;
    }
    @media (max-width: 1024px) {
      width: 30rem;
      min-height: 15rem;
      max-height: 30rem;
      border-radius: 2rem;
      padding: 1.8rem;
      margin-top: 1rem;
      margin-bottom: 2.5rem;
    }
    @media (max-width: 768px) {
      width: 22rem;
      min-height: 13rem;
      max-height: 30rem;
      border-radius: 1.5rem;
      padding: 1.5rem;
      margin-top: 1rem;
      margin-bottom: 2.5rem;
    }
    @media (max-width: 500px) {
      width: 90%;
      height: 25rem;
      border-radius: 1rem;
      padding: 1rem;
      margin-top: 1rem;
      margin-bottom: 1.5rem;
    }

    .review-content {
      width: 100%;
      height: calc(100% - 2rem);
      background-color: rgba(255, 255, 255, 0);
      border: none;
      color: ${Common.colors.white01};
      text-align: left;
      font-family: "Noto Sans KR", serif;
      resize: none;
    }

    .review-content:focus {
      outline: none;
    }

    .count-wrapper {
      display: flex;
      justify-content: end;

      .character-counter {
        font-family: "Sarpanch", serif;
        display: flex;
        margin: 0;
      }
    }
  }
`;

const ReviewModal = ({ gameData, modalView, setModalView, scrollPosition }) => {
  const [contentLength, setContentLength] = useState(0);
  const outSection = useRef();
  const reviewContent = useRef(null);

  const { openScroll } = useBodyScrollLock();

  const handleClose = () => {
    reviewContent.current = null;
    setContentLength(0);
    openScroll(scrollPosition);
    setModalView(false);
  };

  const onChange = (e) => {
    reviewContent.current = e.target.value;
    setContentLength(e.target.value.length);
    // console.log(reviewContent.current);
  };

  return (
    <>
      {modalView ? (
        <ReviewModalWrapper
          ref={outSection}
          onClick={(e) => {
            if (outSection.current === e.target) {
              handleClose();
            }
          }}
        >
          <ReviewModalBody>
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
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
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
    </>
  );
};

export default ReviewModal;
