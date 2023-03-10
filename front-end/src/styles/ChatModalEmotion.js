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
  flex-direction: column;
  align-items: center;
  height: 80%;
  min-height: 30rem;
  background-color: ${Common.colors.mainColor01};
  border: 2px solid ${Common.colors.white01};
  transition: all 0.5s ease-in-out;

  @media (min-width: 1024px) {
    width: 60rem;
    max-height: 50rem;
    border-radius: 2rem;
    padding: 2rem;
  }
  @media (max-width: 1024px) {
    width: 45rem;
    max-height: 40rem;
    border-radius: 2rem;
    padding: 1.8rem;
  }
  @media (max-width: 768px) {
    width: 28rem;
    max-height: 40rem;
    border-radius: 1.5rem;
    padding: 1.5rem;
  }
  @media (max-width: 500px) {
    width: 85%;
    height: 90%;
    max-height: 50rem;
    border-radius: 1rem;
    padding: 1rem;
  }
`;
