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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gamemakase.domain.model.dto.GameReviewResponseDto;
import com.gamemakase.domain.model.dto.ReviewInsertRequestDto;
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

	@ApiOperation(value = "게임을 기준으로 한 리뷰리스트 조회", notes = "페이징 처리가 완료된 게임 기준 리뷰 리스트 응답")
	@GetMapping("/api/reviews/{gameId}")
	public ResponseEntity<List<GameReviewResponseDto>> getReviewsByGameId (
			@PathVariable(value = "gameId", required = true) @ApiParam(required = true) long gameId,
			@RequestParam(required = false) @ApiParam(required = false) int pageNo
			) throws NotFoundException {
		logger.info("getReviewsByGameId : gameId, pageNo : {}", gameId, pageNo);
		List<GameReviewResponseDto> result = reviewService.getReviewsByGameId(gameId, pageNo);
		return new ResponseEntity<List<GameReviewResponseDto>>(result, HttpStatus.OK);
	}
	
	@ApiOperation(value = "게임에 대한 리뷰 작성", notes = "게임에 대한 리뷰를 작성하면 작성된 리뷰를 포함한 리뷰 리스트를 반환합니다.")
	@PostMapping("/auth/reviews")
	public ResponseEntity<List<GameReviewResponseDto>> insertReview (
			@RequestHeader(value = "accessToken", required = true) @ApiParam(required = true) String token,
			@RequestBody(required = true) @ApiParam(required = true) ReviewInsertRequestDto reviewRequest
			) throws NotFoundException {
		logger.info("insertReview : requestdto : {}", reviewRequest);
		
		reviewService.insertReview(reviewRequest);
		List<GameReviewResponseDto> result = reviewService.getReviewsByGameId(reviewRequest.getGameId(), 0);
		return new ResponseEntity<List<GameReviewResponseDto>>(result, HttpStatus.OK);
	}
	
	@ApiOperation(value = "특정 리뷰 수정", notes = "작성했던 리뷰를 수정합니다.")
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
