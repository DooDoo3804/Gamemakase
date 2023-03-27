package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.SignUpRequestDto;
import com.gamemakase.domain.model.dto.UserRequestDto;
import com.gamemakase.domain.model.entity.User;
import java.io.IOException;
import java.util.Map;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpHeaders;

public interface UserService {
    void signUp(SignUpRequestDto signUpRequestDto, long steamId, String name);

    boolean isUser(long steamId);
    Map<String, Object> login(long steamId);

    User getUserProfile(String accessToken);

    HttpHeaders getAccessTokenByRefreshToken(String refreshToken);

    String getUserName(String steamId) throws IOException, ParseException;

    void deleteUser(User user);
}
