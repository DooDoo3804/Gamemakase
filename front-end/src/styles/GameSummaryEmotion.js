import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Common } from "./Common";
import scrap from "../assets/scrap_img.svg";
import scrap_hover from "../assets/fontAwesomeSvg/scrap_hover.svg";

export const GameSummaryClip = styled(motion.div)`
  cursor: pointer;
  height: auto;
  background: rgba(217, 217, 217, 0.2);
  border-radius: 15px;
  margin-bottom: 20px;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));

  display: flex;
  justify-content: flex-start;
  flex-direction: row;

  @media (max-width: 600px) {
    min-height: 180px;
    min-width: 360px;
    flex-direction: column;
  }

  @media (max-width: 700px) {
    height: 120px;
  }

  @media (max-width: 1300px) {
    min-width: 100%;
  }

  @media (min-width: 1300px) {
    height: 120px;
    min-width: 49%;
    max-width: 49%;
  }

  height: 132px;
  img {
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-radius: 15px;
    @media (max-width: 600px) {
      margin-top: 15px;
      min-height: 120px;
    }

    @media (max-width: 700px) {
      height: 120px;
    }

    @media (min-width: 1300px) {
      height: 120px;
    }

    height: 132px;
  }
  .game-explain {
    position: relative;
    margin-left: 3%;
    margin-right: 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    @media (max-width: 600px) {
      flex-direction: row;
      padding-top: 10px;
      justify-content: flex-start;
    }

    .title {
      font-family: "Noto Sans KR";
      font-style: normal;
      font-size: 18px;
      line-height: 30px;
      position: relative;
      color: ${Common.colors.white01};

      @media (max-width: 600px) {
        padding-right: 10px;
        max-width: 220px;
        min-width: 220px;
        height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      @media (max-width: 700px) {
        font-size: 14px;
        margin-bottom: 0;
      }

      @media (min-width: 1300px) {
        font-size: 15px;
        margin-bottom: 0;
      }
    }
    .logo-box {
      display: flex;
      margin-top: 10px;
      @media (max-width: 600px) {
        display: none;
      }
    }
    .brand-logo {
      border-radius: 0;
      position: relative;
      max-width: 20px;
      max-height: 20px;
      margin-right: 10px;
    }
  }
  .etc {
    margin-left: auto;
    margin-right: 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (max-width: 600px) {
      flex-direction: row;
      min-height: 30px;
      max-height: 30px;
      align-items: center;
      position: relative;
      top: -25px;
    }
  }
  .scrap-wrapper:hover {
    background-image: url(${scrap_hover});
  }
  .scrap-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: url(${scrap});
    background-size: contain;
    background-repeat: no-repeat;
    transition: all 0.5s ease-in-out;
    
    padding-bottom: 2rem;
    margin-right: 20px;

    position: relative;
    
    @media (min-width: 1300px) {
      left: 20px;
      width: 2rem;
      height: 2rem;
      .scrap {
        max-width: 1rem;
        min-width: 1rem;
        max-height: 1rem;
        min-height: 1rem;
      }
    }
    @media (max-width: 1300px) {
      left: 25px;
      width: 2.3rem;
      height: 2.3rem;
      .scrap {
        max-width: 1rem;
        min-width: 1rem;
        max-height: 1rem;
        min-height: 1rem;
      }
    }
    @media (max-width: 700px) {
      left: 20px;
      width: 30px;
      min-height: 30px;
      max-height: 30px;
      .scrap {
        max-height: 0.8rem;
        min-height: 0.8rem;
        max-width: 0.8rem;
        min-width: 0.8rem;
      }
    }
    @media (max-width: 600px) {
      top: -134px;
      left: 55px;
      width: 35px;
      min-height: 35px;
      max-height: 35px;
      .scrap {
        max-height: 1rem;
        min-height: 1rem;
        max-width: 1rem;
        min-width: 1rem;
      }
    }
  }
  .price {
    min-width: 40px;
    text-align: right;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: ${Common.colors.lightGray01};
    position: relative;
    margin-bottom: 13px;
    margin-left: 0;
    @media (max-width: 700px) {
      font-size: 15px;
    }
    @media (min-width: 1300px) {
      font-size: 15px;
    }
  }

  .not-my {
    position: relative;
    top: 95px;
    @media (max-width: 600px) {
      top: 0px;
    }
  }
`;
