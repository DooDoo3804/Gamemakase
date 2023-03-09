package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.MongoChat;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;

public interface ChatRepository extends ReactiveMongoRepository<MongoChat, String> {
  @Tailable
  @Query("{sender: ?0, receiver: ?1}")
  Flux<MongoChat> mFindBySender(String sender, String receiver);

  @Tailable
  @Query("{roomNum: ?0}")
  Flux<MongoChat> mFindByRoomNum(Integer roomNum);
}
