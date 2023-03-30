package com.gamemakase.domain.controller;

import com.gamemakase.domain.model.dto.ChatInsertRequestDto;
import com.gamemakase.domain.model.dto.ChatListResponse;
import com.gamemakase.domain.model.entity.MongoChat;
import com.gamemakase.domain.model.service.ChatService;
import com.gamemakase.domain.model.service.UserService;
import com.gamemakase.global.config.jwt.JwtTokenProvider;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@Slf4j
public class ChatRestController {
  private final ChatService chatService;
  private final SimpMessageSendingOperations sendingOperations;

  private final UserService userService;

  private final Logger logger = LoggerFactory.getLogger(ChatRestController.class);

  //front와 연동할 때는 인자 값에 @RequestBody 어노테이션 추가
  @MessageMapping("/send")
  public ResponseEntity<ChatInsertRequestDto> sendChat(@RequestBody ChatInsertRequestDto requestDto) throws ClassNotFoundException{

    System.out.println("message보내기 성공");
    System.out.println("gameId : " + requestDto.getGameId());
    System.out.println("chatRoomId : " + requestDto.getChatRoomId());

    String writerName = userService.getWriterName(requestDto.getWriterId());

    chatService.insertChat(requestDto, writerName);

    sendingOperations.convertAndSend("/sub/chat/" + requestDto.getGameId() + requestDto.getChatRoomId(), requestDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(requestDto);
  }

  @GetMapping(value = "/api/chatroom/{gameId}/{chatRoomId}")
  public ResponseEntity<List<ChatListResponse>> getChatByChatRoomNum(@PathVariable("gameId") long gameId, @PathVariable("chatRoomId") Long chatRoomId){
    logger.info("채팅 조회 성공");


    List<MongoChat> chatList = chatService.findByGameIdAndChatRoomId(gameId, chatRoomId);


    List<ChatListResponse> chatResList = chatList.stream().map(ChatListResponse::new).collect(
        Collectors.toList());

    return ResponseEntity.status(HttpStatus.OK).body(chatResList);
  }

}
