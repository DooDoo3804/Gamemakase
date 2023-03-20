package com.gamemakase.domain.model.dto;

import java.util.List;

import com.gamemakase.domain.model.vo.PaginationVo;
import com.gamemakase.domain.model.vo.ReviewInfoVo;
import com.gamemakase.domain.model.vo.UserInfoResponseVo;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ProfileReviewsResponseDto {
	private UserInfoResponseVo user;
	private List<ReviewInfoVo> reviews;
	private PaginationVo page;
}
