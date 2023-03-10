package com.gamemakase.domain.model.dto;

import com.gamemakase.domain.model.entity.User;
import lombok.Data;

@Data
public class SignUpRequestDto {

    String userEmail;

    String userPassword;

    Long userSteamId;

    String userName;

    public User toEntity() {
        return User.builder()
                .userEmail(this.userEmail)
                .userPassword(this.userPassword)
                .userSteamId(this.userSteamId)
                .userName(this.userName)
                .build();
    }
}
