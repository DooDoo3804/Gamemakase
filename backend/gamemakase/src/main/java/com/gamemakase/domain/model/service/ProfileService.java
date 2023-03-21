package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.ProfileInfoResponseDto;
import com.gamemakase.domain.model.dto.ProfileReviewsResponseDto;

public interface ProfileService {
	ProfileInfoResponseDto getProfile(long userId, int pageNo);
	ProfileReviewsResponseDto getReviews(long userId, int pageNo);
}
