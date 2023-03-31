package com.gamemakase.domain.model.dto;

import com.gamemakase.domain.model.entity.MongoChat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatInsertRequestDto {

  private long chatRoomId;
  private long writerId;
  private long gameId;
  private String content;

  private String writerName;

  @Builder
  public MongoChat toEntity(String writerName) {
    return MongoChat.builder()
        .content(content)
        .chatRoomId(chatRoomId)
        .writerId(writerId)
        .writerName(writerName)
        .gameId(gameId)
        .build();
  }
}
