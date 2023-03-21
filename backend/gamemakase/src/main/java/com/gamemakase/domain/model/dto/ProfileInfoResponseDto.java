package com.gamemakase.domain.model.dto;

import java.util.List;

import com.gamemakase.domain.model.vo.GenreScoreVo;
import com.gamemakase.domain.model.vo.ScrapInfoVo;
import com.gamemakase.domain.model.vo.UserInfoResponseVo;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@ToString
public class ProfileInfoResponseDto {
	private UserInfoResponseVo user;
	private List<GenreScoreVo> statistics;
	private List<ScrapInfoVo> scrap;
}
