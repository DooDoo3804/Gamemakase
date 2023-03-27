package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.GameHistoryInsertRequestDto;
import com.gamemakase.domain.model.dto.GameHistoryResponseDto;
import com.gamemakase.domain.model.entity.GameHistory;
import com.gamemakase.domain.model.entity.User;
import com.gamemakase.global.Exception.TokenValidFailedException;
import com.gamemakase.global.Exception.UnAuthorizedException;
import com.gamemakase.global.config.jwt.JwtTokenProvider;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.gamemakase.domain.model.entity.*;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.gamemakase.domain.model.dto.GameDetailResponseDto;
import com.gamemakase.domain.model.repository.GameHistoryRepository;
import com.gamemakase.domain.model.repository.GameRepository;
import com.gamemakase.domain.model.repository.GenreRepository;
import com.gamemakase.domain.model.repository.ImageRepository;
import com.gamemakase.domain.model.repository.LikeGameRepository;
import com.gamemakase.domain.model.repository.ReviewRepository;
import com.gamemakase.domain.model.repository.UserRepository;
import com.gamemakase.global.Exception.NotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameServiceImpl implements GameService{

    private final Logger logger = LoggerFactory.getLogger(GameServiceImpl.class);
    private final GameRepository gameRepository;
    private final GameHistoryRepository gameHistoryRepository;
    private final ImageRepository imageRepository;
    private final GenreRepository genreRepository;
    private final ReviewRepository reviewRepository;

    private final UserRepository userRepository;
    private final LikeGameRepository likeGameRepository;
    private final ReviewService reviewService;

    private final JwtTokenProvider jwtTokenProvider;

    static final String RECENTLY_PLAYED_GAMES_URL = "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/";

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
        List<GameHistory> recommendationList = gameHistoryRepository.findAllByGameGameIdOrderByTotalPlayGameDesc(gameId);

//        List<Recommendation> recommendationList = recommendationRepository.findAllByGameGameIdOrderByRatingDesc(gameId);
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

    @Override
    public void insertGameHistory(int totalPlayGame, int twoWeekPlayGame, long gameId, String token)
        throws TokenValidFailedException, NotFoundException {
        String userIdStr = jwtTokenProvider.getUserId(token);

        long userId = Long.parseLong(userIdStr);

        Game game = gameRepository.findById(gameId).orElse(null);
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("유저정보를 찾을 수 없습니다."));
        GameHistory gameHistory = GameHistoryInsertRequestDto.toEntity(totalPlayGame, twoWeekPlayGame, game, user);

        if(game != null) gameHistoryRepository.save(gameHistory);
    }

    @Override
    public List<GameHistoryResponseDto> getGameHistory(String token)
        throws NotFoundException {

        String userIdStr = jwtTokenProvider.getUserId(token);
        long userId = Long.parseLong(userIdStr);

        List<GameHistory> gameHistories = gameHistoryRepository.findByUserUserId(userId);


        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("유저정보를 찾을 수 없습니다."));

        List<GameHistoryResponseDto> responseDtoList = new ArrayList<>();

        for(GameHistory gameHistory : gameHistories){
            List<Genre> genre = genreRepository.findAllByGameGameId(gameHistory.getGame().getGameId());
            List<String> genreName = new ArrayList<>();

            for(int i=0; i<genre.size(); i++){
                genreName.add(genre.get(i).getGenreName());
            }

            responseDtoList.add(GameHistoryResponseDto.builder()
                    .userId(user.getUserId())
                    .gameId(gameHistory.getGame().getGameId())
                    .gameName(gameHistory.getGame().getGameName())
                    .totalPlayTime(gameHistory.getTotalPlayGame())
                    .twoWeekPlayTime(gameHistory.getTwoWeekPlayTime())
                    .genreName(genreName)
                .build());
        }

        return responseDtoList;
    }

    private static String getResponse(HttpURLConnection conn, boolean isSuccess) throws IOException {

        BufferedReader br;
        if (isSuccess) {
            br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }

        conn.disconnect();
        br.close();

        return sb.toString();
    }

    private static HttpURLConnection getHttpURLConnection(URL url) throws IOException {
        // 커넥션 객체 생성
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        // HTTP 메서드 설정
        conn.setRequestMethod("GET");

        // Content Type 설정
        conn.setRequestProperty("Content-type", "application/json");

        return conn;
    }
}
