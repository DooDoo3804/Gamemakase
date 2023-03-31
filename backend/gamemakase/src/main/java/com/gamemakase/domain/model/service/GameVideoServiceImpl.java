package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.entity.GameVideo;
import com.gamemakase.domain.model.repository.GameRepository;
import com.gamemakase.domain.model.repository.GameVideoRepository;
import com.gamemakase.domain.model.vo.GameVideoVo;
import com.google.api.services.youtube.model.SearchResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameVideoServiceImpl implements GameVideoService{

    private final GameVideoRepository gameVideoRepository;
    private final GameRepository gameRepository;
    private final YoutubeApiService youtubeApiService;
    private final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);


    @Override
    public List<GameVideoVo> getOrUpdateVideoPathByGameId(Long gameId) {
        List<GameVideo> gameVideos = gameVideoRepository.findAllByGameGameId(gameId);
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneWeekAgo = now.minusWeeks(1);

//        기존에 저장된 영상이 없는 경우
        if (gameVideos.isEmpty()) {
            List<SearchResult> resultList = youtubeApiService.getGameYoutubeVideo(gameId);
//            검색 결과로부터 새로운 영상 엔티티 생성해서 저장
            List<GameVideo> collect = resultList.stream()
                    .map(r -> GameVideo.builder()
                            .youtubeId(r.getId().getVideoId())
                            .youtubeName(r.getSnippet().getTitle())
                            .game(gameRepository.findByGameId(gameId).get())
                            .createdAt(LocalDateTime.now())
                            .build())
                    .collect(Collectors.toList());

            gameVideos = gameVideoRepository.saveAll(collect);
            logger.info("added " + gameVideos.size() + " videos for " + gameId);
//            영상은 존재하지만 예전 영상인 경우
        } else if (gameVideos.stream().anyMatch(v -> v.getCreatedAt().isBefore(oneWeekAgo))) {
//            기존 디비에 저장되어있던 영상 새로운 영상으로 업데이트
            List<SearchResult> resultList = youtubeApiService.getGameYoutubeVideo(gameId);
            List<GameVideo> finalGameVideos = gameVideos;
//            영상이 2개라서 intstream으로 기존 비디오 1/2 -> 새 비디오 1/2에 업데이트했습니다.
            IntStream.range(0, Math.min(gameVideos.size(), 2))
                            .forEach(i -> {
                                GameVideo gameVideo = finalGameVideos.get(i);
                                SearchResult searchResult = resultList.get(i);

                                gameVideo.setYoutubeId(searchResult.getId().getVideoId());
                                gameVideo.setYoutubeName(searchResult.getSnippet().getTitle());
                                gameVideo.setCreatedAt(now);

                                gameVideoRepository.save(gameVideo);
                                logger.info("updated video " + gameVideo.getYoutubeName() + " for " + gameId);
                            });
        }

//
        return gameVideos.stream()
                .map(v -> GameVideoVo.builder()
                        .youtubeId(v.getYoutubeId())
                        .youtubeName(v.getYoutubeName())
                        .build())
                .collect(Collectors.toList());
    }
}
