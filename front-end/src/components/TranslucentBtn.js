import styled from "@emotion/styled";
import { Common } from "../styles/Common";

const TranslucentBtnEmotion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Common.colors.white01};
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid ${Common.colors.white01};
  border-radius: 2rem;

  font-family: "Noto Sans KR", serif;
  cursor: pointer;

  transition: all 0.3s ease-in-out;

  @media (min-width: 768px) {
    width: 8rem;
    height: 2.5rem;
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    width: 6rem;
    height: 1.8rem;
    font-size: 0.8rem;
  }
  @media (max-width: 500px) {
    width: 4rem;
    height: 1.2rem;
    font-size: 0.6rem;
  }

  :hover {
    background-color: rgba(255, 255, 255, 0.5);
    transition: background-color 0.3s ease-in-out;
    font-weight: 600;

    transition: font-size 0.3s ease-in-out;

    @media (min-width: 500px) {
      font-size: 0.85rem;
    }
    @media (max-width: 500px) {
      font-size: 0.65rem;
    }
  }
`;

const TranslucentBtn = ({ text }) => {
  return <TranslucentBtnEmotion>{text}</TranslucentBtnEmotion>;
};

export default TranslucentBtn;
