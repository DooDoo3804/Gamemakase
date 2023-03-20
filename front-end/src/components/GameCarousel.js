import styled from "@emotion/styled";
import { useRef } from "react";
// import { AnimatePresence, motion } from "framer-motion";

const Wrapper = styled.div`
  body {
    background: #333;
    padding: 70px 0;
    font: 15px/20px Arial, sans-serif;
  }

  .container {
    margin: 0 auto;
    width: 250px;
    height: 200px;
    position: relative;
    perspective: 1000px;
  }

  .carousel {
    height: 100%;
    width: 100%;
    position: absolute;
    transform-style: preserve-3d;
    transition: transform 1s;
  }

  .item {
    display: block;
    position: absolute;
    background: #000;
    width: 150px;
    height: 120px;
    /* line-height: 200px; */
    font-size: 2em;
    text-align: center;
    color: #fff;
    opacity: 0.95;
    border-radius: 10px;
  }

  .a {
    transform: rotateY(0deg) translateZ(250px);
    background: #ed1c24;
  }
  .b {
    transform: rotateY(72deg) translateZ(250px);
    background: #0072bc;
  }
  .c {
    transform: rotateY(144deg) translateZ(250px);
    background: #39b54a;
  }
  .d {
    transform: rotateY(216deg) translateZ(250px);
    background: #f26522;
  }
  .e {
    transform: rotateY(288deg) translateZ(250px);
    background: #630460;
  }

  .next,
  .prev {
    color: #444;
    position: absolute;
    top: 100px;
    padding: 1em 2em;
    cursor: pointer;
    background: #ccc;
    border-radius: 5px;
    border-top: 1px solid #fff;
    box-shadow: 0 5px 0 #999;
    transition: box-shadow 0.1s, top 0.1s;
  }
  .next:hover,
  .prev:hover {
    color: #000;
  }
  .next:active,
  .prev:active {
    top: 104px;
    box-shadow: 0 1px 0 #999;
  }
  .next {
    right: 5em;
  }
  .prev {
    left: 5em;
  }
`;

const GameCarousel = () => {
  // var carousel = $(".carousel"),
  const carousel = useRef(null);
  let currdeg = 0;

  const rotate = (e) => {
    if (carousel.current) {
      if (e.d === "n") {
        currdeg = currdeg - 72;
      }
      if (e.d === "p") {
        currdeg = currdeg + 72;
      }
      carousel.current.style.transform = `rotateY(${currdeg}deg)`;
    }
  };

  return (
    <Wrapper>
      <div class="container">
        <div class="carousel" ref={carousel}>
          <div class="item a">A</div>
          <div class="item b">B</div>
          <div class="item c">C</div>
          <div class="item d">D</div>
          <div class="item e">E</div>
        </div>
      </div>
      <div class="next" onClick={() => rotate({ d: "n" })}>
        Next
      </div>
      <div class="prev" onClick={() => rotate({ d: "p" })}>
        Prev
      </div>
    </Wrapper>
  );
};

export default GameCarousel;
