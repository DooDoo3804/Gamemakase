import { ChatModalBody, ChatModalWrapper } from "../styles/ChatModalEmotion";

const ChatModal = ({ chatView, setChatView, scrollPosition }) => {
  return (
    <>
      {chatView ? (
        <ChatModalWrapper>
          <ChatModalBody>ㅎㅇ</ChatModalBody>
        </ChatModalWrapper>
      ) : null}
    </>
  );
};

export default ChatModal;
