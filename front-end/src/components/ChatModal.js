import { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
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

const Sidebar = ({ gameData, sideView, setSideView, channel, setChannel }) => {
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
                  {gameData.gameName} 관련된 이야기를 나눠보세요!
                </p>
              </div>
            </div>
            <div className="channels">
              <p
                className={
                  channel === 1
                    ? "single-channel selected"
                    : "single-channel disabled"
                }
                onClick={() => setChannel(1)}
              >
                <FontAwesomeIcon icon={faHashtag} />
                {"  "}일반
              </p>
              <p
                className={
                  channel === 2
                    ? "single-channel selected"
                    : "single-channel disabled"
                }
                onClick={() => setChannel(2)}
              >
                <FontAwesomeIcon icon={faHashtag} />
                {"  "}정보공유
              </p>
              <p
                className={
                  channel === 3
                    ? "single-channel selected"
                    : "single-channel disabled"
                }
                onClick={() => setChannel(3)}
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
  const [channel, setChannel] = useState(1);
  const outSection = useRef();
  const [message, setMessage] = useState("");
  const client = useRef({});

  const [chatList, setChatList] = useState([]);
  const tempData = [
    {
      id: "1",
      chatRoomId: "1",
      writerId: "1",
      gameId: "1",
      content: "첫번째 채팅입니다",
      createdAt: "2023-03-03 14:39:20",
    },
    {
      id: "2",
      chatRoomId: "1",
      writerId: "2",
      gameId: "1",
      content: "두번째 채팅입니다",
      createdAt: "2023-03-03 14:39:19",
    },
    {
      id: "3",
      chatRoomId: "1",
      writerId: "3",
      gameId: "1",
      content: "세번쨰 채팅입니다",
      createdAt: "2023-03-03 14:39:18",
    },
  ];

  // 임시로 설정해둔 인자 변수 (나중에 프론트에서 넣어주세요)
  const chatRoomId = 1;
  const writerId = 1;
  const userId = 1;

  const { openScroll } = useBodyScrollLock();

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  useEffect(() => {}, [channel]);

  // connect: 웹소켓(stomp) 연결
  const connect = () => {
    // stomp js client 객체 생성
    client.current = new StompJs.Client({
      brokerURL: "wss://gamemakase.com/ws", // 연결할 url

      // 연결 확인용 출력 문구
      debug: function (str) {
        console.log(str);
      },

      // 에러 발생 시 재연결 시도 딜레이
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      // 연결 시
      onConnect: () => {
        console.log("success");
        subscribe(); // 메세지(채팅)을 받을 주소를 구독합니다.
      },

      // 에러 발생 시 로그 출력
      onStompError: (frame) => {
        console.log(frame);
      },
    });

    // client 객체 활성화
    client.current.activate();
  };

  // subscribe: 메세지 받을 주소 구독
  const subscribe = () => {
    // 구독한 주소로 메세지 받을 시 이벤트 발생
    // (/sub: 웹소켓 공통 구독 주소), (/chat: 기능별(1:1, 3:3, 친구 추가후) 구독 주소), (/chatRoomSeq: 하위 구독 주소(채팅방))
    client.current.subscribe("/sub/chat/" + chatRoomId, (body) => {
      // 받아온 제이슨 파싱
      const json_body = JSON.parse(body.body);

      console.log("메세지 받았당"); // 확인용 출력 (이처럼 메세지 수령 시 특정 이벤트를 발생 시킬 수 있습니다.)
      console.log(body.body);

      // 받아온 채팅 채팅 리스트에 넣기 (이부분은 임시로 한 거고 이후 프론트에서 필요에 따라 받아온 메서지를 렌더링 하면 됩니다.)
      setChatList((_chat_list) => [
        ..._chat_list,
        json_body.senderSeq,
        json_body.message,
        json_body.createdAt,
      ]);
    });
  };

  // publish: 메세지 보내기
  const publish = () => {
    // 연결이 안되어있을 경우
    if (!client.current.connected) {
      alert("연결이 안 되어있어");
      return;
    }

    // 입력된 메세지가 없는 경우
    if (!message) {
      alert("메세지 입력 해");
      return;
    }

    // 메세지를 보내기
    client.current.publish({
      // destination: 보낼 주소
      // (/pub: 웹소켓 공통 발신용 주소), (/send: 기능별 개별 발신용 주소)
      destination: "/pub/send",

      // body: 보낼 메세지
      body: JSON.stringify({
        content: message,
        chatRoomId: chatRoomId,
        gameId: gameData.gameId,
        writerId: writerId,
        // receiverSeq: receiverSeq,
      }),
    });

    console.log({
      content: message,
      chatRoomId: chatRoomId,
      gameId: gameData.gameId,
      writerId: writerId,
    });

    // 보내고 메세지 초기화
    setMessage("");
  };

  // disconnect: 웹소켓 연결 끊기
  const disconnect = () => {
    console.log("연결이 끊어졌습니다");
    client.current.deactivate();
  };

  const handleClose = () => {
    openScroll(scrollPosition);
    setChatView(false);
    setMessage("");
  };

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // handleSubmit: 보내기 버튼 눌렀을 때 보내기(publish 실행)
  const handleSubmit = () => {
    publish();
  };

  const renderChatLogs = (chatLogs) => {
    const result = [];

    if (chatLogs) {
      for (let i = 0; i < chatLogs.length; i++) {
        if (chatLogs[i].writerId === userId) {
          result.push(<div className="my message">{chatLogs[i].content}</div>);
        } else {
          console.log(chatLogs[i].writerId, userId);
          result.push(
            <div className="others message">{chatLogs[i].content}</div>
          );
        }
      }
    }
    return result;
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
                channel={channel}
                setChannel={setChannel}
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
                <div className="chat-logs">
                  {chatList.map((item, index) => {
                    return <div key={index}>{item}</div>;
                  })}
                  {renderChatLogs(tempData)}
                </div>
                {/* todo : 메시지바는 로그인했을 때만 노출 */}
                <div className="messagebar-wrapper">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => activeEnter(e)}
                    value={message}
                  />
                  <div className="send-btn" onClick={() => handleSubmit()}>
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
