import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faApple,
  faSteam,
  faWindows,
} from "@fortawesome/free-brands-svg-icons";
import { GameSummaryClip } from "../styles/GameSummaryEmotion";

const GameSummary = (props) => {
  return (
    <GameSummaryClip key={props.idx}>
      <img src={props.imgUrl} alt="gameImage"></img>
      <div className="game-explain">
        <div className="title">{props.title}</div>
        <div className="logo-box">
          {props.window ? (
            <FontAwesomeIcon className="brand-logo" icon={faWindows} />
          ) : (
            ""
          )}
          {props.apple ? (
            <FontAwesomeIcon className="brand-logo" icon={faApple} />
          ) : (
            ""
          )}
          {props.steam ? (
            <FontAwesomeIcon className="brand-logo" icon={faSteam} />
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
