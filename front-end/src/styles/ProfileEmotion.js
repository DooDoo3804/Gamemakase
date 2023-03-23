import styled from "@emotion/styled";
import { Common } from "../styles/Common";
import { motion } from "framer-motion";

export const ProfileBackgroundWrapper = styled.div`
  background: ${Common.colors.mainColor01};

  position: relative;
  width: 100%;
  height: 100%;

  .profile-box {
    position: relative;
    margin-top: 110px;
    width: 100%;
    min-height: 85vh;
    height: 100%;

    background: linear-gradient(
      180deg,
      ${Common.colors.mainColor02} 30%,
      ${Common.colors.mainColor05} 100%
    );
    border-radius: 50px 50px 0px 0px;
    @media (max-width: 450px) {
      margin-top: 70px;
      border-radius: 30px 30px 0px 0px;
    }
  }
`;

export const ProfileImgWrapper = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  
  display: flex;
  height: 10px;
  margin-left: 10%;
  
  position: relative;
  top: -60px;

  @media (max-width: 450px) {
    top: -40px;
  }
  
  img {
    border-radius: 70%;
    width: 120px;
    height: 120px;
      @media (max-width: 450px) {
      width: 90px;
      height: 90px;
    }
  }

  .profile-name {
    position: relative;
    width: 180x;
    height: 50px;

    margin-top: 70px;
    padding-left: 2rem;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    @media (max-width: 450px) {
      margin-top: 50px;
      font-size: 24px;
      padding-left: 30px;
    }
    line-height: 52px;
    text-align: center;

    color: ${Common.colors.white01};
  }
`;

export const ProfileNavWrapper = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  display: flex;
  flex-direction: column;

  //width: 300px; 친구탭 포함
  width: 250px;
  height: 45px;
  margin-left: 10%;
  padding-top: 6rem;

  @media (max-width: 450px) {
    width: 80%;
    padding-top: 80px;
  }

  .flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .nav-tap-clicked {
    cursor: pointer;
    //width: 32%; 친구탭 포함
    width: 48%;
    height: 40px;

    background: rgba(255, 255, 255, 0.6);
    border-radius: 8px 8px 0px 0px;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    text-align: center;
    line-height: 45px;

    color: ${Common.colors.white01};
  }

  .nav-tap {
    cursor: pointer;
    //width: 32%; 친구탭 포함
    width: 48%;
    height: 40px;

    background: rgba(255, 255, 255, 0.25);
    border-radius: 8px 8px 0px 0px;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    text-align: center;
    line-height: 45px;

    color: ${Common.colors.white01};
  }

  .nav-line {
    position: relative;
    width: 100%;
    height: 8px;
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

/////////////////////////////////
// 메인탭

export const ProfileMainStatistics = styled(motion.div)`
  transition: all 0.3s ease-in-out;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  position: relative;
  margin-left: 10%;
  width: 80%;
  height: 33rem;

  @media (max-width: 450px) {
    height: 25rem;
  }
  margin-top: 2.5rem;

  background: rgba(255, 255, 255, 0.4);
  border: 3px solid ${Common.colors.white01};
  box-shadow: 0px 1.27673px 3.83019px rgba(13, 10, 44, 0.08);
  border-radius: 12.7673px;

  .statistics {
    width: 100%;
    height: 100%;
    display: flex;
    @media (max-width: 900px) {
      flex-direction: column;
    }
    flex-direction: row;
    overflow: wrap;
    justify-content: space-evenly;
    align-items: center;

    .pie-chart {
      position: relative;
      @media (max-width: 900px) {
        width: 100%;
        height: 70%;
      }
      width: 60%;
      height: 100%;
    }
  }

  .statistics-line {
    position: relative;
    @media (max-width: 900px) {
      width: 80%;
      height: 4px;
    }
    width: 4px;
    height: 80%;
    background-color: rgba(255, 255, 255, 0.6);
  }

  .mention {
    position: relative;
    color: white;
    font-weight: bold;
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    @media (max-width: 1160px) {
      font-size: 12px;
    }
  }

  .no-data-msg {
    color: ${Common.colors.white01};
    font-size: 24px;
    font-family: "Noto Sans KR";
  }
