import styled from "@emotion/styled";
import { Common } from "./Common";

export const GameSummaryClip = styled.div`
  background: rgba(217, 217, 217, 0.2);
  border-radius: 10px;
  margin-bottom: 20px;

  display: flex;
  justify-content: flex-start;
  flex-direction: row;

  @media (max-width: 550px) {
    min-height: 180px;
    min-width: 360px;
    flex-direction: column;
  }
  
  @media (max-width: 700px) {
    height: 120px;
  }

  @media (max-width: 1150px) {
    min-width: 100%;
  }

  @media (min-width: 1150px) {
    height: 120px;
    min-width: 49%;
    max-width: 49%;
  }

  height: 132px;
  img {
    cursor: pointer;
    @media (max-width: 550px) {
      margin-top: 15px;
      min-height: 120px;
      min-width: 260px;
    }

    @media (max-width: 700px) {
      height: 120px;
    }

    @media (min-width: 1150px) {
      height: 120px;
    }

    height: 132px;
  }
  .game-explain {
    position: relative;
    margin-left: 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    @media (max-width: 536px) {
      flex-direction: row;
      padding-top: 10px;
      justify-content: flex-start;
    }

    .title {
      cursor: pointer;
      font-family: "Noto Sans KR";
      font-style: normal;
      font-size: 22px;
      line-height: 30px;

      position: relative;
      color: ${Common.colors.white01};

      @media (max-width: 550px) {
        padding-right: 10px;
      }
      @media (max-width: 700px) {
        font-size: 14px;
        margin-bottom: 0;
      }

      @media (min-width: 1150px) {
        font-size: 15px;
        margin-bottom: 0;
      }
    }
    .logo-box {
      display: flex;
      margin-top: 10px;
      @media (max-width: 550px) {
        display: none;
      }
    }
    .brand-logo {
      position: relative;
      width: 100%;
      max-width: 20px;
      height: 100%;
      max-height: 20px;
      margin-right: 5px;
      color: ${Common.colors.lightGray01};
    }
  }
  .price {
    height: 20px;
    color: ${Common.colors.lightGray01};
    position: relative;

    top: 75%;
    right: 1rem;
    margin-left: auto;
    font-size: 18px;
    
    @media (max-width: 550px) {
      top: -1.5rem;
    }

    @media (max-width: 700px) {
      font-size: 15px;
    }

    @media (min-width: 1150px) {
      font-size: 15px;
      top: 75%;
    }
}
`;
