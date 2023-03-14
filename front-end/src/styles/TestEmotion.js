import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Common } from "./Common";
import Lottie from "react-lottie";

export const StyledLottie = styled(Lottie)`
  /* width: ${(props) => props.width}px;
  height: ${(props) => props.height}px; */
  transition: all 0.5s ease-in-out;
`;

// export const StyledLottie = motion.custom(Lottie);

export const TestWrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 3.9rem);
  /* min-height: ; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    margin: 1rem 0rem;
    width: 80%;

    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid ${Common.colors.white01};
    border-radius: 1rem;
    color: ${Common.colors.white01};
    font-family: "Noto Sans KR", serif;
  }

  .lottie-wrapper {
    min-width: 350px;
    max-width: 500px;
  }

  .level {
    font-size: 3rem;
    font-weight: 700;
    margin: 1rem;
  }

  .content {
  }
`;
