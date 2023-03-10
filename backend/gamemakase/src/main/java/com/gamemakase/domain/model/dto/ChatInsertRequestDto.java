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

  private long roomNum;
  private long sender;
  private long receiver;
  private String msg;

//  @Builder
//  public MongoChat toEntity() {
//    return MongoChat.builder()
//        .msg(msg)
//        .roomNum(roomNum)
//        .sender(sender)
//        .receiver(receiver)
//        .build();
//  }
}
