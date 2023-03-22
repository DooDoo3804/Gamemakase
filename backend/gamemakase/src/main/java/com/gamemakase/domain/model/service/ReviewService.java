package com.gamemakase.domain.model.service;

import java.util.List;

import com.gamemakase.domain.model.dto.GameReviewResponseDto;
import com.gamemakase.domain.model.dto.ReviewInsertRequestDto;
import com.gamemakase.global.Exception.NotFoundException;

public interface ReviewService {
	List<GameReviewResponseDto> getReviewsByGameId(long gameId, int pageNo) throws NotFoundException;
	void insertReview(ReviewInsertRequestDto reviewRequest) throws NotFoundException;
}