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

  @Builder
  public MongoChat toEntity() {
    return MongoChat.builder()
        .content(content)
        .chatRoomId(chatRoomId)
        .writerId(writerId)
        .gameId(gameId)
        .build();
  }
}
