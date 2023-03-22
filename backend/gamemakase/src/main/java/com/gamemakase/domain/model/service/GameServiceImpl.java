package com.gamemakase.domain.model.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import com.gamemakase.domain.model.dto.GameDetailResponseDto;
import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.entity.Genre;
import com.gamemakase.domain.model.entity.Image;
import com.gamemakase.domain.model.entity.Recommendation;
import com.gamemakase.domain.model.repository.GameHistoryRepository;
import com.gamemakase.domain.model.repository.GameRepository;
import com.gamemakase.domain.model.repository.GenreRepository;
import com.gamemakase.domain.model.repository.ImageRepository;
import com.gamemakase.domain.model.repository.LikeGameRepository;
import com.gamemakase.domain.model.repository.RecommendationRepository;
import com.gamemakase.domain.model.repository.ReviewRepository;
import com.gamemakase.domain.model.repository.UserRepository;
import com.gamemakase.global.Exception.NotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameServiceImpl implements GameService{
    private final GameRepository gameRepository;
    private final GameHistoryRepository gameHistoryRepository;
    private final ImageRepository imageRepository;
    private final GenreRepository genreRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final LikeGameRepository likeGameRepository;
    private final RecommendationRepository recommendationRepository;
    private final ReviewService reviewService;

    @Override
    public GameDetailResponseDto getByGameId(Long gameId, Long userId) throws NotFoundException, IOException, ParseException {

//        System.out.println("gameId = " + gameId + ", userId = " + userId);

//        예외처리
        Game game = gameRepository.findByGameId(gameId)
                .orElseThrow(() -> new NotFoundException("wrong game id"));
        System.out.println("game = " + game.getGameId());

        if (userId != -1 && !userRepository.existsByUserId(userId)){
            throw new NotFoundException("wrong user id");
        }

//        isLiked
        boolean isLiked = likeGameRepository.existsByGameGameIdAndUserUserId(gameId, userId);
//        System.out.println("isLiked = " + isLiked);

//        canReview
        boolean canReview = gameHistoryRepository.existsByGameGameIdAndUserUserId(gameId, userId) && !reviewRepository.existsByGameGameIdAndUserUserId(gameId, userId);
//        System.out.println("canReview = " + canReview);


//        장르, 이미지, 추천
        List<Genre> genreList = genreRepository.findAllByGameGameId(gameId);
//        System.out.println("genreList = " + genreList.toString());
        List<Image> imageList = imageRepository.findAllByTypeAndTypeId("GAME_SCREENSHOTS", gameId);
//        System.out.println("imageList = " + imageList.toString());
        List<Recommendation> recommendationList = recommendationRepository.findAllByGameGameIdOrderByRatingDesc(gameId);
//        System.out.println("recommendationList = " + recommendationList.toString());

        return GameDetailResponseDto.builder()
                .gameId(game.getGameId())
                .gameName(game.getGameName())
                .gamePrice(game.getGamePrice())
                .releaseDate(game.getReleaseDate())
                .gameDescription(game.getGameDescription())
                .score(game.getScore())
                .averagePlaytime(game.getAveragePlaytime())
                .publisher(game.getPublisher())
                .isKorean(game.isKorean())
                .isLiked(isLiked)
                .canReview(canReview)
                .windows(game.isWindows())
                .mac(game.isMac())
                .linux(game.isLinux())
//                장르
                .genres(genreList.stream()
                        .map(genre -> GameDetailResponseDto.GenreDTO.builder()
                                .genreId(genre.getGenreId())
                                .genreName(genre.getGenreName())
                                .build())
                        .collect(Collectors.toList()))
//                이미지
                .images(imageList.stream()
                        .map(image -> GameDetailResponseDto.ImageDTO.builder()
                                .imageId(image.getImageId())
                                .imagePath(image.getImagePath())
                                .build())
                        .collect(Collectors.toList()))
//                리뷰
                .reviews(reviewService.getReviewsByGameId(gameId, 0))
//                유저 추천
                .recommendedUsers(recommendationList.stream()
                        .map(recommendation -> GameDetailResponseDto.RecommendedUserDTO.builder()
                                .userId(recommendation.getUser().getUserId())
                                .userName(recommendation.getUser().getUserName())
                                .userImagePath(imageRepository.findByTypeAndTypeId("User", recommendation.getUser().getUserId())
                                        .map(Image::getImagePath)
                                        .orElse(""))
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }
}
