package com.gamemakase.domain.model.dto;

import lombok.*;

@Builder
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ReviewUpdateRequestDto {
	private long reviewId;
	private String reviewTitle;
	private String reviewContent;
	private int reviewGrade;
	private int pageNo;
}
