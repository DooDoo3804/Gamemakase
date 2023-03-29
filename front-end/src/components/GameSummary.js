import { useNavigate } from "react-router";
import { GameSummaryClip } from "../styles/GameSummaryEmotion";
import appleSvg from "../assets/fontAwesomeSvg/apple.svg";
import windowSvg from "../assets/fontAwesomeSvg/windows.svg";
import linuxSvg from "../assets/fontAwesomeSvg/linux.svg";
import star from "../assets/fontAwesomeSvg/star.svg"

const GameSummary = (props) => {
  const navigate = useNavigate();
  return (
    <GameSummaryClip
      onClick={() => { navigate(`/detail/${props.gameId}`) }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 12 }}
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
      <div className="etc">
        {props.isMine ? <div className="scrap-wrapper" onClick={(e) => {
          props.clickFunc(props.scrapId);
          e.stopPropagation();
        }}>
          <img className="scrap" src={star} alt="scrapStar"></img>
        </div> : ""}
        {props.isMine ? <div className="price">{props.price === 0 ? "Free" : `$${props.price}`}</div> :
          <div className="not-my price">{props.price === 0 ? "Free" : `$${props.price}`}</div>}
      </div>
    </GameSummaryClip>
  );
};

export default GameSummary;
