package com.gamemakase.domain.model.vo;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PaginationVo {
	private int pageNum;
	private Long size; // 페이징 고려 안한 전체 리스트 개수
	private int count; // 이번에 가는 리스트 개수
}
