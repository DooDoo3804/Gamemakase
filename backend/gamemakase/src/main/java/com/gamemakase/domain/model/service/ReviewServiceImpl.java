package com.gamemakase.domain.model.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
	private final Logger logger = LoggerFactory.getLogger(ReviewServiceImpl.class);
	
	@Override
	public List<GameReviewResponseDto> getReviewsByGameId(long gameId, int pageNo) throws NotFoundException {
		Game game = gameRepository.findById(gameId).orElseThrow(() -> new NotFoundException("게임정보를 찾을 수 없습니다."));
		Pageable pageable = PageRequest.of(pageNo, 12);
		Page<Review> reviews = reviewRepository.findAllByGameOrderByCreatedAtDesc(game, pageable);
		
		List<GameReviewResponseDto> results = reviews.stream()
				.map(r -> {
					Image gameImage = imageRepository.findByTypeAndTypeId("GAME_HEADER", r.getGame().getGameId()).orElse(null);
					Optional<Image> userImage = imageRepository.findByTypeAndTypeId("USER_PROFILE", r.getUser().getUserId());
					String userImagePath = "";
					if(userImage.isPresent()) {
						userImagePath = userImage.get().getImagePath();
					}
					return GameReviewResponseDto.of(r, gameImage.getImagePath(), userImagePath);
				})
				.collect(Collectors.toList());
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
