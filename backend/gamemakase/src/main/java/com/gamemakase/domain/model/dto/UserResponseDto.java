package com.gamemakase.domain.model.dto;

import lombok.Data;

@Data
public class UserResponseDto {
  long userId;
  String userName;
  String userEmail;
  long SteamId;
  String imagePath;

}
