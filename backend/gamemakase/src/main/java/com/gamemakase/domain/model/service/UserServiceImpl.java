package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.SignUpRequestDto;
import com.gamemakase.domain.model.entity.Authority;
import com.gamemakase.domain.model.entity.Authority.AuthorityName;
import com.gamemakase.domain.model.entity.User;
import com.gamemakase.domain.model.repository.UserRepository;
import com.gamemakase.global.Exception.DuplicatedException;
import com.gamemakase.global.config.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final String ACCESS_HEADER = "accessToken";
    private final String REFRESH_HEADER = "refreshToken";
    @Override
    public void signUp(SignUpRequestDto signUpRequestDto, long steamId) {
        User user = signUpRequestDto.toEntity(steamId);
        if(userRepository.findByUserEmail(user.getUserEmail()) != null || userRepository.findByUserSteamId(user.getUserSteamId()) != null) {
            throw new DuplicatedException("이미 있는 유저입니다.");
        }

        Authority authority;
        if(user.getUserName().equals("ADMIN")) authority = new Authority(AuthorityName.ROLE_ADMIN);
        else authority = new Authority(AuthorityName.ROLE_USER);
        user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
        user.setAuthority(authority);
        userRepository.save(user);
    }

    @Override
    public boolean isUser(long steamId) {
        User user = userRepository.findByUserSteamId(steamId);
        System.out.println(user);
        if(user != null) return true;
        else return false;
    }

    @Override
    public HttpHeaders getHttpHeaders(User user, String token) {
        String accessToken = jwtTokenProvider.createAccessToken(user);
        String refreshToken = token;
        if(token == null) {
            refreshToken = jwtTokenProvider.createRefreshToken(user);
        }
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(ACCESS_HEADER, "Bearer " + accessToken);
        httpHeaders.add(REFRESH_HEADER, "Bearer " + refreshToken);

        logger.info("토큰 재발급 ");
        logger.info("ACCESS : {}",accessToken);
        logger.info("REFRESH : {}", refreshToken);
        logger.info("user UID : {}", user.getUserId());
        logger.info("save refresh token");
        return httpHeaders;
    }

    @Override
    public User getUserProfile(String accessToken) {
        Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
        String userId = authentication.getName();
        User user = userRepository.findByUserId(Long.parseLong(userId));
        return user;
    }

    @Override
    public HttpHeaders getAccessTokenByRefreshToken(String refreshToken) {
        Authentication authentication = jwtTokenProvider.getAuthentication(refreshToken);
        String userId = authentication.getName();
        User user = userRepository.findByUserId(Long.parseLong(userId));
        HttpHeaders httpHeaders = new HttpHeaders();
        if(user != null) {
            String accessToken = jwtTokenProvider.createAccessToken(user);
            httpHeaders.add(ACCESS_HEADER, "Bearer " + accessToken);
        }
        return httpHeaders;
    }
}
