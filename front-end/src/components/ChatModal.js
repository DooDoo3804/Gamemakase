import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  faBars,
  faHashtag,
  faPaperPlane,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  ChatModalBody,
  ChatModalWrapper,
  ChatRoomBody,
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
              opacity: 1,
            }}
            exit={{
              x: "-75%",
              opacity: 0,
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
                {"  "}정보공유
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
                {"  "}친구찾기
              </p>
            </div>
          </SideBarBody>
        </>
      ) : null}
    </AnimatePresence>
  );
};

const ChatModal = ({ gameData, chatView, setChatView, scrollPosition }) => {
  const [sideView, setSideView] = useState(false);
  const outSection = useRef();
  const message = useRef(null);

  const { openScroll } = useBodyScrollLock();

  const handleClose = () => {
    openScroll(scrollPosition);
    setChatView(false);
    message.current = null;
  };

  const handleChange = (e) => {
    message.current = e.target.value;
    // console.log(message.current);
  };

  return (
    <>
      <AnimatePresence>
        {chatView ? (
          <ChatModalWrapper
            ref={outSection}
            onClick={(e) => {
              if (outSection.current === e.target) {
                handleClose();
              }
            }}
            exit={{ opacity: 0 }}
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

              <ChatRoomBody>
                <SmallSidebar>
                  <FontAwesomeIcon
                    icon={faBars}
                    onClick={() => setSideView((sideView) => !sideView)}
                    className="menubar"
                  />
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="x-mark"
                    onClick={() => handleClose()}
                  />
                </SmallSidebar>
                <div className="chat-logs"></div>
                {/* todo : 메시지바는 로그인했을 때만 노출 */}
                <div className="messagebar-wrapper">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    onChange={handleChange}
                  />
                  <div className="send-btn">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </div>
                </div>
              </ChatRoomBody>
            </ChatModalBody>
          </ChatModalWrapper>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default ChatModal;
