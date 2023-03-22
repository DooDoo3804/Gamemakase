package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.LoginRequestDto;
import com.gamemakase.domain.model.dto.SignUpRequestDto;
import com.gamemakase.domain.model.entity.User;
import com.gamemakase.domain.model.entity.UserDetails;
import java.util.Map;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService {
    void signUp(SignUpRequestDto signUpRequestDto, long steamId);

    boolean isUser(long steamId);
    Map<String, Object> login(LoginRequestDto requestDto);

    User getUserProfile(String accessToken);

    HttpHeaders getAccessTokenByRefreshToken(String refreshToken);



}
