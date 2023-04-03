import styled from "@emotion/styled";
import { Common } from "../styles/Common";

const TranslucentLongBtnEmotion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Common.colors.white01};
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid ${Common.colors.white01};
  border-radius: 1rem;
  margin: 0.5rem 1rem;

  font-family: "Noto Sans KR", serif;
  text-align: center;
  cursor: pointer;

  transition: all 0.3s ease-in-out;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  word-break: keep-all;

  @media (min-width: 768px) {
    width: 20rem;
    min-height: 2.5rem;
    font-size: 1rem;
    padding: 1rem;
  }
  @media (max-width: 768px) {
    width: 17rem;
    min-height: 2.2rem;
    font-size: 0.8rem;
    padding: 1rem;
  }
  @media (max-width: 500px) {
    width: 15rem;
    min-height: 2rem;
    font-size: 0.8rem;
    padding: 0.8rem;
  }

  :hover {
    background-color: rgba(255, 255, 255, 0.5);
    transition: background-color 0.3s ease-in-out;
    font-weight: 600;

    transition: font-size 0.3s ease-in-out;

    /* @media (min-width: 768px) {
      font-size: 1.05rem;
    }
    @media (max-width: 768px) {
      font-size: 0.85rem;
    }
    @media (max-width: 500px) {
      font-size: 0.85rem;
    } */
  }
`;

const TranslucentLongBtn = ({ text, onClick }) => {
  return (
    <TranslucentLongBtnEmotion onClick={() => onClick()}>
      {text}
    </TranslucentLongBtnEmotion>
  );
};

export default TranslucentLongBtn;
