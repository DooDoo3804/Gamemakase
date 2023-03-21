package com.gamemakase.domain.model.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gamemakase.domain.model.dto.GameReviewResponseDto;
import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.entity.Image;
import com.gamemakase.domain.model.entity.Review;
import com.gamemakase.domain.model.repository.GameRepository;
import com.gamemakase.domain.model.repository.ImageRepository;
import com.gamemakase.domain.model.repository.ReviewRepository;
import com.gamemakase.global.Exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
	
	private final GameRepository gameRepository;
	private final ReviewRepository reviewRepository;
	private final ImageRepository imageRepository;
	
	@Override
	public List<GameReviewResponseDto> getReviewsByGameId(long gameId, int pageNo) throws NotFoundException {
		Game game = gameRepository.findById(gameId).orElseThrow(() -> new NotFoundException("gameId가 유효하지 않습니다."));
		Pageable pageable = PageRequest.of(pageNo, 12);
		Page<Review> reviews = reviewRepository.findAllByGame(game, pageable);
		
		List<GameReviewResponseDto> results = reviews.stream()
				.map(r -> {
					Image gameImage = imageRepository.findByTypeAndTypeId("GAME_HEADER", r.getGame().getGameId()).orElse(null);
					Optional<Image> userImage = imageRepository.findByTypeAndTypeId("USER_PROFILE", r.getUser().getUserId());
					String userImagePath = "";
					if(userImage.isPresent()) {
						userImagePath = userImage.get().getImagePath();
					}
					return GameReviewResponseDto.of(r, gameImage.getImagePath(), userImagePath);
				})
				.collect(Collectors.toList());
		return results;
	}

}
