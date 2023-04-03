import styled from "@emotion/styled";
import { Common } from "./Common";

export const ProgressBarWrapper = styled.div`
  display: flex;
  width: 90%;
  padding: 0rem 1rem;
  height: 0.4rem;
  justify-content: center;
`;

export const SingleProgressBar = styled.div`
  width: 80%;
  max-width: 4rem;
  margin: 0.2rem;
  height: 0.4rem;

  .active-bar {
    z-index: 3;
    margin-top: -0.4rem;
    background-color: ${Common.colors.white01};
    width: 100%;
    height: 100%;

    display: ${(props) => (props.active ? "block" : "none")};
    /* visibility: ${(props) => (props.active ? "visible" : "hidden")}; */

    transform-origin: left center;
    transform: scaleX(${(props) => (props.active ? 1 : 0)});
  }

  .inactive-bar {
    background-color: ${Common.colors.lightGray01};
    opacity: 0.2;
    width: 100%;
    height: 100%;
  }
`;

export const TestWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background-image: linear-gradient(
    to bottom,
    rgba(50, 50, 50, 1),
    rgba(153, 136, 189, 1)
  );

  @media (min-width: 768px) {
    min-height: calc(100vh - 4.4rem);
  }
  @media (max-width: 768px) {
    min-height: calc(100vh - 3.9rem);
  }
  @media (max-width: 500px) {
    min-height: calc(100vh - 3.4rem);
  }

  .test-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0rem;
    max-width: 60rem;

    background-color: rgba(255, 255, 255, 0.2);
    border: 2px solid ${Common.colors.white01};
    border-radius: 1rem;
    color: ${Common.colors.white01};
    font-family: "Noto Sans KR", serif;

    transition: all 0.3s ease-in-out;

    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;

    @media (min-width: 768px) {
      width: 80%;
      margin: 2.5rem 0rem;
    }
    @media (max-width: 768px) {
      width: 80%;
      margin: 2rem 0rem;
    }
    @media (max-width: 500px) {
      width: 95%;
      margin: 1rem 0rem;
    }
  }

  .testresult-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 3rem 0rem;
    max-width: 60rem;

    background-color: rgba(255, 255, 255, 0.2);
    border: 2px solid ${Common.colors.white01};
    border-radius: 1rem;
    color: ${Common.colors.white01};
    font-family: "Noto Sans KR", serif;

    transition: all 0.3s ease-in-out;

    @media (min-width: 768px) {
      width: 80%;
    }
    @media (max-width: 768px) {
      width: 80%;
    }
    @media (max-width: 500px) {
      width: 95%;
    }
  }

  .lottie-wrapper {
    margin: 2rem;
    margin-bottom: 0rem;

    @media (min-width: 768px) {
      height: 300px;
    }
    @media (max-width: 768px) {
      height: 250px;
    }
    @media (max-width: 500px) {
      height: 200px;
    }
  }

  .level {
    text-align: center;
    font-weight: 700;
    margin: 1rem 2rem;

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
    @media (max-width: 500px) {
      font-size: 2rem;
    }
  }

  .content {
    margin: 1rem 3rem;
    text-align: center;
  }

  .result-content {
    max-width: 40rem;
    margin: 1rem 3rem;
    text-align: center;
    white-space: pre-wrap;
    word-break: keep-all;
  }

  .type-text {
    font-weight: 700;

    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;

    @media (min-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
    @media (max-width: 500px) {
      font-size: 1.5rem;
    }
  }

  .result-lottie-wrapper {
    margin: 2rem;
    margin-bottom: 0rem;

    @media (min-width: 768px) {
      height: 200px;
    }
    @media (max-width: 768px) {
      height: 180px;
    }
    @media (max-width: 500px) {
      height: 150px;
    }
  }

  .rcm-wrapper {
    width: 90%;
    margin: 1rem 0rem;
  }

  .rcm-text {
    font-weight: 700;

    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  }

  .rcm-game-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    .single-game {
      width: 40%;
      min-width: 18rem;
      max-width: 20rem;
    }
    .gameimg-wrapper {
      width: 100%;
      min-height: 8.4rem;
      max-height: 9.3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2rem;
      overflow: hidden;

      -ms-user-select: none;
      -moz-user-select: -moz-none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      user-select: none;
    }

    .game-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
    }

    .game-title {
    }
  }

  .btns-wrapper {
    display: flex;
    margin: 1rem 1rem;
    width: 40%;
    min-width: 20rem;
    justify-content: space-evenly;
    margin-bottom: 50px;

    .single-btn {
      margin: 0rem 1rem;
    }
  }
`;
