import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Common } from "./Common";

export const ChatModalWrapper = styled.div`
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

export const ChatModalBody = styled(motion.div)`
  display: flex;

  align-items: center;
  height: 80%;
  min-height: 30rem;
  background-color: ${Common.colors.mainColor01};
  border: 2px solid ${Common.colors.white01};
  transition: all 0.5s ease-in-out;
  position: relative;
  overflow: hidden;

  @media (min-width: 1024px) {
    width: 62rem;
    max-height: 52rem;
    border-radius: 2rem;
  }
  @media (max-width: 1024px) {
    width: 47rem;
    max-height: 42rem;
    border-radius: 2rem;
  }
  @media (max-width: 768px) {
    width: 30rem;
    max-height: 42rem;
    border-radius: 1.5rem;
  }
  @media (max-width: 500px) {
    width: 85%;
    height: 90%;
    max-height: 52rem;
    border-radius: 1rem;
  }
`;

export const SmallSidebar = styled.div`
  background-color: ${Common.colors.mainColor01};
  border-right: 2px solid ${Common.colors.white01};

  height: 100%;

  .menubar {
    cursor: pointer;
    padding: 1.5rem;
    font-size: 2rem;
  }
`;

export const SideBarBody = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${Common.colors.mainColor01};
  border-right: 2px solid ${Common.colors.white01};
  width: 20rem;
  height: 100%;

  .channel-title-wrapper {
    width: 100%;
    border-bottom: 1px solid ${Common.colors.lightGray01};
  }

  .menubar-wrapper {
    display: flex;
    justify-content: end;
    padding: 1.5rem;

    font-size: 2rem;
  }

  .menubar {
    cursor: pointer;
  }

  .channel-name-wrapper {
    font-family: "Noto Sans KR", serif;
    padding: 0rem 2rem;
  }

  .channel-name {
    font-weight: 700;
    font-size: 1.5rem;
    margin: 0;
    margin-bottom: 1rem;
  }

  .channel-discription {
    color: ${Common.colors.lightGray01};
  }

  .channels {
    padding: 1.5rem;
  }

  .single-channel {
    margin-bottom: 1.5rem;
    white-space: pre-wrap;
    cursor: pointer;
  }

  .disabled {
    color: ${Common.colors.lightGray01};
    font-weight: 500;
  }

  .selected {
    color: ${Common.colors.white01};
    font-weight: 700;
  }
`;
