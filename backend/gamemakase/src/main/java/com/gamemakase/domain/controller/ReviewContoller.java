package com.gamemakase.domain.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gamemakase.domain.model.dto.GameReviewResponseDto;
import com.gamemakase.domain.model.service.ReviewService;
import com.gamemakase.global.Exception.NotFoundException;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ReviewContoller {

	private final Logger logger = LoggerFactory.getLogger(ReviewContoller.class);
	private final ReviewService reviewService;

	@ApiOperation(value = "", notes = "")
	@GetMapping("/api/reviews/{gameId}")
	public ResponseEntity<List<GameReviewResponseDto>> getReviewsByGameId(
			@PathVariable(value = "gameId", required = true) @ApiParam(required = true) long gameId,
			@RequestParam(required = false) @ApiParam(required = false) int pageNo) throws NotFoundException {
		logger.info("getReviewsByGameId : gameId, pageNo : {}", gameId, pageNo);
		List<GameReviewResponseDto> result = reviewService.getReviewsByGameId(gameId, pageNo);
		return new ResponseEntity<List<GameReviewResponseDto>>(result, HttpStatus.OK);
	}
	
	@ApiOperation(value = "", notes = "")
	@PostMapping("/auth/reviews")
	public ResponseEntity<?> insertReview(
			@RequestHeader(value = "accessToken", required = true) @ApiParam(required = true) String token) {
		return null;
	}
	
	@ApiOperation(value = "", notes = "")
	@PutMapping("/auth/reviews")
	public ResponseEntity<?> editReview(
			@RequestHeader(value = "accessToken", required = true) @ApiParam(required = true) String token) {
		return null;
	}
	
	@ApiOperation(value = "", notes = "")
	@DeleteMapping("/auth/reviews/{reviewId}")
	public ResponseEntity<?> deleteReview(
			@RequestHeader(value = "accessToken", required = true) @ApiParam(required = true) String token) {
		return null;
	}

}
