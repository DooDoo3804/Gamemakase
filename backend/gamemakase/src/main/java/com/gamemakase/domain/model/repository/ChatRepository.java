package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.MongoChat;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;

public interface ChatRepository extends MongoRepository<MongoChat, String> {

  MongoChat findBySeq(String seq);
  MongoChat findTopByOrderByCreatedAtDesc();

  List<MongoChat> findByGameIdAndChatRoomId(long gameId, long chatRoomId);

  MongoChat findByChatRoomId(long chatRoomId);

  List<MongoChat> findBychatRoomIdOrderByCreatedAtDesc(Long chatRoomId);
}
