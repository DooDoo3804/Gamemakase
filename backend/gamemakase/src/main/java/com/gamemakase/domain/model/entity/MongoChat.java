package com.gamemakase.domain.model.entity;

import java.time.LocalDateTime;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Getter
@NoArgsConstructor
@Document(collection = "chat")
public class MongoChat {
  @Id
  @Field(value = "_id", targetType = FieldType.OBJECT_ID)
  private String seq;
  private String content;
  private long writerId;
  private long gameId;
  private long chatRoomId;
  @CreatedDate
  private LocalDateTime createdAt;

  @Builder
  public MongoChat(String content, long chatRoomId, long writerId, long gameId){
    this.content = content;
    this.chatRoomId = chatRoomId;
    this.writerId = writerId;
    this.gameId = gameId;
  }
}
