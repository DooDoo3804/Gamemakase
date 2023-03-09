package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.SignUpRequestDto;
import com.gamemakase.domain.model.entity.User;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;

public interface UserService {
    User signUp(SignUpRequestDto signUpRequestDto);

    HttpHeaders getHttpHeaders(User user, String token);

    User getUserProfile(String accessToken);

    HttpHeaders getAccessTokenByRefreshToken(String refreshToken);
}
