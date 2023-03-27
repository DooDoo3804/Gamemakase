package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.GameResponseDto;
import com.gamemakase.domain.model.dto.RecommendationResponseDto;
import com.gamemakase.domain.model.entity.User;
import com.gamemakase.domain.model.repository.DailyRecommendationRepository;
import com.gamemakase.domain.model.repository.GameRepository;
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

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationServiceImpl implements RecommendationService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RecommendationRepository recommendationRepository;
    private final Logger logger = LoggerFactory.getLogger(RecommendationServiceImpl.class);
    private final GameRepository gameRepository;
    private final DailyRecommendationRepository dailyRecommendationRepository;



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

        pageNo = Optional.ofNullable(pageNo).orElse(0);
        pageSize = Optional.ofNullable(pageSize).orElse(12);
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return recommendationRepository.findAllWithGameImageByUserId(userId, pageable).getContent();
    }

    @Override
    public List<RecommendationResponseDto> getByUserIdTest(Integer pageNo, Integer pageSize, Long userId) throws NotFoundException, TokenValidFailedException {

//        페이징 객체 및 추천 결과
        pageNo = Optional.ofNullable(pageNo).orElse(0);
        pageSize = Optional.ofNullable(pageSize).orElse(12);
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return recommendationRepository.findAllWithGameImageByUserId(userId, pageable).getContent();
    }

    @Override
    public List<GameResponseDto> getTopGamesInRandomOrder(Integer pageSize) {

//        페이지 사이즈 (기본 12)
        pageSize = Optional.ofNullable(pageSize).orElse(12);

//        100개
        Pageable pageable = PageRequest.of(0, 100);
        Page<GameResponseDto> top100 = gameRepository.findTop100GamesWithImagesOrderByPeakCcuDesc(pageable);
//        System.out.println("top100 = " + top100);

//        이렇게 하면 immutable한 list를 반환해서 셔플이 안됩니다.
//        List<GameResponseDto> result = top100.getContent();

//        스트림으로 DIY 리스트 만들어줘야됩니다.
        List<GameResponseDto> result = top100.stream().collect(Collectors.toList());

//        System.out.println("result = " + result);

//        랜덤
        Collections.shuffle(result);

        return  result.subList(0, Math.min(pageSize, result.size()));
    }

    @Override
    public List<GameResponseDto> getGamesInRandomOrder(Integer pageSize) {

//        페이지 사이즈(기본 12)
        pageSize = Optional.ofNullable(pageSize).orElse(12);
        Pageable pageable = PageRequest.of(0, pageSize);

//         랜덤 게임
        List<GameResponseDto> randomGames = gameRepository.getAllByScoreGreaterThanEqual95OrRecommendationsGreaterThanEqual50000(pageable).getContent();

        return  randomGames.subList(0, Math.min(pageSize, randomGames.size()));
    }

    @Override
    public List<GameResponseDto> getDailyRecommendations() {
        return dailyRecommendationRepository.findAllAsDto();
    }
}

