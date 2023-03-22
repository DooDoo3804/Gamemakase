package com.gamemakase.domain.model.dto;

import java.time.LocalDateTime;

import com.gamemakase.domain.model.entity.Review;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
public class GameReviewResponseDto {
	private long reviewId;
	private long gameId;
	private String gameImagePath;
	private String reviewTitle;
	private String reviewContent;
	private int reviewGrade;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private String userImagePath;
	private String userName;
	private long userId;
	
	public static GameReviewResponseDto of(Review review, String gameImg, String userImg) {
		return GameReviewResponseDto.builder()
				.reviewId(review.getReviewId())
				.gameId(review.getGame().getGameId())
				.gameImagePath(gameImg)
				.reviewTitle(review.getReviewTitle())
				.reviewContent(review.getReviewContent())
				.reviewGrade(review.getReviewGrade())
				.createdAt(review.getCreatedAt())
				.updatedAt(review.getUpdatedAt())
				.userImagePath(userImg)
				.userName(review.getUser().getUserName())
				.userId(review.getUser().getUserId())
				.build();
	}
}
