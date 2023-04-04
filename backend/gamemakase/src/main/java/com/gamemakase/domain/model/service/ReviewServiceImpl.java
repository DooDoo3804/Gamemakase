package com.gamemakase.domain.model.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.gamemakase.domain.model.entity.*;
import com.gamemakase.domain.model.repository.*;
import com.gamemakase.global.Exception.DuplicatedException;
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
import com.gamemakase.domain.model.vo.UserInfoVo;
import com.gamemakase.global.Exception.NotFoundException;
import com.gamemakase.global.Exception.TokenValidFailedException;
import com.gamemakase.global.Exception.UnAuthorizedException;
import com.gamemakase.global.config.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
	
	private final JwtTokenProvider jwtTokenProvider;
	private final GameRepository gameRepository;
	private final GameHistoryRepository gameHistoryRepository;
	private final UserRepository userRepository;
	private final ReviewRepository reviewRepository;
	private final ImageRepository imageRepository;
	private final RealTimeUserInfoService realTimeUserInfoService;
	private final Logger logger = LoggerFactory.getLogger(ReviewServiceImpl.class);

	/***
	 * Game을 기준으로 리뷰 목록을 조회합니다.
	 * @param gameId
	 * @param pageNo
	 * @return
	 * @throws NotFoundException
	 * @throws IOException
	 * @throws ParseException
	 */
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

	/***
	 * 새로운 리뷰를 작성합니다.
	 * @param reviewRequest
	 * @param token
	 * @throws NotFoundException
	 * @throws TokenValidFailedException
	 * @throws UnAuthorizedException
	 */
	@Override
	public void insertReview(ReviewInsertRequestDto reviewRequest, String token) throws NotFoundException, TokenValidFailedException, UnAuthorizedException {
		String userIdStr = jwtTokenProvider.getUserId(token);
		try {
			long userId = Long.parseLong(userIdStr);
			if (userId != reviewRequest.getUserId()) {
				throw new UnAuthorizedException("권한이 없는 사용자의 접근입니다.");
			}
			Game game = gameRepository.findById(reviewRequest.getGameId()).orElseThrow(() -> new NotFoundException("게임정보를 찾을 수 없습니다."));
			User user = userRepository.findById(reviewRequest.getUserId()).orElseThrow(() -> new NotFoundException("유저정보를 찾을 수 없습니다."));
			GameHistory gameHistory = gameHistoryRepository.findByUserAndGame(user, game).orElseThrow(() -> new UnAuthorizedException("게임을 구매하지 않은 사용자의 접근입니다."));
			Optional<Review> review = reviewRepository.findByGameAndUser(game, user);
			if (review.isPresent()) {
				throw new DuplicatedException("이미 작성한 게임에 대한 접근입니다.");
			}
			Review newReview = ReviewInsertRequestDto.toEntity(reviewRequest, game, user);
			reviewRepository.save(newReview);
		} catch (NumberFormatException e) {
			logger.error(e.getMessage());
			throw new TokenValidFailedException("유효하지 않은 토큰값입니다.");
		}
	}

	/***
	 * 작성되어있는 라뷰를 수정합니다.
	 * @param reviewRequest
	 * @param token
	 * @return
	 * @throws NotFoundException
	 * @throws TokenValidFailedException
	 * @throws UnAuthorizedException
	 */
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

	/***
	 * 작성된 리뷰를 삭제합니다.
	 * @param reviewId
	 * @param token
	 * @return
	 * @throws NotFoundException
	 * @throws TokenValidFailedException
	 * @throws UnAuthorizedException
	 */
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