`;

export const ProfileScrapBook = styled(motion.div)`
  transition: all 0.3s ease-in-out;

  position: relative;
  margin-left: 10%;
  margin-right: 10%;
  padding-bottom: 40px;

  .scrap-header {
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
    margin-top: 30px;
    margin-bottom: 40px;
    margin-right: 0;
    max-width: 200px;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    @media (max-width: 450px) {
      font-size: 26px;
    }
    line-height: 52px;
    color: ${Common.colors.white01};
  }

  .box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 30px;
  }

  .no-data-msg {
    color: ${Common.colors.white01};
    font-size: 24px;
    font-family: "Noto Sans KR";
  }
`;

///////////////////////////
// 리뷰 탭

export const ProfileReviewsWrapper = styled.div`
  color: ${Common.colors.white01};

  margin-left: 10%;
  margin-right: 10%;
  padding-bottom: 40px;

  .review-header {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-top: 30px;
    color: ${Common.colors.white01};
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 52px;
  }

  .title-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;

    @media (min-width: 800px) {
      font-size: 3vw;
    }
    @media (max-width: 800px) {
      font-size: 3vw;
    }
    @media (max-width: 500px) {
      font-size: 14px;
    }
  }

  .title-text {
    margin: 0;
    font-family: "Noto Sans KR", serif;
    font-weight: 700;
  }

  .review-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 5px;

    @media (min-width: 1000px) {
      margin-top: 2rem;
      justify-content: space-between;
    }
    @media (max-width: 1000px) {
      margin-top: 1.5rem;
      justify-content: space-between;
    }
    @media (max-width: 800px) {
      justify-content: center;
      margin-top: 1rem;
    }
  }
`;

export const SingleReview = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease-in-out;
  height: auto;
  overflow: hidden;
  border: 1.5px solid ${Common.colors.white01};
  font-family: "Noto Sans KR", serif;

  margin-bottom: 30px;

  @media (min-width: 1500px) {
    width: 42%;
    border-radius: 2.5rem;
    padding: 3%;
  }
  @media (max-width: 1500px) {
    width: 41%;
    border-radius: 2rem;
    padding: 3%;
  }
  @media (max-width: 900px) {
    width: 95%;
    border-radius: 2rem;
    padding: 6%;
  }

  .game-wrapper {
    display: flex;
    @media (max-width: 900px) {
      flex-direction: column;
    }
  }

  .game-img-wrapper {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow: hidden;
    cursor: pointer;
    width: 40%;
  }

  .game-img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    border-radius: 10px;
  }

  .star-wrapper {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: flex;
    @media (min-width: 620px) {
      width: 0.8rem;
      height: 0.8rem;
    }
    @media (max-width: 620px) {
      width: 0.6rem;
      height: 0.6rem;
    }
  }

  .game-content-wrapper {
    @media (min-width: 900px) {
      margin-left: 1rem;
    }
    @media (max-width: 900px) {
      margin-left: 0;
    }

    display: flex;
    width: 40%;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .game-title {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    margin: 0;
  }

  .create-date {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-size: 13px;
    color: ${Common.colors.lightGray01};
  }

  .review-title {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    font-size: 15px;

    @media (min-width: 800px) {
      margin: 0.7rem 0rem;
    }
    @media (max-width: 800px) {
      margin: 0.5rem 0rem;
    }
  }

  .review-content {
    font-size: 14px;
  }

  .ellipsis-button {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-left: auto;
  }

  .xmark-svg {
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
  }
`;

export const NoReivew = styled(motion.div)`
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: all 0.3s ease-in-out;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  position: relative;
  height: 33rem;

  background: rgba(255, 255, 255, 0.4);
  border: 3px solid ${Common.colors.white01};
  box-shadow: 0px 1.27673px 3.83019px rgba(13, 10, 44, 0.08);
  border-radius: 12.7673px;

  @media (max-width: 450px) {
    height: 25rem;
  }

  .no-review-wrapper {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 24px;
    font-family: "Noto Sans KR";
    color: ${Common.colors.white01};
  }
`;
