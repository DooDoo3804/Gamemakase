package com.gamemakase.domain.controller;

import com.gamemakase.domain.model.entity.Chat;
import com.gamemakase.domain.model.entity.MongoChat;
import com.gamemakase.domain.model.repository.ChatRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@RequiredArgsConstructor
@RestController
public class chatRestController {

  private final ChatRepository chatRepository;
  @PostMapping("/chat")
  public Mono<MongoChat> setMsg(@RequestBody MongoChat mongoChat) {
    System.out.println(mongoChat);
    mongoChat.setCreatedAt(LocalDateTime.now());
    return chatRepository.save(mongoChat);
  }

  @CrossOrigin
  @GetMapping(value = "/sender/{sender}/receiver/{receiver}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public Flux<MongoChat> getMsg(@PathVariable String sender, @PathVariable String receiver){
    return chatRepository.mFindBySender(sender, receiver).subscribeOn(Schedulers.boundedElastic());
  }

  @CrossOrigin
  @GetMapping(value = "chats/chatrooms/{roomNum}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public Flux<MongoChat> findByRoomNum(@PathVariable Integer roomNum) {
    return chatRepository.mFindByRoomNum(roomNum).subscribeOn(Schedulers.boundedElastic());
  }
}
