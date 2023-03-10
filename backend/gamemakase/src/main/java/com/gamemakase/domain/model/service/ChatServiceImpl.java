package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.ChatInsertRequestDto;
import com.gamemakase.domain.model.entity.MongoChat;
import com.gamemakase.domain.model.repository.ChatRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{
  private final ChatRepository chatRepository;

  @Override
  public MongoChat findBySeq(String seq){
    return chatRepository.findBySeq(seq);
  }

  @Override
  public String insertChat(ChatInsertRequestDto requestDto) {
    MongoChat chat = MongoChat.builder()
        .roomNum(requestDto.getRoomNum())
        .receiver(requestDto.getReceiver())
        .sender(requestDto.getSender())
        .msg(requestDto.getMsg())
        .build();

    MongoChat insert = chatRepository.insert(chat);

    return insert.getSeq();
  }

  @Override
  public List<MongoChat> findByRoomNumOrderByCreatedAtDesc(Long roomNum){
    return chatRepository.findByRoomNumOrderByCreatedAtDesc(roomNum);
  }
}
