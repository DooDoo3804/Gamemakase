import styled from "@emotion/styled";
import { Common } from "./Common";
import { motion } from "framer-motion";
//import { motion } from "framer-motion";

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 40px;
  @media (min-width: 1560px) {
    margin-left: 60px;
    margin-right: 60px;
  }

  .game-search-results-header {
    color: ${Common.colors.white01};
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    @media (max-width: 1160px) {
      font-size: 19px;
    }
    line-height: 35px;
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 25px;
  }
`;

export const SearchHistoryWrapper = styled.div`
  position: relative;
  margin-top: 15px;
  color: ${Common.colors.white01};
  .tag-header {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    margin-bottom: 10px;
  }
  .tags-wrapper {
    display: flex;
  }
  .tags-line {
    margin-top: 15px;
    margin-bottom: 15px;
    width: 50%;
    @media (max-width: 700px) {
      width: 100%;
    }
    height: 2px;
    background-color: ${Common.colors.white01};
  }
`;

export const SearchResultsWrapper = styled(motion.div)`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 1160px) {
    flex-wrap: wrap;
  }

  ////////////////////////////
  // filter
  .filter-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-right: 3%;
    min-width: 20%;
    max-width: 20%;
    @media (min-width: 1560px) {
      min-width: 30%;
      max-width: 30%;
      margin-right: 4%;
    }
    @media (max-width: 870px) {
      display: none;
    }

    background-color: rgba(217, 217, 217, 0.18);
    padding: 20px 18px 20px 18px;
    border-radius: 10px;
    color: ${Common.colors.white01};

    .filter-header {
      font-family: "Noto Sans KR";
      font-style: normal;
      font-size: 18px;
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }

    .filter-line-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      .filter-line {
        width: 80%;
        height: 1px;
        background-color: rgba(217, 217, 217, 0.25);
        margin-top: 15px;
        margin-bottom: 12px;
      }
    }
    .range-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .price-str {
      margin-top: 5px;
      font-size: 15px;
    }

    input[type="range"] {
      position: relative;
      width: 70%;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-color: transparent;
      margin-bottom: 10px;
    }
    input[type="range"]:focus {
      outline: none;
    }
    input[type="range"]::-webkit-slider-runnable-track {
      width: 100%;
      height: 5px;
      cursor: pointer;
      border-radius: 20px;
      background-color: transparent;
      background-color: ${Common.colors.mainColor05};
    }
    input[type="range"]::-webkit-slider-thumb {
      height: 14px;
      width: 14px;
      border-radius: 25px;
      background: ${Common.colors.white01};
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -4.5px;
    }
    input[type="range"]:focus::-webkit-slider-runnable-track {
      background: ${Common.colors.mainColor05};
    }
    input[type="range"]::-moz-range-track {
      width: 100%;
      height: 5px;
      cursor: pointer;
      background: ${Common.colors.mainColor05};
    }
    input[type="range"]::-moz-range-thumb {
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: ${Common.colors.white01};
      cursor: pointer;
    }

    .genre-wrapper {
      display: flex;
      flex-direction: column;
    }

    .multi-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .multi-str {
      cursor: pointer;
      font-family: "Noto Sans KR";
      font-style: normal;
      font-size: 15px;
      margin-left: 15px;
      margin-right: 15px;
    }
    .korean-support-section {
      display: flex;
    }
  }

  ////////////////////////////
  // game

  .results-wrapper {
    width: 100%;
    @media (max-width: 1160px) {
      width: 70%;
    }
    @media (max-width: 870px) {
      min-width: 100%;
      max-width: 100%;
    }
  }
`;

export const UserSearchResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  padding: 20px;
  margin-left: 30px;
  background: linear-gradient(
    180deg,
    rgba(184, 162, 207, 0.36) 0%,
    rgba(184, 162, 207, 0.17) 0.01%,
    rgba(217, 217, 217, 0.77) 100%
  );
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
  color: ${Common.colors.white01};
  @media (min-width: 1560px) {
    margin-left: 60px;
  }
  @media (max-width: 1160px) {
    margin-left: 0px;
    margin-top: 30px;
    width: 100%;
    padding: 0;
    background: transparent;
    .user-results {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .profile-circle {
      width: 100%;
      justify-content: center;
      margin: 0px 0px 20px 0px;
      padding: 20px;
      background: rgba(217, 217, 217, 0.08);
    }
  }
  .profile-circle {
    border-radius: 40px;
  }
  .user-search-results-header {
    display: flex;
    justify-content: center;
    @media (max-width: 1160px) {
      justify-content: flex-start;
      font-size: 22px;
      font-family: "Noto Sans KR";
      font-style: normal;
      font-weight: 400;
      text-decoration: none;
      margin-bottom: 35px;
    }
    font-size: 18px;
    font-style: normal;
    text-decoration: underline;
    line-height: 26px;
    font-weight: 200;
    margin-top: 15px;
    margin-bottom: 15px;
    color: ${Common.colors.white01};
  }

  .no-user-results {
    display: flex;
    font-size: 16px;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 400;
  }
`;
