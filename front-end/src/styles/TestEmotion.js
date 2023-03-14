import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Common } from "./Common";
import Lottie from "react-lottie";

export const StyledLottie = styled(Lottie)`
  /* width: ${(props) => props.width}px;
  height: ${(props) => props.height}px; */
  transition: all 0.5s ease-in-out;
`;

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
  height: calc(100vh - 3.9rem);
  /* min-height: ; */
  justify-content: center;
  background-image: linear-gradient(
    to bottom,
    rgba(50, 50, 50, 1),
    rgba(153, 136, 189, 1)
  );

  .test-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5rem 0rem;
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
    min-width: 330px;
    max-width: 500px;
    margin: 2rem;
  }

  .level {
    font-size: 3rem;
    font-weight: 700;
    margin: 1rem;
  }

  .content {
    margin: 1rem;
    text-align: center;
  }
`;
