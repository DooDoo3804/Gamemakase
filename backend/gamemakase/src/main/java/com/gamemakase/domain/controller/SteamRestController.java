package com.gamemakase.domain.controller;

import com.gamemakase.domain.model.dto.GameHistoryResponseDto;
import com.gamemakase.domain.model.entity.User;
import com.gamemakase.domain.model.service.GameService;
import com.gamemakase.domain.model.service.UserService;
import com.gamemakase.global.Exception.NotFoundException;
import com.gamemakase.global.Exception.TokenValidFailedException;
import io.swagger.annotations.Api;
import io.swagger.models.auth.In;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import java.util.Map;
import static java.net.URLEncoder.encode;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.openid4java.association.AssociationException;
import org.openid4java.consumer.ConsumerException;
import org.openid4java.consumer.ConsumerManager;
import org.openid4java.consumer.VerificationResult;
import org.openid4java.discovery.DiscoveryException;
import org.openid4java.discovery.DiscoveryInformation;
import org.openid4java.discovery.Identifier;
import org.openid4java.message.AuthRequest;
import org.openid4java.message.MessageException;
import org.openid4java.message.ParameterList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.spring.web.json.Json;

import static java.nio.charset.StandardCharsets.UTF_8;

@RestController
@RequiredArgsConstructor
@Api(value = "Steam Rest Controller")
public class SteamRestController{
  static final String RECENTLY_PLAYED_GAMES_URL = "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/";
  static final String KEY = "5CD56CE3B454EDB2502D85A6C39E55D0";

  private final GameService gameService;
  private final UserService userService;

  // User의 각 게임 별 플레이 시간 등록
  @PostMapping(value = "/auth/user/play-record")
  private void newRecentlyPlayedGames(@RequestHeader(value = "accessToken", required = true) String token, Authentication authentication)
      throws NullPointerException, IOException, ParseException, NotFoundException, TokenValidFailedException {

    User user = (User) authentication.getPrincipal();

    long steamIdLong = user.getUserSteamId();
    String steamId = String.valueOf(steamIdLong);

    System.out.println("user id : " + user.getUserId());
    System.out.println("uyser steamid : " + user.getUserSteamId());
    StringBuilder urlBuilder = new StringBuilder();
    urlBuilder
        .append(RECENTLY_PLAYED_GAMES_URL)
        .append("?").append(encode("key", UTF_8)).append("=").append(KEY)
        .append("&").append(encode("steamid", UTF_8)).append("=").append(steamId)
        .append("&").append("format").append("=").append("json");

    URL gameUrl = new URL(urlBuilder.toString());
    System.out.println(gameUrl);
    HttpURLConnection conn = getHttpURLConnection(gameUrl);

    int responseCode = conn.getResponseCode();
    boolean isSuccess = 200 <= responseCode && responseCode <= 300;
    String response = getResponse(conn, isSuccess);
    System.out.println("response : " + response);

    if (isSuccess) {

      JSONParser parser = new JSONParser();
      JSONObject totalInfoJson = (JSONObject) ((JSONObject) parser.parse(response)).get("response");
      System.out.println("totalinfo : " + totalInfoJson.toString());
      JSONArray gamesInfoJsons = (JSONArray) totalInfoJson.get("games");
      System.out.println("gameInfo : " + gamesInfoJsons);

      if (gamesInfoJsons.size() == 0) {
        throw new NullPointerException("게임정보 없어");
      }

      for(int i=0; i<gamesInfoJsons.size(); i++){
        JSONObject gameIdInfoJson = (JSONObject) gamesInfoJsons.get(i);
        long game_total_time = (Long) gameIdInfoJson.get("playtime_forever"); // 각 게임의 총 플레이 시간
        long game_2weeks_time = (Long) gameIdInfoJson.get("playtime_2weeks"); // 각 게임의 2주간 플레이 시간
        long gameId = (Long) gameIdInfoJson.get("appid");                     // 게임의 고유 id

        gameService.insertGameHistory((int) game_total_time, (int) game_2weeks_time, gameId, token);
      }
    }
  }

  @GetMapping(value = "/auth/user/play-record")
  private ResponseEntity<List<GameHistoryResponseDto>> getRecentlyPlayedGames(@RequestHeader(value = "accessToken") String token, Authentication authentication)
      throws NotFoundException {
    User user = (User) authentication.getPrincipal();

    List<GameHistoryResponseDto> results = gameService.getGameHistory(token);
    return new ResponseEntity<>(results, HttpStatus.OK);
  }

  private static String getResponse(HttpURLConnection conn, boolean isSuccess) throws IOException {

    BufferedReader br;
    if (isSuccess) {
      br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
    } else {
      br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
    }

    StringBuilder sb = new StringBuilder();
    String line;
    while ((line = br.readLine()) != null) {
      sb.append(line);
    }

    conn.disconnect();
    br.close();

    return sb.toString();
  }

  private static HttpURLConnection getHttpURLConnection(URL url) throws IOException {
    // 커넥션 객체 생성
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();

    // HTTP 메서드 설정
    conn.setRequestMethod("GET");

    // Content Type 설정
    conn.setRequestProperty("Content-type", "application/json");

    return conn;
  }

}
