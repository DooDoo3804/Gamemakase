package com.gamemakase.domain.controller;

import com.gamemakase.domain.model.dto.ProfileInfoResponseDto;
import com.gamemakase.domain.model.dto.ProfileReviewsResponseDto;
import com.gamemakase.domain.model.service.ProfileService;
import com.gamemakase.domain.model.vo.GameInfoVo;
import com.gamemakase.global.Exception.NotFoundException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@Api(value = "프로필 페이지 관련 컨트롤러")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class ProfileRestContoller {

	private final Logger logger = LoggerFactory.getLogger(ProfileRestContoller.class);
	private final ProfileService profileService;

	@ApiOperation(value = "개인의 게임통계 및 스크랩 게임 리스트", notes = "개인 profile 페이지의 main탭 요청에 대한 응답")
	@GetMapping
	public ResponseEntity<ProfileInfoResponseDto> getProfile(
			@RequestParam(required = true) @ApiParam(required = true) long userId,
			@RequestParam(required = true) @ApiParam(required = true) int pageNo) throws IOException, ParseException, NotFoundException {
		logger.info("get mapping, userId : {}", userId);
		ProfileInfoResponseDto result = profileService.getProfile(userId, pageNo);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@ApiOperation(value = "스크랩 게임 리스트", notes = "개인 profile 페이지의 main탭 속 스크랩한 리스트에 대한 요청에 대한 응답")
	@GetMapping("/scraps")
	public ResponseEntity<List<GameInfoVo>> getScrap(
			@RequestParam(required = true) @ApiParam(required = true) long userId,
			@RequestParam(required = true) @ApiParam(required = true) int pageNo) throws IOException, ParseException, NotFoundException {
		logger.info("get mapping, userId : {}", userId);
		List<GameInfoVo> result = profileService.getScrap(userId, pageNo);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@ApiOperation(value = "해당 유저가 작성한 리뷰 리스트", notes = "개인 profile 페이지의 review탭 요청에 대한 응답")
	@GetMapping("/reviews")
	public ResponseEntity<ProfileReviewsResponseDto> getReviews(
			@RequestParam(required = true) @ApiParam(required = true) long userId,
			@RequestParam(required = true) @ApiParam(required = true) int pageNo) {
		logger.info("get reviews mapping, userId, pageNo : {}", userId, pageNo);
		ProfileReviewsResponseDto result = profileService.getReviews(userId, pageNo);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@ApiOperation(value = "전체 유저의 프로필 이미지 db에 업로드", notes = "스케줄링을 통해 서버에서 자체적으로 호출해 업데이트 예정, 프론트에서 따로 호출 하지 마세요")
	@PostMapping("/update-image")
	public ResponseEntity<HashMap<String, List<Long>>> updateProfileImage() throws NotFoundException, IOException, ParseException {
		HashMap<String, List<Long>> result = new HashMap<>();
		result.put("userId", profileService.updateUserProfileImage());
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}
}
