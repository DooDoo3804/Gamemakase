package com.gamemakase.domain.model.service;

import java.io.IOException;

import org.json.simple.parser.ParseException;

import com.gamemakase.domain.model.dto.ProfileInfoResponseDto;
import com.gamemakase.domain.model.dto.ProfileReviewsResponseDto;
import com.gamemakase.global.Exception.NotFoundException;

public interface ProfileService {
	ProfileInfoResponseDto getProfile(long userId, int pageNo) throws IOException, ParseException, NotFoundException;
	ProfileReviewsResponseDto getReviews(long userId, int pageNo);
}
