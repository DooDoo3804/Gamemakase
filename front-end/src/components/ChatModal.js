import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faBars, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  ChatModalBody,
  ChatModalWrapper,
  SideBarBody,
  SmallSidebar,
} from "../styles/ChatModalEmotion";
import useBodyScrollLock from "./ScrollLock";

const Sidebar = ({ gameData, sideView, setSideView }) => {
  const [selected, setSelected] = useState(1);

  return (
    <AnimatePresence>
      {sideView ? (
        <>
          <SideBarBody
            initial={{ x: "-75%" }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "-75%",
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            <div className="channel-title-wrapper">
              <div className="menubar-wrapper">
                <FontAwesomeIcon
                  icon={faBars}
                  onClick={() => setSideView((sideBar) => !sideBar)}
                  className="menubar"
                />
              </div>
              <div className="channel-name-wrapper">
                <p className="channel-name">채널 목록</p>
                <p className="channel-discription">
                  {gameData.gameName}과 관련된 이야기를 나눠보세요!
                </p>
              </div>
            </div>
            <div className="channels">
              <p
                className={
                  selected === 1
                    ? "single-channel selected"
                    : "single-channel disabled"
                }
                onClick={() => setSelected(1)}
              >
                <FontAwesomeIcon icon={faHashtag} />
                {"  "}일반
              </p>
              <p
                className={
                  selected === 2
                    ? "single-channel selected"
                    : "single-channel disabled"
                }
                onClick={() => setSelected(2)}
              >
                <FontAwesomeIcon icon={faHashtag} />
                {"  "}일반
              </p>
              <p
                className={
                  selected === 3
                    ? "single-channel selected"
                    : "single-channel disabled"
                }
                onClick={() => setSelected(3)}
              >
                <FontAwesomeIcon icon={faHashtag} />
                {"  "}일반
              </p>
            </div>
          </SideBarBody>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.2 }}
            onClick={() => setSideView((sideBar) => !sideBar)}
          ></motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
};

const ChatModal = ({ gameData, chatView, setChatView, scrollPosition }) => {
  const [sideView, setSideView] = useState(false);
  const outSection = useRef();

  const { openScroll } = useBodyScrollLock();

  const handleClose = () => {
    openScroll(scrollPosition);
    setChatView(false);
  };

  return (
    <>
      {chatView && (
        <ChatModalWrapper
          ref={outSection}
          onClick={(e) => {
            if (outSection.current === e.target) {
              handleClose();
            }
          }}
        >
          <ChatModalBody
            key={1}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {},
            }}
            exit={{ opacity: 0, y: 50 }}
          >
            <Sidebar
              gameData={gameData}
              sideView={sideView}
              setSideView={setSideView}
            ></Sidebar>
            <SmallSidebar>
              <FontAwesomeIcon
                icon={faBars}
                onClick={() => setSideView((sideView) => !sideView)}
                className="menubar"
              />
            </SmallSidebar>
          </ChatModalBody>
        </ChatModalWrapper>
      )}
    </>
  );
};

export default ChatModal;
