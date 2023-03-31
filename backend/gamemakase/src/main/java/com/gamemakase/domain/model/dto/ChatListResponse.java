package com.gamemakase.domain.model.dto;

import com.gamemakase.domain.model.entity.MongoChat;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatListResponse {
  private long gameId;
  private long chatRoomId;
  private long writerId;
  private String writerName;
  private String content;

  public ChatListResponse(MongoChat entity) {
    this.chatRoomId = entity.getChatRoomId();
    this.writerId = entity.getWriterId();
    this.gameId = entity.getGameId();
    this.content = entity.getContent();
  }

  public static ChatListResponse of(MongoChat chat, String writerName) {
    return ChatListResponse.builder()
            .gameId(chat.getGameId())
            .chatRoomId(chat.getChatRoomId())
            .writerId(chat.getWriterId())
            .writerName(writerName)
            .content(chat.getContent())
            .build();
  }
}
