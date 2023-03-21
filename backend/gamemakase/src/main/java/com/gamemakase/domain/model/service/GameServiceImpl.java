package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.GameDetailResponseDto;
import com.gamemakase.domain.model.entity.*;
import com.gamemakase.domain.model.repository.*;
import com.gamemakase.global.Exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public GameDetailResponseDto getByGameId(Long gameId, Long userId) throws NotFoundException {

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

//        장르, 이미지, 리뷰
        List<Genre> genreList = genreRepository.findAllByGameGameId(gameId);
//        System.out.println("genreList = " + genreList.toString());
        List<Image> imageList = imageRepository.findAllByTypeAndTypeId("GAME_SCREENSHOTS", gameId);
//        System.out.println("imageList = " + imageList.toString());
        List<Review> reviewList = reviewRepository.findAllByGameGameId(gameId);
//        System.out.println("reviewList.toString() = " + reviewList.toString());
        List<Recommendation> recommendationList = recommendationRepository.findAllByGameGameIdOrderByRatingDesc(gameId);
//        System.out.println("recommendationList = " + recommendationList.toString());

        return GameDetailResponseDto.builder()
                .gameId(game.getGameId())
                .gameName(game.getGameName())
                .gamePrice(game.getGamePrice())
                .releaseDate(game.getReleaseDate())
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
                .reviews(reviewList.stream()
                        .map(review -> GameDetailResponseDto.ReviewDTO.builder()
                                .reviewId(review.getReviewId())
                                .gameId(review.getGame().getGameId())
                                .reviewTitle(review.getReviewTitle())
                                .reviewContent(review.getReviewContent())
                                .reviewGrade(review.getReviewGrade())
                                .createdAt(review.getCreatedAt())
                                .updatedAt(review.getUpdatedAt())
                                .userImagePath(imageRepository.findByTypeAndTypeId("User", review.getUser().getUserId()).orElseGet(Image::new).getImagePath())
                                .userName(review.getUser().getUserName())
                                .userId(review.getUser().getUserId())
                                .build())
                        .collect(Collectors.toList()))
//                유저 추천
                .recommendedUsers(recommendationList.stream()
                        .map(recommendation -> GameDetailResponseDto.RecommendedUserDTO.builder()
                                .userId(recommendation.getUser().getUserId())
                                .userName(recommendation.getUser().getUserName())
                                .userImagePath(imageRepository.findByTypeAndTypeId("User", recommendation.getUser().getUserId()).orElseGet(Image::new).getImagePath())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }
}
