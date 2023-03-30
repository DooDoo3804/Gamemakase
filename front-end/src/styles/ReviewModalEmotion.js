import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Common } from "./Common";

export const ReviewModalWrapper = styled(motion.div)`
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

export const ReviewModalBody = styled(motion.div)`
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

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

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
    transition: all 0.3s ease-in-out;
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

    .review-title {
      width: 100%;
      background-color: rgba(255, 255, 255, 0);
      border: none;
      color: ${Common.colors.white01};
      text-align: left;
      font-family: "Noto Sans KR", serif;
      font-weight: 700;

      resize: none;

      @media (min-width: 768px) {
        font-size: 1.4rem;
      }
      @media (max-width: 768px) {
        font-size: 1.2rem;
      }
      @media (max-width: 500px) {
        font-size: 1rem;
      }
    }

    textarea::placeholder {
      color: ${Common.colors.white01};
    }

    .review-content {
      width: 100%;
      height: calc(100% - 1rem);
      background-color: rgba(255, 255, 255, 0);
      border: none;
      color: ${Common.colors.white01};
      text-align: left;
      font-family: "Noto Sans KR", serif;
      resize: none;
    }

    .review-title:focus,
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

  .star-rating {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center center;
    padding: 0.3rem 0rem;

    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;

    .stars-container {
      display: flex;
      color: ${Common.colors.starColor01};
      transition: all 0.3s ease-in-out;

      @media (min-width: 768px) {
        font-size: 3rem;
      }
      @media (max-width: 768px) {
        font-size: 2rem;
      }
      @media (max-width: 500px) {
        font-size: 1.8rem;
      }

      .star-wrapper {
        position: relative;

        margin: 0rem 1rem;
        display: grid;
        place-items: center center;
        transition: all 0.3s ease-in-out;
        @media (min-width: 768px) {
          width: 3.4rem;
        }
        @media (max-width: 768px) {
          width: 2rem;
        }
        @media (max-width: 500px) {
          width: 1.5rem;
        }

        .star-background {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease-in-out;
          border-radius: 50%;
          background: #aaa;
          cursor: pointer;

          @media (min-width: 768px) {
            height: 1.5rem;
            width: 1.5rem;
          }
          @media (max-width: 768px) {
            height: 1rem;
            width: 1rem;
          }
          @media (max-width: 500px) {
            height: 0.8rem;
            width: 0.8rem;
          }
        }

        .star-icon {
          position: relative;
          z-index: 10;
          cursor: pointer;
        }
      }
    }
  }

  .btns-wrapper {
    display: flex;
    width: 70%;
    justify-content: space-evenly;
  }
`;
