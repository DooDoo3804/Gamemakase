package com.gamemakase.domain.model.vo;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class GenreScoreVo {
	private String genre;
	private long value;
}
