import styled from "@emotion/styled";
import { Common } from "./Common";
import banner_bg from "../assets/banner_bg.gif";
import { motion } from "framer-motion";

export const HomeWrapper = styled.div`
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
  }
  .swiper-pagination-bullet-active {
    background-color: ${Common.colors.white01};
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    color: ${Common.colors.white01};
  }
`;

export const Banner = styled.div`
  color: ${Common.colors.lightGray01};
  background: linear-gradient(
    to bottom,
    ${Common.colors.mainColor02},
    ${Common.colors.lavender01}
  );

  transition: all 0.3s ease-in-out;

  @media (min-width: 768px) {
    height: 17rem;
  }
  @media (max-width: 768px) {
    height: 15rem;
  }
  @media (max-width: 500px) {
    height: 15rem;
  }

  .banner1 {
    display: flex;
    height: 100%;
    align-items: center;
    background-image: url(${banner_bg});
    background-size: 150px;
    background-repeat: repeat-x;

    @media (min-width: 530px) {
      justify-content: space-evenly;
    }
    @media (max-width: 530px) {
      flex-direction: column;

      .subtitle {
        display: none;
      }

      .text-wrapper {
        margin-top: 1.3rem;
      }
    }
  }

  .banner2 {
    display: flex;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    background-image: url(${banner_bg});
    background-size: 150px;
    background-repeat: repeat-x;
  }

  .lottie-wrapper {
    display: flex;
    margin-left: 8rem;
    width: 13rem;
    transition: display 0.5s ease-in-out;

    @media (max-width: 650px) {
      display: none;
    }
  }

  .single-lottie {
    position: relative;
    margin-left: -5rem;
  }

  .text-wrapper {
    z-index: 2;
    display: flex;
    flex-direction: column;
    transition: all 0.5s ease-in-out;

    @media (min-width: 650px) {
      margin-right: 3rem;
    }

    @media (max-width: 650px) {
      align-items: center;
    }
  }

  .subtitle {
    margin: 0;
    color: ${Common.colors.white01};
    font-family: "Noto Serif KR", serif;
    font-weight: 300;

    transition: font-size 0.3s ease-in-out;

    @media (min-width: 768px) {
      font-size: 1.2rem;
    }
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
    @media (max-width: 500px) {
      font-size: 1rem;
    }
  }

  .title {
    margin: 0;
    color: ${Common.colors.white01};
    font-family: "Noto Sans KR", serif;
    font-weight: 700;
    text-shadow: #000 1px 0 4px;
    transition: font-size 0.3s ease-in-out;

    @media (min-width: 768px) {
      font-size: 2.8rem;
    }
    @media (max-width: 768px) {
      font-size: 2.4rem;
    }
    @media (max-width: 500px) {
      font-size: 2rem;
    }
  }

  .test-btn {
    margin-top: 0.8rem;
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
      width: 9rem;
      height: 2.5rem;
      font-size: 1rem;
    }
    @media (max-width: 768px) {
      width: 8rem;
      height: 2.3rem;
      font-size: 1rem;
    }
    @media (max-width: 500px) {
      width: 6rem;
      height: 2rem;
      font-size: 0.8rem;
    }
  }

  .test-btn:hover {
    background-color: rgba(255, 255, 255, 0.5);
    transition: background-color 0.3s ease-in-out;
    font-weight: 600;

    transition: font-size 0.3s ease-in-out;

    @media (min-width: 500px) {
      font-size: 1.05rem;
    }
    @media (max-width: 500px) {
      font-size: 0.85rem;
    }
  }

  .games-wrapper {
    display: flex;
    justify-content: space-around;

    /* @media (max-width: 500px) {
      display: none;
    } */
  }

  .single-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease-in-out;

    @media (min-width: 1050px) {
      margin: 0rem 0.2rem;
    }
    @media (max-width: 1050px) {
      margin: 0rem -1rem;
    }
    @media (max-width: 500px) {
      margin: 0rem -1rem;
    }
  }

  .game-img {
    position: relative;
    border-radius: 2rem;
    z-index: 2;
    transition: all 0.3s ease-in-out;

    @media (min-width: 768px) {
      width: 7rem;
    }
    @media (max-width: 768px) {
      width: 4rem;
    }
  }

  .plate {
    position: relative;
    z-index: 1;
    transition: all 0.3s ease-in-out;

    @media (min-width: 768px) {
      width: 8rem;
      margin-top: -2rem;
    }
    @media (max-width: 768px) {
      width: 5rem;
      margin-top: -1.5rem;
    }
  }
`;

export const RecommendWrapper = styled.div`
  padding: 1rem 1.5rem;

  .rcm-title {
    color: #ffffff;
    font-family: "Noto Sans KR", serif;
    font-size: 1.5rem;
    font-weight: 600;
    padding: 0.5rem 0rem;

    display: flex;
    align-items: center;
  }

  .game-title {
    color: ${Common.colors.white01};
    font-family: "Noto Sans KR", serif;
    margin: 0.5rem 0.5rem;

    @media (min-width: 768px) {
      font-size: 1rem;
    }
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
    @media (max-width: 500px) {
      font-size: 0.6rem;
    }
  }

  .swiper-slide {
    margin: 2rem 0rem;
  }

  .swiper-slide img {
    width: 100%;
    border-radius: 10%;
    object-fit: contain;
    cursor: pointer;
    z-index: 8;

    transform: scale(1);
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transition: all 0.3s ease-in-out;
  }

  .swiper-slide img:hover {
    z-index: 9;
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
  }

  .loading-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;

    max-height: 3rem;
    margin: 3rem 0rem;

    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;

    img {
      object-fit: contain;
    }
  }
`;

export const MoreGamesWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: 768px) {
    margin: 1rem 5rem;
  }
  @media (max-width: 768px) {
    margin: 1rem 2rem;
  }
  @media (max-width: 500px) {
    margin: 1rem 1rem;
  }
`;

export const ScrollToTopBtn = styled(motion.div)`
  background-color: ${Common.colors.mainColor05};
  border-radius: 70%;
  border: 2px solid ${Common.colors.white01};
`;
