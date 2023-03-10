package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.ChatInsertRequestDto;
import com.gamemakase.domain.model.entity.MongoChat;
import java.util.List;

public interface ChatService {

  MongoChat findBySeq(String seq);
  String insertChat(ChatInsertRequestDto requestDto);
  List<MongoChat> findByRoomNumOrderByCreatedAtDesc(Long roomNum);

}
