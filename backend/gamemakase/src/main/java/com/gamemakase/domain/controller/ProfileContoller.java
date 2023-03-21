package com.gamemakase.domain.controller;

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

import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user/mypage")
public class ProfileContoller {
	
	private final Logger logger = LoggerFactory.getLogger(ProfileContoller.class);
	private final ProfileService profileService;
	
	@GetMapping
	public ResponseEntity<ProfileInfoResponseDto> getProfile(
			@RequestParam @ApiParam(required = true) long userId,
			@RequestParam(required = true) @ApiParam(required = true) int pageNo
			) {
		logger.info("get mapping, userId : {}", userId);
		ProfileInfoResponseDto result = profileService.getProfile(userId, pageNo);
		return new ResponseEntity<ProfileInfoResponseDto>(result, HttpStatus.OK);
	}
	
	@GetMapping("/reviews")
	public ResponseEntity<ProfileReviewsResponseDto> getReviews(
			@RequestParam(required = true) @ApiParam(required = true) long userId,
			@RequestParam(required = true) @ApiParam(required = true) int pageNo
			) {
		logger.info("get reviews mapping, userId, pageNo : {}", userId, pageNo);
		ProfileReviewsResponseDto result = profileService.getReviews(userId, pageNo);
		return new ResponseEntity<ProfileReviewsResponseDto>(result, HttpStatus.OK);
	}
}
