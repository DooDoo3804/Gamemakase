import { useRef } from "react";
import { ChatModalBody, ChatModalWrapper } from "../styles/ChatModalEmotion";
import useBodyScrollLock from "./ScrollLock";

const ChatModal = ({ chatView, setChatView, scrollPosition }) => {
  const outSection = useRef();

  const { openScroll } = useBodyScrollLock();

  const handleClose = () => {
    openScroll(scrollPosition);
    setChatView(false);
  };

  return (
    <>
      {chatView ? (
        <ChatModalWrapper
          ref={outSection}
          onClick={(e) => {
            if (outSection.current === e.target) {
              handleClose();
            }
          }}
        >
          <ChatModalBody
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {},
            }}
          >
            ㅎㅇ
          </ChatModalBody>
        </ChatModalWrapper>
      ) : null}
    </>
  );
};

export default ChatModal;
