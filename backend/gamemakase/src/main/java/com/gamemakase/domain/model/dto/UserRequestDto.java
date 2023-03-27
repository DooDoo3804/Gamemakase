package com.gamemakase.domain.model.dto;

import com.gamemakase.domain.model.entity.User;
import lombok.Data;

@Data
public class UserRequestDto {
  long userId;
  String userName;
  long SteamId;
  String imagePath;

  public User toEntity(long SteamId) {
    return User.builder()
        .userSteamId(SteamId)
        .build();
  }
}
