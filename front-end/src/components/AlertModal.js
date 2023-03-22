import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
// import useBodyScrollLock from "./ScrollLock";
import { Common } from "../styles/Common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import gamemakase_logo from "../assets/gamemakase_logo.svg";

const AlertModalWrapper = styled(motion.div)`
  z-index: 999;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const AlertModalBody = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60%;
  background-image: linear-gradient(
    to bottom,
    rgba(50, 50, 50, 1),
    rgba(55, 51, 77, 1)
  );
  border: 2px solid ${Common.colors.white01};
  color: ${Common.colors.white01};
  transition: all 0.5s ease-in-out;
  font-family: "Sarpanch", sans-serif;

  @media (min-width: 1024px) {
    width: 20rem;
    min-height: 18rem;
    max-height: 18rem;
    border-radius: 2rem;
    padding: 2rem;
  }
  @media (max-width: 1024px) {
    width: 20rem;
    min-height: 18rem;
    max-height: 18rem;
    border-radius: 2rem;
    padding: 1.8rem;
  }
  @media (max-width: 768px) {
    width: 20rem;
    min-height: 18rem;
    max-height: 18rem;
    border-radius: 1.5rem;
    padding: 1.5rem;
  }
  @media (max-width: 500px) {
    width: 15rem;
    height: 15rem;
    border-radius: 1rem;
    padding: 1rem;
  }

  .icon-container {
    width: 100%;
    display: flex;
    justify-content: end;

    transition: all 0.3s ease-in-out;

    @media (min-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
    @media (max-width: 500px) {
      font-size: 1rem;
    }
    .x-mark {
      cursor: pointer;
    }
  }

  .msg-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 80%;
  }

  .logo-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .msg-text {
  }

  .btn-section {
    cursor: pointer;
    display: flex;
    .confirm-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${Common.colors.confirmGreen};
      width: 6rem;
      height: 3rem;
      border-radius: 2rem;
      margin-right: 20px;
    }
    .cancel-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${Common.colors.cancelRed};
      width: 6rem;
      height: 3rem;
      border-radius: 2rem;
    }
  }
`;

const AlertModal = (props) => {
  const outSection = useRef();

  // const { openScroll } = useBodyScrollLock();

  const handleClose = () => {
    // openScroll(scrollPosition);
    props.setAlertView(false);
  };

  return (
    <AnimatePresence>
      {props.alertView ? (
        <AlertModalWrapper
          ref={outSection}
          onClick={(e) => {
            if (outSection.current === e.target) {
              handleClose();
            }
          }}
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AlertModalBody
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {},
            }}
          >
            <div className="icon-container">
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => handleClose()}
                className="x-mark"
              />
            </div>
            <div className="msg-wrapper">
              <div className="logo-wrapper">
                <img src={gamemakase_logo} alt="logo" className="logo" />
                <p className="msg-text">{props.msg}</p>
              </div>
              <div className="btn-section">
                <div
                  className="confirm-btn"
                  onClick={() => {
                    props.goFunction();
                    handleClose();
                  }}
                >
                  {props.confrimMsg}
                </div>
                <div className="cancel-btn" onClick={() => handleClose()}>
                  {props.cancelMsg}
                </div>
              </div>
            </div>
          </AlertModalBody>
        </AlertModalWrapper>
      ) : null}
    </AnimatePresence>
  );
};

export default AlertModal;
