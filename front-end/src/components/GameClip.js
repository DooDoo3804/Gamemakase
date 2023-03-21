import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Common } from "../styles/Common";
import appleSvg from "../assets/fontAwesomeSvg/apple.svg";
import windowSvg from "../assets/fontAwesomeSvg/windows.svg";
import linuxSvg from "../assets/fontAwesomeSvg/linux.svg";

export const StyleGameClip = styled(motion.div)`
cursor: pointer;
  background: rgba(217, 217, 217, 0.08);
  border-radius: 15px;
  margin-bottom: 20px;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));

  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  height: 120px;
  min-width: 500px;
  width: 100%;

  @media (min-width: 1560px) {
    height: 155px;
  }

  @media (max-width: 550px) {
    min-height: 180px;
    min-width: 100%;
    flex-direction: column;
  }
  .gameImg {
    height: 120px;
    border-radius: 15px;
    @media (min-width: 1560px) {
      height: 155px;
    }
    @media (max-width: 550px) {
      margin-top: 15px;
      min-height: 120px;
      min-width: 260px;
    }
    width: auto;
  }
  .game-explain {
    position: relative;
    margin-left: 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    @media (max-width: 550px) {
      flex-direction: row;
      padding-top: 10px;
      justify-content: flex-start;
    }

    .title {
      @media (max-width: 550px) {
        padding-right: 20px;
        max-width: 200px;
        min-width: 200px;
        height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
      } 
      font-family: "Noto Sans KR";
      font-style: normal;
      font-size: 18px;
      line-height: 30px;

      position: relative;
      color: ${Common.colors.white01};
    }
    .logo-box {
      display: flex;
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
      margin-right: 13px;
    }
  }
  .price {
    height: 20px;
    color: ${Common.colors.lightGray01};
    position: relative;
    top: 70%;
    @media (max-width: 550px) {
      top: -1.7rem;
    }
    right: 1rem;
    margin-left: auto;
    font-size: 18px;
}
`;

const GameClip = (props) => {
  const navigate = useNavigate();
  return (
    <StyleGameClip
      onClick={() => {navigate(`/detail/${props.gameId}`)}}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <img src={props.imgUrl} className="gameImg" alt="gameImage"></img>
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
      <div className="price">{props.price} $</div>
    </StyleGameClip>
  );
};

export default GameClip;
