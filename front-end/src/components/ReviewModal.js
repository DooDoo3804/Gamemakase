import { useRef } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Common } from "../styles/Common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import TranslucentBtn from "./TranslucentBtn";

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
    border-radius: 2rem;
    padding: 2rem;
  }
  @media (max-width: 1024px) {
    width: 38rem;
    border-radius: 2rem;
    padding: 1.8rem;
  }
  @media (max-width: 768px) {
    width: 28rem;
    border-radius: 1.5rem;
    padding: 1.5rem;
  }
  @media (max-width: 500px) {
    width: 85%;
    border-radius: 1rem;
    padding: 1rem;
  }

  .icon-container {
    width: 100%;
    display: flex;
    justify-content: end;
  }
`;

const ReviewModal = ({ gameData, modalView, setModalView }) => {
  const outSection = useRef();

  return (
    <>
      {modalView ? (
        <ReviewModalWrapper
          ref={outSection}
          onClick={(e) => {
            if (outSection.current === e.target) {
              setModalView(false);
            }
          }}
        >
          <ReviewModalBody>
            <div className="icon-container">
              <FontAwesomeIcon icon={faXmark} />
            </div>
            <p className="game-title">{gameData.gameName}에 관한 리뷰 쓰기</p>
            <div>
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div className="review-content"></div>
            <TranslucentBtn
              text={"작성하기"}
              onClick={() => setModalView(false)}
            ></TranslucentBtn>
          </ReviewModalBody>
        </ReviewModalWrapper>
      ) : null}
    </>
  );
};

export default ReviewModal;
