package com.gamemakase.domain.model.dto;

import java.util.List;

import com.gamemakase.domain.model.vo.GenreScoreVo;
import com.gamemakase.domain.model.vo.PaginationVo;
import com.gamemakase.domain.model.vo.GameInfoVo;
import com.gamemakase.domain.model.vo.UserInfoVo;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@ToString
public class ProfileInfoResponseDto {
	private UserInfoVo user;
	private List<GenreScoreVo> statistics;
	private List<GameInfoVo> scrap;
	private PaginationVo page;
}
