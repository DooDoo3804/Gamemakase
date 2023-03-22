package com.gamemakase.domain.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
public class ReviewUpdateRequestDto {
	private long reviewId;
	private String reviewTitle;
	private String reviewContent;
	private int reviewGrade;
	private int pageNo;
}
