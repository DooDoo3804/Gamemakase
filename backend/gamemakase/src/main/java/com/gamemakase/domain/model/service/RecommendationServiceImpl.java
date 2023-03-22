package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.RecommendationResponseDto;
import com.gamemakase.domain.model.entity.Image;
import com.gamemakase.domain.model.entity.Recommendation;
import com.gamemakase.domain.model.entity.User;
import com.gamemakase.domain.model.repository.ImageRepository;
import com.gamemakase.domain.model.repository.RecommendationRepository;
import com.gamemakase.domain.model.repository.UserRepository;
import com.gamemakase.global.Exception.NotFoundException;
import com.gamemakase.global.Exception.TokenValidFailedException;
import com.gamemakase.global.config.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationServiceImpl implements RecommendationService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ImageRepository imageRepository;
    private final RecommendationRepository recommendationRepository;
    private final Logger logger = LoggerFactory.getLogger(RecommendationServiceImpl.class);



    @Override
    public List<RecommendationResponseDto> getByUserId(Integer pageNo, Integer pageSize, String token) throws NotFoundException, TokenValidFailedException {

//        유저 파싱 및 예외처리
        String userIdStr = jwtTokenProvider.getUserId(token);
        Long userId = Long.parseLong(userIdStr);

        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new NotFoundException("wrong userId"));
        } catch (NumberFormatException e) {
            logger.error(e.getMessage());
            throw new TokenValidFailedException("유효하지 않은 토큰값입니다.");
        }

//        스팀아이디
        Long userSteamId = userRepository.findById(userId).get().getUserSteamId();

//        페이징 객체 및 추천 결과
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Recommendation> recommendations = recommendationRepository.findAllByUserUserSteamIdOrderByRatingDesc(userSteamId, pageable);

//        DTO로 반환
        return recommendations.stream()
                .map(recommendation -> RecommendationResponseDto.builder()
                        .gameId(recommendation.getGame().getGameId())
                        .gameName(recommendation.getGame().getGameName())
                        .gameImage(imageRepository.findByTypeAndTypeId("GAME_HEADER", recommendation.getGame().getGameId())
                                .map(Image::getImagePath)
                                .orElse(""))
                        .rating(recommendation.getRating())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<RecommendationResponseDto> getByUserIdTest(Integer pageNo, Integer pageSize, String userId) throws NotFoundException, TokenValidFailedException {

////        유저 파싱 및 예외처리
//        String userIdStr = jwtTokenProvider.getUserId(token);
//        Long userId = Long.parseLong(userIdStr);
//
//        try {
//            User user = userRepository.findById(userId)
//                    .orElseThrow(() -> new NotFoundException("wrong userId"));
//        } catch (NumberFormatException e) {
//            logger.error(e.getMessage());
//            throw new TokenValidFailedException("유효하지 않은 토큰값입니다.");
//        }

//        스팀아이디
        Long userSteamId = userRepository.findById(Long.parseLong(userId)).get().getUserSteamId();

//        페이징 객체 및 추천 결과
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Recommendation> recommendations = recommendationRepository.findAllByUserUserSteamIdOrderByRatingDesc(userSteamId, pageable);

//        DTO로 반환
        return recommendations.stream()
                .map(recommendation -> RecommendationResponseDto.builder()
                        .gameId(recommendation.getGame().getGameId())
                        .gameName(recommendation.getGame().getGameName())
                        .gameImage(imageRepository.findByTypeAndTypeId("GAME_HEADER", recommendation.getGame().getGameId())
                                .map(Image::getImagePath)
                                .orElse(""))
                        .rating(recommendation.getRating())
                        .build())
                .collect(Collectors.toList());
    }
}

