package com.gamemakase.domain.model.service;

import java.io.IOException;
import java.util.List;

import org.json.simple.parser.ParseException;

import com.gamemakase.domain.model.dto.GameReviewResponseDto;
import com.gamemakase.domain.model.dto.ReviewInsertRequestDto;
import com.gamemakase.domain.model.dto.ReviewUpdateRequestDto;
import com.gamemakase.domain.model.entity.Review;
import com.gamemakase.global.Exception.NotFoundException;
import com.gamemakase.global.Exception.TokenValidFailedException;
import com.gamemakase.global.Exception.UnAuthorizedException;

public interface ReviewService {
	List<GameReviewResponseDto> getReviewsByGameId(long gameId, int pageNo) throws NotFoundException, IOException, ParseException;
	void insertReview(ReviewInsertRequestDto reviewRequest, String token) throws NotFoundException, TokenValidFailedException, UnAuthorizedException;
	Review updateReview(ReviewUpdateRequestDto reviewRequest, String token) throws NotFoundException, TokenValidFailedException, UnAuthorizedException;
	long deleteReview(long reviewId, String token) throws NotFoundException, TokenValidFailedException, UnAuthorizedException;
}
