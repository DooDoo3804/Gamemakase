import styled from "@emotion/styled";
import { useRef } from "react";
import { Common } from "../styles/Common";
import plate from "../assets/banner_plate.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .container {
    margin: 0 auto;
    width: 150px;
    height: 120px;
    position: relative;
    transition: all 0.3s ease-in-out;

    @media (min-width: 1024px) {
      perspective: 50rem;
    }
    @media (max-width: 1024px) {
      perspective: 50rem;
    }
    @media (max-width: 768px) {
      perspective: 50rem;
    }
  }

  .carousel {
    height: 100%;
    width: 100%;
    position: absolute;

    transform-style: preserve-3d;
    transition: transform 1s;

    transform-origin: 50% 50%;
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    opacity: 0.95;

    transition: all 0.3s ease-in-out;

    @media (min-width: 1024px) {
      width: 15rem;
      height: 10rem;
    }
    @media (max-width: 1024px) {
      width: 15rem;
      height: 10rem;
    }
    @media (max-width: 768px) {
      width: 15rem;
      height: 10rem;
    }
  }

  .img-container {
    margin-top: 1rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;

    transition: all 0.3s ease-in-out;

    @media (min-width: 1024px) {
      width: 12rem;
      border-radius: 2rem;
    }
    @media (max-width: 1024px) {
      width: 10rem;
      border-radius: 2rem;
    }
    @media (max-width: 768px) {
      width: 8rem;
      border-radius: 2rem;
    }
  }

  .game-plate-img {
    width: 100%;
    object-fit: cover;
  }

  .plate-container {
    transition: all 0.3s ease-in-out;

    @media (min-width: 1024px) {
      max-height: 7rem;
      margin-top: -4rem;
    }
    @media (max-width: 1024px) {
      max-height: 6rem;
      margin-top: -3rem;
    }
    @media (max-width: 768px) {
      max-height: 5rem;
      margin-top: -3rem;
    }
  }

  .plate-img {
    height: 100%;
    object-fit: contain;
    transition: all 0.3s ease-in-out;
  }

  .a {
    @media (min-width: 1024px) {
      transform: rotateY(0deg) translateZ(200px);
    }
    @media (max-width: 1024px) {
      transform: rotateY(0deg) translateZ(150px);
    }
    @media (max-width: 768px) {
      transform: rotateY(0deg) translateZ(100px);
    }
  }
  .b {
    /* transform: rotateY(72deg) translateZ(150px); */
    @media (min-width: 1024px) {
      transform: rotateY(72deg) translateZ(200px);
    }
    @media (max-width: 1024px) {
      transform: rotateY(72deg) translateZ(150px);
    }
    @media (max-width: 768px) {
      transform: rotateY(72deg) translateZ(100px);
    }
  }
  .c {
    /* transform: rotateY(144deg) translateZ(150px); */
    @media (min-width: 1024px) {
      transform: rotateY(144deg) translateZ(200px);
    }
    @media (max-width: 1024px) {
      transform: rotateY(144deg) translateZ(150px);
    }
    @media (max-width: 768px) {
      transform: rotateY(144deg) translateZ(100px);
    }
  }
  .d {
    /* transform: rotateY(216deg) translateZ(150px); */
    @media (min-width: 1024px) {
      transform: rotateY(216deg) translateZ(200px);
    }
    @media (max-width: 1024px) {
      transform: rotateY(216deg) translateZ(150px);
    }
    @media (max-width: 768px) {
      transform: rotateY(216deg) translateZ(100px);
    }
  }
  .e {
    /* transform: rotateY(288deg) translateZ(150px); */
    @media (min-width: 1024px) {
      transform: rotateY(288deg) translateZ(200px);
    }
    @media (max-width: 1024px) {
      transform: rotateY(288deg) translateZ(150px);
    }
    @media (max-width: 768px) {
      transform: rotateY(288deg) translateZ(100px);
    }
  }

  .btns-wrapper {
    display: flex;
    justify-content: space-between;
    z-index: 3;
  }

  .next,
  .prev {
    /* position: absolute; */
    color: ${Common.colors.white01};

    cursor: pointer;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 2rem;
    border: 1px solid ${Common.colors.white01};

    transition: all 0.3s ease-in-out;

    @media (min-width: 1024px) {
      font-size: 1rem;
      padding: 0.5rem 1rem;
    }
    @media (max-width: 1024px) {
      font-size: 1rem;
      padding: 0.5rem 1rem;
    }
    @media (max-width: 768px) {
      font-size: 0.8rem;
      padding: 0.4rem 0.8rem;
    }
  }
  .next:hover,
  .prev:hover {
    background: rgba(255, 255, 255, 0.6);
    transition: all 0.3s ease-in-out;
  }
`;

const GameCarousel = () => {
  const carousel = useRef(null);
  const itemAngle = 72;
  let currdeg = 0;

  const rotate = (deltaDeg) => {
    currdeg = currdeg + deltaDeg;
    carousel.current.style.transform = `rotateY(${currdeg}deg)`;
  };

  const handleNextClick = () => {
    rotate(-itemAngle);
  };

  const handlePrevClick = () => {
    rotate(itemAngle);
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="carousel" ref={carousel}>
          <div className="item a">
            <div className="img-container">
              <img
                className="game-plate-img"
                alt="game-img"
                src="https://cdn.cloudflare.steamstatic.com/steam/apps/1135690/header.jpg?t=1667779371"
              />
            </div>
            <div className="plate-container">
              <img className="plate-img" alt="plate-img" src={plate} />
            </div>
          </div>
          <div className="item b">
            <div className="img-container">
              <img
                className="game-plate-img"
                alt="game-img"
                src="https://cdn.cloudflare.steamstatic.com/steam/apps/1210320/header.jpg?t=1671467586"
              />
            </div>
            <div className="plate-container">
              <img className="plate-img" alt="plate-img" src={plate} />
            </div>
          </div>
          <div className="item c">
            <div className="img-container">
              <img
                className="game-plate-img"
                alt="game-img"
                src="https://cdn.cloudflare.steamstatic.com/steam/apps/1868140/header.jpg?t=1678794959"
              />
            </div>
            <div className="plate-container">
              <img className="plate-img" alt="plate-img" src={plate} />
            </div>
          </div>
          <div className="item d">
            <div className="img-container">
              <img
                className="game-plate-img"
                alt="game-img"
                src="https://cdn.akamai.steamstatic.com/steam/apps/1557780/header_292x136_koreana.jpg?t=1640234732"
              />
            </div>
            <div className="plate-container">
              <img className="plate-img" alt="plate-img" src={plate} />
            </div>
          </div>
          <div className="item e">
            <div className="img-container">
              <img
                className="game-plate-img"
                alt="game-img"
                src="https://cdn.cloudflare.steamstatic.com/steam/apps/1210320/header.jpg?t=1671467586"
              />
            </div>
            <div className="plate-container">
              <img className="plate-img" alt="plate-img" src={plate} />
            </div>
          </div>
        </div>
      </div>
      <div className="btns-wrapper">
        <div className="prev" onClick={handlePrevClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className="next" onClick={handleNextClick}>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </Wrapper>
  );
};

export default GameCarousel;
