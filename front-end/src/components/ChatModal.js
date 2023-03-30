import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/user";
import { useCookies } from "react-cookie";
import axios from "axios";
import * as StompJs from "@stomp/stompjs";
import { AnimatePresence, motion } from "framer-motion";
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
import { BACKEND_URL } from "../config";

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
  const [chatList, setChatList] = useState([]);
  const [message, setMessage] = useState("");

  const outSection = useRef();
  const client = useRef({});
  const chatRef = useRef();
  const prevId = useRef(-1);

  const [user, setUser] = useRecoilState(userState);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  const { openScroll } = useBodyScrollLock();

  useEffect(() => {
    connect();

    return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setChatList([]);
    axios
      .get(`${BACKEND_URL}api/chatroom/${gameData.gameId}/${channel}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        // console.log(response.data);
        setChatList(response.data);
        subscribe();
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [channel]);

  // 채팅 새로 생기면 아래로 스크롤
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatList, chatView]);

  // connect: 웹소켓(stomp) 연결
  const connect = () => {
    // stomp js client 객체 생성
    client.current = new StompJs.Client({
      brokerURL: "wss://gamemakase.com/ws", // 연결할 url

      // 연결 확인용 출력 문구
      debug: function (str) {
        // console.log(str);
      },

      // 에러 발생 시 재연결 시도 딜레이
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      // 연결 시
      onConnect: () => {
        // console.log("success");
        subscribe(); // 메세지(채팅)을 받을 주소를 구독합니다.
      },

      // 에러 발생 시 로그 출력
      onStompError: (frame) => {
        // console.log(frame);
      },
    });

    // client 객체 활성화
    client.current.activate();
  };

  // subscribe: 메세지 받을 주소 구독
  const subscribe = () => {
    // 구독한 주소로 메세지 받을 시 이벤트 발생
    // (/sub: 웹소켓 공통 구독 주소), (/chat: 기능별(1:1, 3:3, 친구 추가후) 구독 주소), (/chatRoomSeq: 하위 구독 주소(채팅방))
    client.current.subscribe(
      "/sub/chat/" + gameData.gameId + channel,
      (body) => {
        const json_body = JSON.parse(body.body);

        // 확인용 출력 (이처럼 메세지 수령 시 특정 이벤트를 발생 시킬 수 있습니다.)
        // console.log("메세지 받았당");
        // console.log(body.body);

        setChatList((_chat_list) => [
          ..._chat_list,
          {
            chatRoomId: json_body.chatRoomId,
            writerId: json_body.writerId,
            writerName: json_body.writerName,
            gameId: json_body.gameId,
            content: json_body.content,
          },
        ]);
      }
    );
  };

  // publish: 메세지 보내기
  const publish = () => {
    // 연결이 안되어있을 경우
    if (!client.current.connected) {
      alert("서버와 연결에 실패했습니다.");
      return;
    }

    // 입력된 메세지가 없는 경우
    if (!message) {
      alert("메시지를 입력해주세요.");
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
        chatRoomId: channel,
        gameId: gameData.gameId,
        writerId: user.userId,
      }),
    });

    // 보내고 메세지 초기화
    setMessage("");
  };

  // disconnect: 웹소켓 연결 끊기
  const disconnect = () => {
    // console.log("연결이 끊어졌습니다");
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
    if (user) {
      publish();
    }
  };

  const renderChatLogs = (chatLogs) => {
    const result = [];

    if (chatLogs) {
      for (let i = 0; i < chatLogs.length; i++) {
        if (chatLogs[i]) {
          if (user && chatLogs[i].writerId === user.userId) {
            prevId.current = user.userId;

            result.push(
              <div className="my-msg-wrapper" key={i}>
                <motion.div
                  className="my message"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >
                  {chatLogs[i].content}
                </motion.div>
              </div>
            );
          } else {
            if (prevId.current !== chatLogs[i].writerId) {
              prevId.current = chatLogs[i].writerId;

              result.push(
                <div className="user-name" key={i + "user-name"}>
                  {chatLogs[i].writerName}
                </div>
              );
            }
            result.push(
              <div className="others-msg-wrapper" key={i}>
                <motion.div
                  className="others message"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >
                  {chatLogs[i].content}
                </motion.div>
              </div>
            );
          }
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
                <div className="chat-logs" ref={chatRef}>
                  {renderChatLogs(chatList)}
                </div>
                {user ? (
                  <div className="messagebar-wrapper">
                    <input
                      type="text"
                      placeholder="메시지를 입력하세요."
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => activeEnter(e)}
                      value={message}
                    />
                    <div className="send-btn" onClick={() => handleSubmit()}>
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </div>
                  </div>
                ) : (
                  <div className="messagebar-wrapper">
                    <input
                      type="text"
                      value="로그인한 후에 채팅을 시작할 수 있습니다."
                    />
                    <div className="send-btn">
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </div>
                  </div>
                )}
              </ChatRoomBody>
            </ChatModalBody>
          </ChatModalWrapper>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default ChatModal;
