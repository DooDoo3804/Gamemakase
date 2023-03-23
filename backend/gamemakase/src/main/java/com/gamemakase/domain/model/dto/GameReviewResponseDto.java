package com.gamemakase.domain.model.dto;

import java.time.LocalDateTime;

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
}
