package com.gamemakase.domain.model.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gamemakase.domain.model.dto.GameReviewResponseDto;
import com.gamemakase.domain.model.dto.ReviewInsertRequestDto;
import com.gamemakase.domain.model.dto.ReviewUpdateRequestDto;
import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.entity.Image;
import com.gamemakase.domain.model.entity.Review;
import com.gamemakase.domain.model.entity.User;
import com.gamemakase.domain.model.repository.GameRepository;
import com.gamemakase.domain.model.repository.ImageRepository;
import com.gamemakase.domain.model.repository.ReviewRepository;
import com.gamemakase.domain.model.repository.UserRepository;
import com.gamemakase.domain.model.vo.UserInfoVo;
import com.gamemakase.global.Exception.NotFoundException;
import com.gamemakase.global.Exception.TokenValidFailedException;
import com.gamemakase.global.Exception.UnAuthorizedException;
import com.gamemakase.global.config.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
	
	private final JwtTokenProvider jwtTokenProvider;
	private final GameRepository gameRepository;
	private final UserRepository userRepository;
	private final ReviewRepository reviewRepository;
	private final ImageRepository imageRepository;
	private final RealTimeUserInfoService realTimeUserInfoService;
	private final Logger logger = LoggerFactory.getLogger(ReviewServiceImpl.class);
	
	@Override
	public List<GameReviewResponseDto> getReviewsByGameId(long gameId, int pageNo) throws NotFoundException, IOException, ParseException {
		Game game = gameRepository.findById(gameId).orElseThrow(() -> new NotFoundException("게임정보를 찾을 수 없습니다."));
		Pageable pageable = PageRequest.of(pageNo, 12);
		Page<Review> reviews = reviewRepository.findAllByGameOrderByCreatedAtDesc(game, pageable);
		
		List<GameReviewResponseDto> results = new ArrayList<GameReviewResponseDto>();
		for (Review review : reviews) {
			String gameImagePath = "";
			Optional<Image> gameImage = imageRepository.findByTypeAndTypeId("GAME_HEADER", review.getGame().getGameId());
			if (gameImage.isPresent()) {
				gameImagePath = gameImage.get().getImagePath();
			}
			
			List<User> userList = new ArrayList<User>();
			userList.add(review.getUser());
			List<UserInfoVo> realUserInfoList = realTimeUserInfoService.getUserInfoResponseVo(userList);
			UserInfoVo userInfo = null;
			if (realUserInfoList != null && realUserInfoList.size() > 0) {
				userInfo = realUserInfoList.get(0);
			} else {
				Optional<Image> image = imageRepository.findByTypeAndTypeId("USER_PROFILE", review.getUser().getUserId());
				if(!image.isPresent()) {
					userInfo = UserInfoVo.of(review.getUser(), "");
				} else {
					userInfo = UserInfoVo.of(review.getUser(), image.get().getImagePath());
				}
			}
			
			results.add(GameReviewResponseDto.builder()
				.reviewId(review.getReviewId())
				.gameId(review.getGame().getGameId())
				.gameImagePath(gameImagePath)
				.reviewTitle(review.getReviewTitle())
				.reviewContent(review.getReviewContent())
				.reviewGrade(review.getReviewGrade())
				.createdAt(review.getCreatedAt())
				.updatedAt(review.getUpdatedAt())
				.userImagePath(userInfo.getUserImagePath())
				.userName(userInfo.getUserName())
				.userId(review.getUser().getUserId())
				.build());
		}
		return results;
	}

	@Override
	public void insertReview(ReviewInsertRequestDto reviewRequest, String token) throws NotFoundException, TokenValidFailedException, UnAuthorizedException {
		String userIdStr = jwtTokenProvider.getUserId(token);
		try {
			long userId = Long.parseLong(userIdStr);
			if (userId != reviewRequest.getUserId()) {
				throw new UnAuthorizedException("권한이 없는 사용자의 접근입니다.");
			}
		} catch (NumberFormatException e) {
			logger.error(e.getMessage());
			throw new TokenValidFailedException("유효하지 않은 토큰값입니다.");
		}
		Game game = gameRepository.findById(reviewRequest.getGameId()).orElseThrow(() -> new NotFoundException("게임정보를 찾을 수 없습니다."));
		User user = userRepository.findById(reviewRequest.getUserId()).orElseThrow(() -> new NotFoundException("유저정보를 찾을 수 없습니다."));
		Review review = ReviewInsertRequestDto.toEntity(reviewRequest, game, user);
		reviewRepository.save(review);
	}

	@Override
	public Review updateReview(ReviewUpdateRequestDto reviewRequest, String token) throws NotFoundException, TokenValidFailedException, UnAuthorizedException {
		Review review = reviewRepository.findById(reviewRequest.getReviewId()).orElseThrow(() -> new NotFoundException("리뷰정보를 찾을 수 없습니다."));
		String userIdStr = jwtTokenProvider.getUserId(token);
		try {
			long userId = Long.parseLong(userIdStr);
			if (userId != review.getUser().getUserId()) {
				throw new UnAuthorizedException("권한이 없는 사용자의 접근입니다.");
			}
		} catch (NumberFormatException e) {
			logger.error(e.getMessage());
			throw new TokenValidFailedException("유효하지 않은 토큰값입니다.");
		}
		review.setReviewTitle(reviewRequest.getReviewTitle());
		review.setReviewContent(reviewRequest.getReviewContent());
		review.setReviewGrade(reviewRequest.getReviewGrade());
		reviewRepository.save(review);
		return review;
	}

	@Override
	public long deleteReview(long reviewId, String token) throws NotFoundException, TokenValidFailedException, UnAuthorizedException {
		Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new NotFoundException("리뷰정보를 찾을 수 없습니다."));
		String userIdStr = jwtTokenProvider.getUserId(token);
		try {
			long userId = Long.parseLong(userIdStr);
			if (userId != review.getUser().getUserId()) {
				throw new UnAuthorizedException("권한이 없는 사용자의 접근입니다.");
			}
		} catch (NumberFormatException e) {
			logger.error(e.getMessage());
			throw new TokenValidFailedException("유효하지 않은 토큰값입니다.");
		}
		long gameId = review.getGame().getGameId();
		reviewRepository.delete(review);
		return gameId;
	}

}
