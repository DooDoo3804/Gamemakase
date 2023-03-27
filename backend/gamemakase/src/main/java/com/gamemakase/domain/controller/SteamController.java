package com.gamemakase.domain.controller;

import static java.net.URLEncoder.encode;
import static java.nio.charset.StandardCharsets.UTF_8;

import com.gamemakase.domain.model.dto.SignUpRequestDto;
import com.gamemakase.domain.model.dto.UserRequestDto;
import com.gamemakase.domain.model.service.UserService;
import com.gamemakase.global.config.jwt.JwtTokenProvider;
import io.swagger.annotations.Api;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.util.Map;
import javax.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.openid4java.consumer.ConsumerManager;
import org.openid4java.message.ParameterList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;

@RestController
@Api(value = "Steam Controller")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class SteamController {


    private ConsumerManager consumerManager = new ConsumerManager();
    private static final Logger logger = LoggerFactory.getLogger(SteamController.class);
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/api/login/steam") // 스팀 로그인 이미지랑 연동
    public void steamLogin(HttpServletResponse response) throws IOException{
//        String steamLoginUrl = "https://steamcommunity.com/openid/login?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=http://localhost:8080&openid.return_to=http://localhost:8080/login/steam/callback";
//        String steamLoginUrl = "http://steamcommunity.com/openid/login?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=http://localhost:8080&openid.return_to=http://localhost:8080/api/login/steam/callback";
        String steamLoginUrl = "http://steamcommunity.com/openid/login?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=http://gamemakase.com&openid.return_to=http://gamemakase.com/api/login/steam/callback";

        System.out.println("여긴 들어왔다.");
        response.sendRedirect(steamLoginUrl);
    }

    @GetMapping("/api/login/steam/callback")
    public ResponseEntity<?> steamLoginCallBack(HttpServletRequest request, HttpServletResponse response, SignUpRequestDto signUpRequestDto, UserRequestDto userRequestDto) throws Exception {

        ParameterList res = new ParameterList(request.getParameterMap());
        System.out.println("여기도 되나?");

        HttpHeaders headers = new HttpHeaders();

        String steamId = res.getParameters().get(4).toString().substring(53);
        long steamIdNum = Long.parseLong(steamId);
        System.out.println("steamid 받았어?");

        if (userService.isUser(steamIdNum)) {
            //로그인
            Map<String, Object> token = userService.login(steamIdNum);
            String access_token = (String) token.get("access-token");
            jwtTokenProvider.validateToken(access_token);
            System.out.println(access_token);
            headers.setLocation(URI.create("http://localhost:3000/login"));
//            headers.set("access-token", access_token);
            Cookie cookie = new Cookie("access-token", access_token);
            cookie.setPath("/");
            cookie.setMaxAge(60*60*24);

            response.addCookie(cookie);
            return new ResponseEntity<Object>(headers, HttpStatus.MOVED_PERMANENTLY);
        } else {
            //회원가입
            String name = userService.getUserName(steamId);
            userService.signUp(signUpRequestDto, steamIdNum, name);
            System.out.println("회원가입도 왔지?");
            headers.setLocation(URI.create("https://localhost:3000/login"));
            return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
        }
    }


}
