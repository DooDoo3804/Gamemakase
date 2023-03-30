package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.ChatInsertRequestDto;
import com.gamemakase.domain.model.entity.MongoChat;
import com.gamemakase.domain.model.mongoRepository.ChatRepository;
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
  public MongoChat findByChatRoomId(long chatRoomId) {
    return chatRepository.findByChatRoomId(chatRoomId);
  }

  @Override
  public String insertChat(ChatInsertRequestDto requestDto, String writerName) {
    MongoChat chat = MongoChat.builder()
        .chatRoomId((int) requestDto.getChatRoomId())
        .writerId((int) requestDto.getWriterId())
        .gameId((int) requestDto.getGameId())
        .content(requestDto.getContent())
        .writerName(writerName)
        .build();

    MongoChat insert = chatRepository.insert(chat);

    return insert.getSeq();
  }

  @Override
  public List<MongoChat> findByRoomNumOrderByCreatedAtDesc(Long chatRoomId){
    return chatRepository.findBychatRoomIdOrderByCreatedAtDesc(chatRoomId);
  }

  @Override
  public List<MongoChat> findByGameIdAndChatRoomId(long gameId, long chatRoomId) {
    return chatRepository.findByGameIdAndChatRoomId(gameId, chatRoomId);
  }
}
