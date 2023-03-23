package com.gamemakase.domain.model.dto;

import com.gamemakase.domain.model.entity.Authority;
import com.gamemakase.domain.model.entity.Authority.AuthorityName;
import com.gamemakase.domain.model.entity.User;
import lombok.Builder;
import lombok.Data;

@Data
public class SignUpRequestDto {

    Long userSteamId;

    String userName;
    AuthorityName authority;

    public User toEntity(long steamId) {
        return User.builder()
                .userSteamId(steamId)
                .userName("ADMIN")
                .build();
    }
}
