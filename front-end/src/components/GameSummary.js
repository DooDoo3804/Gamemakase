import { GameSummaryClip } from "../styles/GameSummaryEmotion";
import appleSvg from "../assets/fontAwesomeSvg/apple.svg";
import windowSvg from "../assets/fontAwesomeSvg/windows.svg";
import linuxSvg from "../assets/fontAwesomeSvg/linux.svg";

const GameSummary = (props) => {
  return (
    <GameSummaryClip
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
    </GameSummaryClip>
  );
};

export default GameSummary;
