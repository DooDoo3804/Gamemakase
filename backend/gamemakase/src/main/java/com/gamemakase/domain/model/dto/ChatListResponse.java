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
  private Long sender;
  private Long roomNum;

  private Long receiver;

  private String msg;

  public ChatListResponse(MongoChat entity){
    this.sender = entity.getSender();
    this.receiver = entity.getReceiver();
    this.msg = entity.getMsg();
    this.roomNum = entity.getRoomNum();
  }
}
