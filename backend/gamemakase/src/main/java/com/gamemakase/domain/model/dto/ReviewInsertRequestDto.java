package com.gamemakase.domain.model.dto;

import java.time.LocalDateTime;

import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.entity.Review;
import com.gamemakase.domain.model.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewInsertRequestDto {
	private long gameId;
	private long userId;
	private String reviewTitle;
	private String reviewContent;
	private int reviewGrade;
	
	public static Review toEntity(ReviewInsertRequestDto reviewRequest, Game game, User user) {
		return Review.builder()
				.game(game)
				.user(user)
				.reviewTitle(reviewRequest.getReviewTitle())
				.reviewContent(reviewRequest.getReviewContent())
				.reviewGrade(reviewRequest.getReviewGrade())
				.createdAt(LocalDateTime.now())
				.updatedAt(LocalDateTime.now())
				.build();
	}
}
