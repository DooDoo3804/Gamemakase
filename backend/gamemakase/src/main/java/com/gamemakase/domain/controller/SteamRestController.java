package com.gamemakase.domain.controller;

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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.nio.charset.StandardCharsets.UTF_8;

@RestController
@RequiredArgsConstructor
public class SteamRestController{
  static final String PLAYER_SUMMARIES_BASE_URL = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/";
//  static final String KEY = "5CD56CE3B454EDB2502D85A6C39E55D0";
  static final String KEY = "C148F5B21C5FBC3BB556671569985F8C";
  private static final String STEAM_OPENID = "http://steamcommunity.com/openid";
  @PostMapping(value = "/member/{steamID}")
  public static JSONArray getMemberData(@PathVariable("steamID") String steamID) throws NullPointerException, IOException, ParseException {
    Map<String, Object> responseData = new HashMap<>();
    StringBuilder urlBuilder = new StringBuilder();
    urlBuilder
        .append(PLAYER_SUMMARIES_BASE_URL)
        .append("?").append(encode("key", UTF_8)).append("=").append(KEY)
        .append("&").append(encode("steamids", UTF_8)).append("=").append(steamID);

    URL url = new URL(urlBuilder.toString());
    System.out.println(url);
    HttpURLConnection conn = getHttpURLConnection(url);

    int responseCode = conn.getResponseCode();
    boolean isSuccess = 200 <= responseCode && responseCode <= 300;
    String response = getResponse(conn, isSuccess);
    System.out.println(response);

    if (isSuccess) {
      System.out.println("성공이다!");
      JSONParser parser = new JSONParser();
      JSONObject totalInfoJson = (JSONObject) ((JSONObject) parser.parse(response)).get("response");
      System.out.println(totalInfoJson.toString());
      JSONArray playerInfoJsons = (JSONArray) totalInfoJson.get("players");
      System.out.println(playerInfoJsons);

      if (playerInfoJsons.size() == 0) {
        throw new NullPointerException("ID값 없어");
      }
      JSONObject playerInfoJson = (JSONObject) playerInfoJsons.get(0);
      System.out.println(playerInfoJson.toString());
      return playerInfoJsons;
//
//      responseData.put("steamNickname", playerInfoJson.get("personaname"));
//      responseData.put("avatarUrl", playerInfoJson.get("avatarfull"));
//      System.out.println(responseData);
    } else {
//      throw new CustomException("[Error] api connection url : " + urlBuilder, ErrorStatus.API_NOT_CONNECTION);
      return null;
    }
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
  private static HttpURLConnection postHttpURLConnection(URL url) throws IOException {
    // 커넥션 객체 생성
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();

    // HTTP 메서드 설정
    conn.setRequestMethod("POST");

    // Content Type 설정
    conn.setRequestProperty("Content-type", "application/json");

    return conn;
  }

}
