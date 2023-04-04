package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.ChatInsertRequestDto;
import com.gamemakase.domain.model.entity.MongoChat;
import java.util.List;

public interface ChatService {

  MongoChat findBySeq(String seq);
  MongoChat findByChatRoomId(long chatRoomId);
  String insertChat(ChatInsertRequestDto requestDto, String writerName);
  List<MongoChat> findByRoomNumOrderByCreatedAtDesc(Long roomNum);

  List<MongoChat> findByGameIdAndChatRoomId(long gameId, long chatRoomId);
}
