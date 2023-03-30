package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.SignUpRequestDto;
import com.gamemakase.domain.model.dto.UserResponseDto;
import com.gamemakase.domain.model.entity.Authority;
import com.gamemakase.domain.model.entity.Authority.AuthorityName;
import com.gamemakase.domain.model.entity.GameHistory;
import com.gamemakase.domain.model.entity.Recommendation;
import com.gamemakase.domain.model.entity.User;
import com.gamemakase.domain.model.repository.GameHistoryRepository;
import com.gamemakase.domain.model.repository.RecommendationRepository;
import com.gamemakase.domain.model.repository.UserRepository;
import com.gamemakase.domain.model.vo.UserInfoVo;
import com.gamemakase.global.Exception.DuplicatedException;
import com.gamemakase.global.Exception.NotFoundException;
import com.gamemakase.global.Exception.TokenValidFailedException;
import com.gamemakase.global.config.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Not;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.net.URLEncoder.encode;
import static java.nio.charset.StandardCharsets.UTF_8;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private final UserRepository userRepository;
    private final RecommendationRepository recommendationRepository;
    private final GameHistoryRepository gameHistoryRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private  final RealTimeUserInfoService realTimeUserInfoService;
    private final RealTimeGameHistoryService realTimeGameHistoryService;
    private final String ACCESS_HEADER = "accessToken";
    private final String REFRESH_HEADER = "refreshToken";
    static final String PLAYER_SUMMARIES_BASE_URL = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/";
    static final String RECENTLY_PLAYED_GAMES_URL = "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/";

    @Value("${steam.api.key}") String KEY;
    @Override
    public Map<String, Object> signUp(SignUpRequestDto signUpRequestDto, long steamId, String name) {
        User user = signUpRequestDto.toEntity(steamId, name);
        System.out.println(user.getUserId());
        System.out.println("이름 : " + user.getUserName());
        System.out.println("아이디 : " + user.getUserSteamId());
        if(userRepository.findByUserSteamId(user.getUserSteamId()) != null) {
            throw new DuplicatedException("이미 있는 유저입니다.");
        }

        Authority authority;
        if(user.getUserName().equals("ADMIN")) authority = new Authority(AuthorityName.ROLE_ADMIN);
        else authority = new Authority(AuthorityName.ROLE_USER);
        user.setAuthority(authority);
        userRepository.save(user);

        String accessToken = jwtTokenProvider.createAccessToken(user);
        String refreshToken = jwtTokenProvider.createRefreshToken(user);

        return new HashMap<>() {{
            put("userId", user.getUserId());
            put("steamId", user.getUserSteamId());
            put("accessToken", accessToken);
            put("refreshToken", refreshToken);
            put("name", user.getUserName());
            put("role", user.getAuthority());
        }};

    }

    @Override
    public boolean isUser(long steamId) {
        User user = userRepository.findByUserSteamId(steamId);
        System.out.println(user);
        if(user != null) return true;
        else return false;
    }

    @Override
    public Map<String, Object> login(long SteamId) {
        User user = userRepository.findByUserSteamId(SteamId);
        System.out.println("user : " + user);

        String accessToken = jwtTokenProvider.createAccessToken(user);
        String refreshToken = jwtTokenProvider.createRefreshToken(user);

        System.out.println("엑세스 토큰 : " + accessToken);
        System.out.println("리프레시 토큰 : " + accessToken);

        logger.info("토큰 재발급 ");
        logger.info("ACCESS : {}",accessToken);
        logger.info("REFRESH : {}", refreshToken);
        logger.info("user UID : {}", user.getUserId());
        logger.info("user SteamId : {}", user.getUserSteamId());
        logger.info("save refresh token");

        return new HashMap<>() {{
            put("userId", user.getUserId());
            put("steamId", user.getUserSteamId());
            put("accessToken", accessToken);
            put("refreshToken", refreshToken);
            put("name", user.getUserName());
            put("role", user.getAuthority());
        }};
    }

    @Override
    public UserResponseDto getUserProfile(String accessToken) throws IOException, ParseException, NotFoundException, TokenValidFailedException {
        String userIdstr = jwtTokenProvider.getUserId(accessToken);
        long userId = Long.parseLong(userIdstr);
        User user = userRepository.findByUserId(userId);
        List<User> userList = new ArrayList<>();
        userList.add(user);
        List<UserInfoVo> realUserList = realTimeUserInfoService.getUserInfoResponseVo(userList);
        realTimeGameHistoryService.insertUserGameHistory(accessToken);

        // gameHistory가 있는데 recommendation이 없으면 django요청이 필요하다는 respoinse를 추가 응답합니다.
        boolean djangoRequest = false;
        List<GameHistory> gameHistory = gameHistoryRepository.findAllByUser(user);
        if (gameHistory.size() > 0) {
            List<Recommendation> recommendations = recommendationRepository.findAllByUser(user);
            if (recommendations.size() == 0) {
                djangoRequest = true;
            }
        }
        return UserResponseDto.of(user, realUserList.get(0).getUserImagePath(), djangoRequest);
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

    @Override
    public String getUserName(String steamId) throws IOException, ParseException {
        StringBuilder urlBuilder = new StringBuilder();
        urlBuilder
            .append(PLAYER_SUMMARIES_BASE_URL)
            .append("?").append(encode("key", UTF_8)).append("=").append(KEY)
            .append("&").append(encode("steamids", UTF_8)).append("=").append(steamId);

        URL url = new URL(urlBuilder.toString());
        System.out.println(url);
        HttpURLConnection conn = getHttpURLConnection(url);

        int responseCode = conn.getResponseCode();
        boolean isSuccess = 200 <= responseCode && responseCode <= 300;
        String response = getResponse(conn, isSuccess);
        System.out.println(response);

        if(isSuccess) {
            JSONParser parser = new JSONParser();
            JSONObject totalInfoJson = (JSONObject) ((JSONObject) parser.parse(response)).get("response");
            System.out.println(totalInfoJson.toString());
            JSONArray playerInfoJsons = (JSONArray) totalInfoJson.get("players");
            System.out.println(playerInfoJsons);

            if (playerInfoJsons.size() == 0) {
                throw new NullPointerException("ID값 없어");
            }
            JSONObject playerInfoJson = (JSONObject) playerInfoJsons.get(0);

            return playerInfoJson.get("personaname").toString();
        }
       else {
           return null;
        }
    }

    @Override
    public String getWriterName(long userId) throws NotFoundException {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("user 정보를 조회할 수 없습니다."));
        return user.getUserName();
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
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
