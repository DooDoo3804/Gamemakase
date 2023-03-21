package com.gamemakase.domain.model.vo;

import java.time.LocalDateTime;

import com.gamemakase.domain.model.entity.Review;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ReviewInfoVo {
	private long reviewId;
	private long gameId;
	private String gameImagePath;
	private String gameTitle;
	private String reviewTitle;
	private String reviewContent;
	private long reviewGrade;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	public static ReviewInfoVo of(Review review, String gameImgPath) {
		return ReviewInfoVo.builder()
				.reviewId(review.getReviewId())
				.gameId(review.getGame().getGameId())
				.gameImagePath(gameImgPath)
				.gameTitle(review.getGame().getGameName())
				.reviewTitle(review.getReviewTitle())
				.reviewContent(review.getReviewContent())
				.reviewGrade(review.getReviewGrade())
				.createdAt(review.getCreatedAt())
				.updatedAt(review.getUpdatedAt())
				.build();
	}
}
