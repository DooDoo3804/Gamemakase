package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.GameHistoryInsertRequestDto;
import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.entity.GameHistory;
import com.gamemakase.domain.model.entity.User;
import com.gamemakase.domain.model.repository.GameHistoryRepository;
import com.gamemakase.domain.model.repository.GameRepository;
import com.gamemakase.global.Exception.NotFoundException;
import com.gamemakase.global.Exception.TokenValidFailedException;
import com.gamemakase.global.config.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RealTimeGameHistoryService {

    @Value("${steam.api.key}")
    private String steamApiKey;
    @Value("${steam.api.url}")
    private String steamApiUrlPrefix;
    private static final String GET_OWNED_GAMES_URL = "/IPlayerService/GetOwnedGames/v0001/";
    private final Logger logger = LoggerFactory.getLogger(RealTimeGameHistoryService.class);
    private final JwtTokenProvider jwtTokenProvider;
    private final GameRepository gameRepository;
    private final GameHistoryRepository gameHistoryRepository;
    public void insertUserGameHistory(String token, Authentication authentication)
            throws NullPointerException, IOException, ParseException, NotFoundException, TokenValidFailedException {
        User user = (User) authentication.getPrincipal();
        String steamId = String.valueOf(user.getUserSteamId());
        logger.info("게임 기록을 조회할 user info : {}", user);

        String requestUriStr = UriComponentsBuilder
                .fromUriString(steamApiUrlPrefix + GET_OWNED_GAMES_URL)
                .queryParam("key", steamApiKey)
                .queryParam("steamid", steamId)
                .build()
                .encode()
                .toUriString();

        URL requestUrl = new URL(requestUriStr);
        HttpURLConnection conn = getHttpURLConnection(requestUrl);
        int responseCode = conn.getResponseCode();
        boolean isSuccess = 200 <= responseCode && responseCode <= 300;
        String response = getResponse(conn, isSuccess);
        logger.info("response : {}", response);

        if (isSuccess) {
            JSONParser parser = new JSONParser();
            JSONObject totalInfoJson = (JSONObject) ((JSONObject) parser.parse(response)).get("response");
            JSONArray gamesInfoJsons = (JSONArray) totalInfoJson.get("games");

            if (gamesInfoJsons == null || gamesInfoJsons.size() == 0) {
                logger.debug("조회되는 게임 정보 없음");
            } else {
                for (int i = 0; i < gamesInfoJsons.size(); i++) {
                    JSONObject gameIdInfoJson = (JSONObject) gamesInfoJsons.get(i);
                    int game_total_time = Integer.parseInt(String.valueOf(gameIdInfoJson.get("playtime_forever"))); // 각 게임의 총 플레이 시간
                    //long game_2weeks_time = (Long) gameIdInfoJson.get("playtime_2weeks"); // 각 게임의 2주간 플레이 시간
                    long gameId = (Long) gameIdInfoJson.get("appid");                // 게임의 고유 id
                    Game game = gameRepository.findById(gameId).orElse(null);
                    Optional<GameHistory> optionalGameHistory = gameHistoryRepository.findByUserAndGame(user, game);
                    if (optionalGameHistory.isPresent()) {
                        GameHistory gameHistory = optionalGameHistory.get();
                        gameHistory.setTotalPlayGame(game_total_time);
                        gameHistoryRepository.save(gameHistory);
                    } else {
                        GameHistory gameHistory = GameHistoryInsertRequestDto.toEntity(game_total_time, game, user);
                        if(game != null) gameHistoryRepository.save(gameHistory);
                    }
                }
            }
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
}
