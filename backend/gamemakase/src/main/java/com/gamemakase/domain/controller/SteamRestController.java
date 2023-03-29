package com.gamemakase.domain.controller;

import com.gamemakase.domain.model.dto.GameHistoryResponseDto;
import com.gamemakase.domain.model.entity.User;
import com.gamemakase.domain.model.service.GameService;
import com.gamemakase.domain.model.service.RealTimeGameHistoryService;
import com.gamemakase.domain.model.service.UserService;
import com.gamemakase.global.Exception.NotFoundException;
import com.gamemakase.global.Exception.TokenValidFailedException;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import static java.net.URLEncoder.encode;
import static java.nio.charset.StandardCharsets.UTF_8;

@RestController
@RequiredArgsConstructor
@Api(value = "Steam Rest Controller")
public class SteamRestController {


    private final GameService gameService;
    private final RealTimeGameHistoryService realTimeGameHistoryService;

    // User의 각 게임 별 플레이 시간 등록
    @PostMapping(value = "/auth/user/play-record")
    private void newRecentlyPlayedGames(@RequestHeader(value = "accessToken", required = true) String token, Authentication authentication)
            throws NullPointerException, IOException, ParseException, NotFoundException, TokenValidFailedException {
        realTimeGameHistoryService.insertUserGameHistory(token, authentication);
    }

    @GetMapping(value = "/auth/user/play-record")
    private ResponseEntity<List<GameHistoryResponseDto>> getRecentlyPlayedGames(@RequestHeader(value = "accessToken") String token, Authentication authentication)
            throws NotFoundException {
        User user = (User) authentication.getPrincipal();

        List<GameHistoryResponseDto> results = gameService.getGameHistory(token);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

}
