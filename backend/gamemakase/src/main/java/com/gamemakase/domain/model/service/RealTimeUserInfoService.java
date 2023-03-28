package com.gamemakase.domain.model.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.gamemakase.domain.model.entity.User;
import com.gamemakase.domain.model.repository.UserRepository;
import com.gamemakase.domain.model.vo.UserInfoVo;
import com.gamemakase.global.Exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RealTimeUserInfoService {

	@Value("${steam.api.key}")
	private String steamApiKey;

	@Value("${steam.api.url}")
	private String steamApiUrlPrefix;

	private final Logger logger = LoggerFactory.getLogger(RealTimeUserInfoService.class);
	private final UserRepository userRepository;

	/***
	 * User info (유저 표시이름, 온라인여부, 이미지를 실시간으로 가져옵니다.)
	 * 그 중 유저 표시이름은 변경되었으면 db에 반영합니다.
	 * @param userList
	 * @return
	 * @throws IOException
	 * @throws ParseException
	 * @throws NotFoundException
	 */
	public List<UserInfoVo> getUserInfoResponseVo(List<User> userList) throws IOException, ParseException, NotFoundException {
		List<UserInfoVo> result = new ArrayList<UserInfoVo>();
		
		String userSteamIdsQuerys = "";
		for (User user : userList) {
			userSteamIdsQuerys += user.getUserSteamId() + ",";
		}
		
		String requestUriStr = UriComponentsBuilder
				.fromUriString(steamApiUrlPrefix + "/ISteamUser/GetPlayerSummaries/v0002/")
				.queryParam("key", steamApiKey)
				.queryParam("steamids", userSteamIdsQuerys)
				.build()
				.encode()
				.toUriString();

		URL requestUrl = new URL(requestUriStr);
		HttpURLConnection conn = getHttpURLConnection(requestUrl);
		int responseCode = conn.getResponseCode();
		boolean isSuccess = 200 <= responseCode && responseCode <= 300;
		String response = getResponse(conn, isSuccess);

		if (isSuccess) {
			JSONParser parser = new JSONParser();
			JSONObject totalInfoJson = (JSONObject) ((JSONObject) parser.parse(response)).get("response");
			JSONArray playerInfoJsons = (JSONArray) totalInfoJson.get("players");

			if (playerInfoJsons.size() == 0) {
				logger.error("조회되는 정보 없음");
			} else {
				for (int i = 0; i < playerInfoJsons.size(); i++) {
					JSONObject playerInfoJson = (JSONObject) playerInfoJsons.get(i);
					String realTimeUserName = playerInfoJson.get("personaname").toString();
					String steamId = playerInfoJson.get("steamid").toString();
					
					// steamId를 토대로 User 검사
					User user = userRepository.findByUserSteamId(Long.parseLong(steamId));
					// 지금 db name이 실시간 name정보와 다르면 db값을 변경
					if (!user.getUserName().equals(realTimeUserName)) {
						user.setUserName(realTimeUserName);
						userRepository.save(user);
					}
					result.add(UserInfoVo.builder()
							.userId(user.getUserId())
							.state(playerInfoJson.get("personastate").toString().equals("0") ? false : true)
							.userImagePath(playerInfoJson.get("avatar").toString())
							.userName(realTimeUserName).build());
				}
			}
		} else {
			logger.error("api 응답 실패");
		}
		return result;
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
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Content-type", "application/json");
		return conn;
	}
}
