import styled from "@emotion/styled";
import { Common } from "./Common";
import { motion } from "framer-motion";
//import { motion } from "framer-motion";

export const SearchWrapper = styled.div`
  .swiper {
    margin-left: 0px;

  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    width: auto;
  }
  .swiper-pagination-bullet-active {
    background-color: ${Common.colors.white01};
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-weight: bold;
    padding: 17px;
    font-size: 18px;
    border-radius: 70px;
    line-height: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    color: ${Common.colors.white01};
  }

  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 40px;
  padding-bottom: 50px;
  @media (min-width: 1560px) {
    margin-left: 60px;
    margin-right: 60px;
  }

  .swiper-wrapper {
    width: auto;
  }

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .game-search-results-header {
    color: ${Common.colors.white01};
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 35px;
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 25px;
  }
  .game-search-results-header-mobile {
    color: ${Common.colors.white01};
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 35px;
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 25px;
    margin-bottom: 25px;
  }
  .no-game-results-msg {
    color: ${Common.colors.white01};
    font-family: "Noto Sans KR";
    font-size: 24px;
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .no-user-results {
    display: flex;
    font-family: "Noto Sans KR";
    font-size: 15px;
    width: 270px;
    height: 100px;
    align-items: center;
    justify-content: center;
  }
`;

// 검색내역
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
  .no-history-msg {
    margin-top: 10px;
  }
`;

export const GameSearchResultsWrapper = styled.div``;
export const MobileGameResult = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const SearchResultsWrapper = styled(motion.div)`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: flex-start;

  .loading {
    position: relative;
    opacity: 0.3;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 245px;
  max-width: 245px;
  margin-right: 4%;
  @media (min-width: 1560px) {
  }
  @media (max-width: 1000px) {
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
  .korean-support-section {
    margin-top: 10px;
    display: flex;
  }
  .korean-support-wrapper {
    margin-left: 35px;
    margin-bottom: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .korean-on {
  }
`;

export const GameSearchResult = styled.div`
  width: 100%;
  @media (max-width: 1160px) {
    width: 70%;
  }
  @media (max-width: 1000px) {
    width: 65%;
  }
  @media (max-width: 870px) {
    min-width: 100%;
    max-width: 100%;
  }
`;

export const UserSearchResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  padding: 20px;
  background: linear-gradient(
    180deg,
    rgba(184, 162, 207, 0.36) 0%,
    rgba(184, 162, 207, 0.17) 0.01%,
    rgba(217, 217, 217, 0.77) 100%
  );
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
  color: ${Common.colors.white01};
  @media (min-width: 1160px) {
    margin-left: 4%;
  }
  @media (max-width: 1160px) {
    width: 100%;
    padding: 0;
    background: transparent;
    .user-results {
      display: flex;
      width: 100%;
      justify-content: flex-start;
    }
    .profile-circle {
      justify-content: center;
      padding: 20px;
      background: rgba(217, 217, 217, 0.08);
    }
  }
  .profile-circle {
    border-radius: 10px;
  }
  .user-search-results-header {
    display: flex;
    justify-content: center;
    font-family: "Noto Sans KR";
    @media (max-width: 1160px) {
      justify-content: flex-start;
      font-size: 22px;
      font-style: normal;
      font-weight: 400;
      text-decoration: none;
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
`;
