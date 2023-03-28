package com.gamemakase.domain.model.dto;

import com.gamemakase.domain.model.entity.User;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserResponseDto {
    long userId;
    String userName;
    String userSteamId;
    String imagePath;

    public static UserResponseDto of(User user, String imagePath) {
        return UserResponseDto.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .userSteamId(String.valueOf(user.getUserSteamId()))
                .imagePath(imagePath)
                .build();
    }
}
