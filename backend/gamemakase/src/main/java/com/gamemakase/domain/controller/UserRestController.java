package com.gamemakase.domain.controller;

import com.gamemakase.domain.model.dto.UserResponseDto;
import com.gamemakase.domain.model.entity.User;
import com.gamemakase.domain.model.repository.UserRepository;
import com.gamemakase.domain.model.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;

import javax.servlet.http.HttpServletRequest;

@RestController
@Api(value = "User Controller")
@RequiredArgsConstructor
public class UserRestController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원가입
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "OK"),
//            @ApiResponse(code = 400, message = "ERROR")
//    })
//    @PostMapping("/api/user/join")
//    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDto signUpRequestDto) {
//        User user = userService.signUp(signUpRequestDto);
//        System.out.println("회원가입 완료");
//        System.out.println(user.toString());
//        return ResponseEntity.status(201).build();
//    }

    // 로그인
//    @PostMapping("/api/user/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto) {
//        System.out.println("여기옴");
//        User user = userRepository.findByUserEmail(loginRequestDto.getUserEmail());
//        if(user == null || !passwordEncoder.matches(loginRequestDto.getUserPassword(), user.getUserPassword())) {
//            return ResponseEntity.status(401).build();
//        }
////        HttpHeaders httpHeaders = userService.getHttpHeaders(user, null);
//        return ResponseEntity.status(200).headers(httpHeaders).build();
//    }

    // Acees Token을 통하여 회원 정보 조회
    @GetMapping("/auth/user")
    public ResponseEntity<?> getUserProfile(HttpServletRequest httpServletRequest) {
        String accessToken = httpServletRequest.getHeader("accessToken").substring(7);
        System.out.println("Request : " + httpServletRequest.getHeader("access-token").substring(7));
        System.out.println("user token : " + accessToken);
        User user = userService.getUserProfile(accessToken);
        return ResponseEntity.status(200).body(user);
    }

    // Refresh Token을 통하여 Access Token 재발급
    @PostMapping("/api/refresh-token")
    public ResponseEntity<?> getAccessToken(HttpServletRequest httpServletRequest) {
        String refreshToken = httpServletRequest.getHeader("refreshToken").substring(7);
        HttpHeaders httpHeaders = userService.getAccessTokenByRefreshToken(refreshToken);
        return ResponseEntity.status(200).headers(httpHeaders).build();
    }
}
