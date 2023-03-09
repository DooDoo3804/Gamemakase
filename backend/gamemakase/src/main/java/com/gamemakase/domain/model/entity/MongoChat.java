package com.gamemakase.domain.model.entity;

import java.time.LocalDateTime;
import javax.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "chat")
public class MongoChat {
  @Id
  private String id;
  private String msg;
  private String sender;
  private String receiver;
  private Integer roomNum;
  private String roomTitle;

  private LocalDateTime createdAt;
}
