import styled from "@emotion/styled";
import { motion } from "framer-motion";

const StyleProfileCirlce = styled(motion.div)`
  display: flex;
  margin : 15px;
  .profile-img-wrapper {
    margin: 0;
    width: 80px;
    height: 80px;
    border-radius: 70%;
    overflow: hidden;
  }
  .profile-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }

  .explain {
    min-width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    .online {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      .online-str {
        font-family: "Noto Sans KR";
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 20px;
      }
      .online-mark {
        margin-left: 10px;
        width: 6px;
        height: 6px;
        border-radius: 70%;
        background-color: #7CED87;
      }
      .offline-mark {
        margin-left: 10px;
        width: 6px;
        height: 6px;
        border-radius: 70%;
        background-color: #fc7a89;
      }
    }
    .name {
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
    }
  }
`;

const ProfileCircle = (props) => {
    return (
        <StyleProfileCirlce className="profile-circle"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <div className="profile-img-wrapper">
                <img className="profile-img" src={props.profileImg} alt="profileImg" />
            </div>
            <div className="explain">
                <div className="online">
                    <div className="online-str">스팀 온라인</div>
                    {props.online ? (
                        <div className="online-mark"></div>
                    ) : (
                        <div className="offline-mark"></div>
                    )}
                </div>
                <div className="name">{props.name}</div>
            </div>
        </StyleProfileCirlce>
    );
};

export default ProfileCircle;
