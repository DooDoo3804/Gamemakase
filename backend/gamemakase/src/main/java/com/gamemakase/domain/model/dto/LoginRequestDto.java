package com.gamemakase.domain.model.dto;

import com.gamemakase.domain.model.entity.User;
import lombok.Data;

@Data
public class LoginRequestDto {
    String userEmail;

    String userPassword;

    public User toEntity() {
        return User.builder()
                .userEmail(this.userEmail)
                .userPassword(this.userPassword)
                .build();
    }
}
