import styled from "@emotion/styled";
import { Common } from "../styles/Common";
import { motion } from "framer-motion";

export const ProfileBackgroundWrapper = styled.div`
  position: absolute;
  background: ${Common.colors.mainColor01};

  width: 100%;
  height: auto;

  .profile-box {
    position: relative;
    margin-top: 110px;

    width: 100%;
    height: auto;

    background: linear-gradient(
      180deg,
      ${Common.colors.mainColor02} 0%,
      ${Common.colors.mainColor05} 100%
    );
    border-radius: 50px 50px 0px 0px;
    @media (max-width: 450px) {
      margin-top: 70px;
      border-radius: 30px 30px 0px 0px;
    }
  }

  .scrap-header {
    position: relative;
    margin-left: 10%;
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
`;

export const ProfileImgWrapper = styled.div`
  position: absolute;
  margin-left: 10%;
  margin-top: -3rem;
  display: flex;

  width: 120px;
  height: 120px;

  @media (max-width: 450px) {
    margin-top: -3rem;
    width: 90px;
    height: 90px;
  }

  .profile-name {
    position: relative;
    width: 180x;
    height: 50px;

    margin-top: 60px;
    padding-left: 2rem;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    @media (max-width: 450px) {
      margin-top: 50px;
      font-size: 24px;
      padding-left: 2.5rem;
    }
    line-height: 52px;
    text-align: center;

    color: ${Common.colors.white01};
  }
`;

export const ProfileNavWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  //width: 300px; 친구탭 포함
  width: 250px;
  height: 45px;
  margin-left: 10%;
  padding-top: 6rem;

  @media (max-width: 450px) {
    padding-top: 5rem;
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

export const ProfileMainStatistics = styled.div`
  box-sizing: border-box;

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

export const ProfileScrapBook = styled.div`
  position: relative;
  margin-left: 10%;
  width: 80%;

  .box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 30px;
  }
  padding-bottom: 50px;

  .no-data-msg {
    color: ${Common.colors.white01};
    font-size: 24px;
    font-family: "Noto Sans KR";
  }
`;

export const ProfileReviewsWrapper = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  .review-header {
    color: ${Common.colors.white01};
  }

  .title-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;

    @media (min-width: 768px) {
      font-size: 3vw;
    }
    @media (max-width: 768px) {
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
    padding-bottom: 10rem;

    @media (min-width: 1000px) {
      margin-top: 2rem;
      justify-content: space-between;
    }
    @media (max-width: 1000px) {
      margin-top: 1.5rem;
      justify-content: space-between;
    }
    @media (max-width: 620px) {
      justify-content: center;
      margin-top: 1rem;
    }
  }

  .no-review {
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
      height: 25rem;
      font-size: 1rem;
    }
    @media (max-width: 768px) {
      height: 20rem;
      font-size: 0.8rem;
    }
    @media (max-width: 500px) {
      height: 15rem;
      font-size: 0.6rem;
    }
  }
`;


export const SingleReview = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease-in-out;
  height: 14rem;
  overflow: hidden;
  border: 1.5px solid ${Common.colors.white01};
  font-family: "Noto Sans KR", serif;

  @media (min-width: 1000px) {
    width: 22rem;
    margin: 1rem 0.5rem;
    border-radius: 2.5rem;
    padding: 1.8rem;
  }
  @media (max-width: 1000px) {
    width: 40%;
    margin: 1rem 0rem;
    border-radius: 2rem;
    padding: 1.5rem;
  }
  @media (max-width: 620px) {
    width: 95%;
    border-radius: 2rem;
    margin: 0.5rem 0rem;
    padding: 1.5rem;
  }

  .game-wrapper {
    display: flex;
  }

  .game-img-wrapper {
    overflow: hidden;
    cursor: pointer;

    @media (min-width: 1000px) {
      width: auto;
      height: 4rem;
    }
    @media (max-width: 1000px) {
      width: auto;
      height: 3.5rem;
    }
    @media (max-width: 620px) {
      width: auto;
      height: 3rem;
    }
  }

  .game-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .star-wrapper {
    display: flex;
  }

  .game-content-wrapper {
    margin: 0rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .game-title {
    margin: 0;
    font-weight: 700;

    @media (min-width: 620px) {
      font-size: 1rem;
    }
    @media (max-width: 620px) {
      font-size: 0.8rem;
    }
  }

  .review-title {
    font-weight: 700;

    @media (min-width: 620px) {
      font-size: 1rem;
      margin: 0.5rem 0rem;
    }
    @media (max-width: 620px) {
      font-size: 0.8rem;
      margin: 0.5rem 0rem;
    }
  }

  .review-content {
    margin: 0;

    @media (min-width: 620px) {
      line-height: 1.3rem;
      font-size: 0.8rem;
    }
    @media (max-width: 620px) {
      line-height: 1rem;
      font-size: 0.6rem;
    }
  }
`;