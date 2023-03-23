package com.gamemakase.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
  @Override
  public void configureMessageBroker(MessageBrokerRegistry config){
    config.enableSimpleBroker("/sub");
    config.setApplicationDestinationPrefixes("/pub");
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    //the url is for Websocket handshake
    registry.addEndpoint("/ws")
        .setAllowedOriginPatterns("*");
//        .withSockJS();
    //=> apic로 테스트할 때는 주석처리, 프론트와 연동해서 테스트할 땐 주석 풀기
  }
}
