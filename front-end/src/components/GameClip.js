import styled from "@emotion/styled";
import { motion } from "framer-motion";

import appleSvg from "../assets/fontAwesomeSvg/apple.svg";
import windowSvg from "../assets/fontAwesomeSvg/windows.svg";
import linuxSvg from "../assets/fontAwesomeSvg/linux.svg";
import { Common } from "../styles/Common";

export const StyleGameClip = styled(motion.div)`
cursor: pointer;
  height: auto;
  background: rgba(217, 217, 217, 0.08);
  border-radius: 15px;
  margin-bottom: 20px;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));

  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  height: 120px;
  width: 100%;
  img {
    height: 120px;
    width: auto;
  }
  .game-explain {
    position: relative;
    margin-left: 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .title {
      font-family: "Noto Sans KR";
      font-style: normal;
      font-size: 18px;
      line-height: 30px;

      position: relative;
      color: ${Common.colors.white01};
    }
    .logo-box {
      display: flex;
      margin-top: 10px;
    }
    .brand-logo {
      position: relative;
      width: 100%;
      max-width: 20px;
      height: 100%;
      max-height: 20px;
      margin-right: 5px;
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
}
`;

const GameClip = (props) => {
  return (
    <StyleGameClip
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <img src={props.imgUrl} alt="gameImage"></img>
      <div className="game-explain">
        <div className="title">{props.title}</div>
        <div className="logo-box">
          {props.window ? (
            <img src={windowSvg} className="brand-logo" alt="windowSvg" />
          ) : (
            ""
          )}
          {props.apple ? (
            <img src={appleSvg} className="brand-logo" alt="appleSvg" />
          ) : (
            ""
          )}
          {props.linux ? (
            <img src={linuxSvg} className="brand-logo" alt="linuxSvg" />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="price">{props.price}$</div>
    </StyleGameClip>
  );
};

export default GameClip;
