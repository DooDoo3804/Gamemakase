package com.gamemakase.domain.controller;

import java.io.IOException;
import java.util.List;

import org.json.simple.parser.ParseException;
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
import com.gamemakase.domain.model.dto.ProfileReviewsResponseDto;
import com.gamemakase.domain.model.dto.ReviewInsertRequestDto;
import com.gamemakase.domain.model.dto.ReviewUpdateRequestDto;
import com.gamemakase.domain.model.entity.Review;
import com.gamemakase.domain.model.service.ProfileService;
import com.gamemakase.domain.model.service.ReviewService;
import com.gamemakase.global.Exception.NotFoundException;
import com.gamemakase.global.Exception.TokenValidFailedException;
import com.gamemakase.global.Exception.UnAuthorizedException;
import com.gamemakase.global.config.jwt.JwtTokenProvider;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(value = "리뷰 관련 컨트롤러")
@RestController
@RequiredArgsConstructor
public class ReviewRestContoller {

	private final Logger logger = LoggerFactory.getLogger(ReviewRestContoller.class);
	private final ReviewService reviewService;
	private final ProfileService profileService;
	private final JwtTokenProvider jwtTokenProvider;

	@ApiOperation(value = "게임을 기준으로 한 리뷰리스트 조회", notes = "페이징 처리가 완료된 게임 기준 리뷰 리스트 응답")
	@GetMapping("/api/reviews/{gameId}")
	public ResponseEntity<List<GameReviewResponseDto>> getReviewsByGameId (
			@PathVariable(value = "gameId", required = true) @ApiParam(required = true) long gameId,
			@RequestParam(required = false) @ApiParam(required = false) int pageNo
			) throws NotFoundException, IOException, ParseException {
		logger.info("getReviewsByGameId : gameId, pageNo : {}", gameId, pageNo);
		List<GameReviewResponseDto> result = reviewService.getReviewsByGameId(gameId, pageNo);
		return new ResponseEntity<List<GameReviewResponseDto>>(result, HttpStatus.OK);
	}
	
	@ApiOperation(value = "게임에 대한 리뷰 작성", notes = "게임에 대한 리뷰를 작성하고 작성된 리뷰를 포함한 리뷰 리스트를 반환합니다.")
	@PostMapping("/auth/reviews")
	public ResponseEntity<List<GameReviewResponseDto>> insertReview (
			@RequestHeader(value = "accessToken", required = true) @ApiParam(required = true) String token,
			@RequestBody @ApiParam(required = true) ReviewInsertRequestDto reviewRequest
			) throws NotFoundException, TokenValidFailedException, UnAuthorizedException, IOException, ParseException {
		logger.info("insertReview : requestdto : {}", reviewRequest);
		reviewService.insertReview(reviewRequest, token);
		List<GameReviewResponseDto> result = reviewService.getReviewsByGameId(reviewRequest.getGameId(), 0);
		return new ResponseEntity<List<GameReviewResponseDto>>(result, HttpStatus.CREATED);
	}
	
	@ApiOperation(value = "특정 리뷰 수정", notes = "작성했던 리뷰를 수정하고 수정된 리뷰를 포함한 특정 게임의 리뷰 리스트를 반환합니다.")
	@PutMapping("/auth/reviews")
	public ResponseEntity<List<GameReviewResponseDto>> editReview(
			@RequestHeader(value = "accessToken", required = true) @ApiParam(required = true) String token,
			@RequestBody @ApiParam(required = true) ReviewUpdateRequestDto reviewRequest
			) throws NotFoundException, TokenValidFailedException, UnAuthorizedException, IOException, ParseException {
		logger.info("editReview : requestdto : {}", reviewRequest);
		Review review = reviewService.updateReview(reviewRequest, token);
		List<GameReviewResponseDto> result = reviewService.getReviewsByGameId(review.getGame().getGameId(), 0);
		return new ResponseEntity<List<GameReviewResponseDto>>(result, HttpStatus.OK);
	}
	
	@ApiOperation(value = "유저 프로필에서 특정 리뷰 수정", notes = "작성했던 리뷰를 수정하고 수정된 리뷰를 포함한 특정 유저의 리뷰 리스트를 반환합니다.")
	@PutMapping("/auth/user/reviews")
	public ResponseEntity<ProfileReviewsResponseDto> editProfilePageReview(
			@RequestHeader(value = "accessToken", required = true) @ApiParam(required = true) String token,
			@RequestBody @ApiParam(required = true) ReviewUpdateRequestDto reviewRequest
			) throws NotFoundException, TokenValidFailedException, UnAuthorizedException {
		logger.info("editProfilePageReview : requestdto : {}", reviewRequest);
		Review review = reviewService.updateReview(reviewRequest, token);
		ProfileReviewsResponseDto result = profileService.getReviews(review.getUser().getUserId(), reviewRequest.getPageNo());
		return new ResponseEntity<ProfileReviewsResponseDto>(result, HttpStatus.OK);
	}
	
	@ApiOperation(value = "특정 리뷰 삭제", notes = "작성했던 리뷰를 삭제하고 삭제를 반영한 특정 게임의 리뷰 리스트를 반환합니다.")
	@DeleteMapping("/auth/reviews/{reviewId}")
	public ResponseEntity<List<GameReviewResponseDto>> deleteReview(
			@RequestHeader(value = "accessToken", required = true) @ApiParam(required = true) String token,
			@PathVariable(value = "reviewId", required = true) @ApiParam(required = true) long reviewId
			) throws NotFoundException, TokenValidFailedException, IOException, ParseException {
		logger.info("deleteReview : reviewId : {}", reviewId);
		long gameId = reviewService.deleteReview(reviewId, token);
		List<GameReviewResponseDto> result = reviewService.getReviewsByGameId(gameId, 0);
		return new ResponseEntity<List<GameReviewResponseDto>>(result, HttpStatus.OK);
	}
	
	@ApiOperation(value = "유저 프로필에서 특정 리뷰 삭제", notes = "작성했던 리뷰를 삭제하고 삭제를 반영한 특정 유저의 리뷰 리스트를 반환합니다.")
	@DeleteMapping("/auth/user/reviews/{reviewId}")
	public ResponseEntity<ProfileReviewsResponseDto> deleteProfilePageReview(
			@RequestHeader(value = "accessToken", required = true) @ApiParam(required = true) String token,
			@PathVariable(value = "reviewId", required = true) @ApiParam(required = true) long reviewId,
			@RequestParam(required = false) @ApiParam(required = false) int pageNo
			) throws NotFoundException, TokenValidFailedException, UnAuthorizedException {
		logger.info("deleteProfilePageReview : reviewId, pageNo : {}", reviewId, pageNo);
		reviewService.deleteReview(reviewId, token);
		long userId = Long.parseLong(jwtTokenProvider.getUserId(token));
		ProfileReviewsResponseDto result = profileService.getReviews(userId, pageNo);
		return new ResponseEntity<ProfileReviewsResponseDto>(result, HttpStatus.OK);
	}

}
