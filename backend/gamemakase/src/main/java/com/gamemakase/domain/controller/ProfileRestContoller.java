package com.gamemakase.domain.controller;

import java.io.IOException;

import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gamemakase.domain.model.dto.ProfileInfoResponseDto;
import com.gamemakase.domain.model.dto.ProfileReviewsResponseDto;
import com.gamemakase.domain.model.service.ProfileService;
import com.gamemakase.global.Exception.NotFoundException;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

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
		return new ResponseEntity<ProfileInfoResponseDto>(result, HttpStatus.OK);
	}

	@ApiOperation(value = "해당 유저가 작성한 리뷰 리스트", notes = "개인 profile 페이지의 review탭 요청에 대한 응답")
	@GetMapping("/reviews")
	public ResponseEntity<ProfileReviewsResponseDto> getReviews(
			@RequestParam(required = true) @ApiParam(required = true) long userId,
			@RequestParam(required = true) @ApiParam(required = true) int pageNo) {
		logger.info("get reviews mapping, userId, pageNo : {}", userId, pageNo);
		ProfileReviewsResponseDto result = profileService.getReviews(userId, pageNo);
		return new ResponseEntity<ProfileReviewsResponseDto>(result, HttpStatus.OK);
	}
}
