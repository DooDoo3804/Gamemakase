import styled from "@emotion/styled";
import { Common } from "./Common";

export const DetailWrapper = styled.div`
  color: ${Common.colors.white01};

  .detail-main {
    display: flex;
    margin-top: -3.9rem;
    width: 100vw;
    height: 56vw;
    background-image: linear-gradient(
        to bottom,
        rgba(50, 50, 50, 0.5),
        rgba(50, 50, 50, 1)
      ),
      url(${(props) => props.src});
    background-size: contain;
    transition: height 0.2s ease-in-out;

    @media (min-width: 768px) {
      height: 40rem;
    }
    @media (max-width: 768px) {
      height: 30rem;
    }
    @media (max-width: 500px) {
      height: 400px;
    }
  }

  .main-wrapper {
    width: 100%;
    display: flex;
    margin-top: 3.9rem;
    justify-content: space-between;
    transition: all 0.5s ease-in-out;

    @media (min-width: 768px) {
      padding: 0rem 4rem;
    }
    @media (max-width: 768px) {
      padding: 0rem 4rem;
    }
    @media (max-width: 500px) {
      padding: 0rem 2rem;
    }
  }

  .title-wrapper {
    position: relative;
    top: 40%;
    transition: all 0.5s ease-in-out;

    @media (min-width: 768px) {
      width: 50%;
    }
    @media (max-width: 768px) {
      width: 70%;
    }
    @media (max-width: 500px) {
      width: 90%;
    }
  }

  .title {
    font-family: "bitbit";
    transition: all 0.5s ease-in-out;

    @media (min-width: 768px) {
      font-size: 4.5vw;
      margin: 2rem 0rem;
    }
    @media (max-width: 768px) {
      font-size: 32px;
      margin: 1.5rem 0rem;
    }
    @media (max-width: 500px) {
      font-size: 24px;
      margin: 1rem 0rem;
    }
  }

  .discription {
    margin: 0;
    transition: all 0.5s ease-in-out;

    @media (min-width: 768px) {
      font-size: 1rem;
    }
    @media (max-width: 768px) {
      font-size: 12px;
    }
    @media (max-width: 500px) {
      font-size: 10px;
    }
  }

  .scrap-wrapper {
    display: flex;
    padding-bottom: 2.5rem;
    justify-content: center;
    align-items: end;
    background-image: url(${(props) => props.scrap_src});
    background-size: contain;
    background-repeat: no-repeat;
    transition: all 0.5s ease-in-out;

    @media (min-width: 768px) {
      width: 3rem;
      height: 3.5rem;
      font-size: 1rem;
    }
    @media (max-width: 768px) {
      width: 2rem;
      height: 2.4rem;
      font-size: 12px;
    }
    @media (max-width: 500px) {
      width: 30px;
      height: 35px;
      font-size: 10px;
    }
  }

  .detail-sub {
  }

  .info-wrapper {
    display: flex;
    justify-content: space-around;
  }

  .single-info {
    border: 2px solid ${Common.colors.white01};
    transition: all 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Noto Serif KR", serif;

    @media (min-width: 768px) {
      width: 20vw;
      height: 20vw;
    }
    @media (max-width: 768px) {
      width: 8rem;
      height: 8rem;
    }
    @media (max-width: 500px) {
      width: 5rem;
      height: 5rem;
    }
  }

  .info-title {
    font-weight: 700;
    transition: all 0.5s ease-in-out;
    margin-top: 0;

    @media (min-width: 768px) {
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }
    @media (max-width: 768px) {
      margin-bottom: 0.4rem;
      font-size: 14px;
    }
    @media (max-width: 500px) {
      margin: 5px;
      font-size: 12px;
    }
  }

  .info-content {
    font-weight: 400;
    transition: all 0.5s ease-in-out;
    margin: 0;

    @media (min-width: 768px) {
      font-size: 1rem;
    }
    @media (max-width: 768px) {
      font-size: 12px;
    }
    @media (max-width: 500px) {
      font-size: 8px;
    }
  }

  .scrennshots-wrapper {
    font-family: "Noto Sans KR", serif;
    font-weight: 700;

    @media (min-width: 768px) {
      font-size: 3vw;
      padding: 3rem 4rem;
      padding-bottom: 0;
    }
    @media (max-width: 768px) {
      font-size: 3vw;
      padding: 2rem 3rem;
      padding-bottom: 0;
    }
    @media (max-width: 500px) {
      font-size: 14px;
      padding: 3rem 2rem;
      padding-bottom: 0;
    }
  }

  .screenshot-text {
    margin: 0;
  }

  .swiper-pagination-bullet {
    border-radius: 0.2rem;

    @media (min-width: 768px) {
      width: 2.5rem;
    }
    @media (max-width: 768px) {
      width: 1.5rem;
    }
    @media (max-width: 500px) {
      width: 1rem;
    }
  }

  .swiper-pagination-bullet-active {
    background-color: ${Common.colors.lightGray01};
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    color: ${Common.colors.mainColor05};
  }

  .swiper-slide {
    margin: 2rem 0rem;
  }

  .swiper-slide img {
    width: 100%;
    border-radius: 0.5rem;
    object-fit: contain;
  }

  .gradient {
    background-image: linear-gradient(
      to bottom,
      rgba(50, 50, 50, 1),
      rgba(81, 81, 81, 1)
    );
    transition: all 0.5s ease-in-out;

    @media (min-width: 768px) {
      height: 8rem;
    }
    @media (max-width: 768px) {
      height: 5rem;
    }
    @media (max-width: 500px) {
      height: 3rem;
    }
  }
`;

export const RecommendUsers = styled.div`
  background-color: #515151;
  transition: all 0.5s ease-in-out;

  .title-text {
    margin: 0;
    font-family: "Noto Sans KR", serif;
    font-weight: 700;

    @media (min-width: 768px) {
      padding: 0rem 4rem;
      font-size: 3vw;
    }
    @media (max-width: 768px) {
      padding: 0rem 3rem;
      font-size: 3vw;
    }
    @media (max-width: 500px) {
      padding: 0rem 2rem;
      font-size: 14px;
    }
  }

  .users-wrapper {
    display: flex;
    margin: 2rem 0rem;
    justify-content: space-around;
    overflow-x: scroll;

    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */

    @media (min-width: 768px) {
      padding: 0rem 4rem;
    }
    @media (max-width: 768px) {
      padding: 0rem 3rem;
    }
    @media (max-width: 500px) {
      padding: 0rem 2rem;
    }
  }

  .users-wrapper::-webkit-scrollbar {
    display: none;
  }

  .single-user {
    margin: 0rem 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .profile-wrapper {
    border-radius: 70%;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
    cursor: pointer;

    @media (min-width: 768px) {
      width: 8rem;
      height: 8rem;
    }
    @media (max-width: 768px) {
      width: 6rem;
      height: 6rem;
    }
    @media (max-width: 500px) {
      width: 4rem;
      height: 4rem;
    }
  }

  .profile-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .username {
    @media (min-width: 768px) {
      font-size: 18px;
    }
    @media (max-width: 768px) {
      font-size: 15px;
    }
    @media (max-width: 500px) {
      font-size: 12px;
    }
  }

  .gradient {
    background-image: linear-gradient(
      to bottom,
      rgba(81, 81, 81, 1),
      rgba(50, 50, 50, 1)
    );
    transition: all 0.5s ease-in-out;

    @media (min-width: 768px) {
      height: 8rem;
    }
    @media (max-width: 768px) {
      height: 5rem;
    }
    @media (max-width: 500px) {
      height: 3rem;
    }
  }
`;
