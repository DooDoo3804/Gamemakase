import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Common } from "./Common";

export const ChatModalWrapper = styled(motion.div)`
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
    width: 95%;
    height: 90%;
    max-height: 52rem;
    border-radius: 1rem;
  }
`;

export const SmallSidebar = styled.div`
  width: 100%;
  background-color: ${Common.colors.mainColor01};
  border-bottom: 2px solid ${Common.colors.white01};
  display: flex;
  justify-content: space-between;
  z-index: 98;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  .menubar {
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    @media (min-width: 768px) {
      padding: 1.5rem;
    }
    @media (max-width: 768px) {
      padding: 1rem;
    }
    @media (max-width: 500px) {
      padding: 1rem;
    }
  }

  .x-mark {
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    @media (min-width: 768px) {
      padding: 1.5rem;
    }
    @media (max-width: 768px) {
      padding: 1rem;
    }
    @media (max-width: 500px) {
      padding: 1rem;
    }
  }

  @media (min-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

export const SideBarBody = styled(motion.div)`
  position: absolute;
  z-index: 99;
  display: flex;
  flex-direction: column;
  background-color: ${Common.colors.mainColor01};
  border-right: 2px solid ${Common.colors.white01};
  width: 18rem;
  height: 100%;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  .channel-title-wrapper {
    width: 100%;
    border-bottom: 1px solid ${Common.colors.lightGray01};
  }

  .menubar-wrapper {
    display: flex;
    justify-content: end;
  }

  .menubar {
    cursor: pointer;

    @media (min-width: 768px) {
      font-size: 2rem;
      padding: 1.5rem;
    }
    @media (max-width: 768px) {
      font-size: 1.5rem;
      padding: 1rem;
    }
    @media (max-width: 500px) {
      font-size: 1.2rem;
      padding: 1rem;
    }
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

export const ChatRoomBody = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to bottom,
    rgba(50, 50, 50, 1),
    rgba(55, 51, 77, 1)
  );

  .chat-logs {
    height: 100%;
  }

  .messagebar-wrapper {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    transition: all 0.3s ease-in-out;

    @media (min-width: 768px) {
      bottom: 2rem;
    }
    @media (max-width: 768px) {
      bottom: 2rem;
    }
    @media (max-width: 500px) {
      bottom: 1rem;
    }

    input {
      background: rgba(255, 255, 255, 0.2);
      border: 1.5px solid ${Common.colors.white01};
      border-radius: 2rem;
      color: ${Common.colors.white01};
      font-family: "Noto Sans KR", serif;
      transition: all 0.3s ease-in-out;

      @media (min-width: 768px) {
        width: 30rem;
        height: 1.5rem;
        margin: 0rem 0.5rem;
        margin-left: 0.5rem;
        padding: 0.7rem 1rem;
      }
      @media (max-width: 768px) {
        width: 25rem;
        height: 1.5rem;
        margin: 0rem 0.5rem;
        margin-left: 1rem;
        padding: 0.7rem 1rem;
      }
      @media (max-width: 500px) {
        width: 30rem;
        height: 1.5rem;
        margin: 0rem;
        margin-left: 0.5rem;
        padding: 0.7rem 1rem;
      }
    }

    input:focus {
      outline: none;
      border: 2px solid ${Common.colors.white01};
    }

    input::placeholder {
      color: ${Common.colors.white01};
    }
    input::-webkit-input-placeholder {
      color: ${Common.colors.white01};
    }
    input:-ms-input-placeholder {
      color: ${Common.colors.white01};
    }
  }

  .send-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Common.colors.white01};
    border: 1.5px solid ${Common.colors.white01};
    border-radius: 2rem;
    color: ${Common.colors.mainColor02};
    font-size: 1.3rem;
    cursor: pointer;

    transition: all 0.3s ease-in-out;

    @media (min-width: 768px) {
      font-size: 1.2rem;
      margin: 0rem 0.5rem;
      padding: 0.7rem 1.7rem;
    }
    @media (max-width: 768px) {
      font-size: 1.2rem;
      margin: 0rem 1rem;
      padding: 0.7rem 1.7rem;
    }
    @media (max-width: 500px) {
      font-size: 1rem;
      margin: 0rem 0.5rem;
      padding: 0.5rem 1rem;
    }
  }
`;
