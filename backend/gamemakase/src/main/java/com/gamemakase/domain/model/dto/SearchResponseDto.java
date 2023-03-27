package com.gamemakase.domain.model.dto;

import java.util.List;

import com.gamemakase.domain.model.vo.GameInfoVo;
import com.gamemakase.domain.model.vo.UserInfoVo;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SearchResponseDto {
	List<GameInfoVo> games;
	List<UserInfoVo> users;
}
