package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.SearchHistoryRequestDto;
import com.gamemakase.domain.model.dto.SearchResponseDto;
import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.entity.SearchHistory;
import com.gamemakase.domain.model.entity.User;
import com.gamemakase.domain.model.repository.*;
import com.gamemakase.domain.model.vo.GameInfoVo;
import com.gamemakase.domain.model.vo.SearchCondition;
import com.gamemakase.domain.model.vo.UserInfoVo;
import com.gamemakase.global.Exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final GameRepository gameRepository;
    private final UserRepository UserRepository;
    private final ImageRepository imageRepository;
    private final GenreRepository genreRepository;
    private final RealTimeUserInfoService realTimeUserInfoService;
    private final SearchHistoryRedisRepository searchHistoryRedisRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public SearchResponseDto getSearchResult(String niddle, int gamePageNo, int userPageNo) throws IOException, ParseException, NotFoundException {
        Pageable GamePageable = PageRequest.of(gamePageNo, 12);
        Page<Game> gameList = gameRepository.findAllByGameNameLikeOrderByGameName("%" + niddle + "%", GamePageable);
        List<GameInfoVo> gameResults = gameList.stream()
                .map(g -> GameInfoVo.of(
                                g,
                                imageRepository.findByTypeAndTypeId("GAME_HEADER", g.getGameId()).orElse(null).getImagePath(),
                                genreRepository.findAllByGame(g)
                        )
                )
                .collect(Collectors.toList());

        Pageable UserPageable = PageRequest.of(userPageNo, 5);
        Page<User> userPagedList = UserRepository.findAllByUserNameLikeOrderByUserName("%" + niddle + "%", UserPageable);
        List<User> userList = userPagedList.stream()
                .map(u -> u).collect(Collectors.toList());
        List<UserInfoVo> userResults = realTimeUserInfoService.getUserInfoResponseVo(userList);

        return SearchResponseDto.builder()
                .games(gameResults)
                .users(userResults)
                .build();
    }

    @Override
    public List<GameInfoVo> getSearchGameResult(String niddle, int gamePageNo)
            throws IOException, ParseException, NotFoundException {
        Pageable GamePageable = PageRequest.of(gamePageNo, 12);
        Page<Game> gameList = gameRepository.findAllByGameNameLikeOrderByGameName("%" + niddle + "%", GamePageable);
        return gameList.stream()
                .map(g -> GameInfoVo.of(g, imageRepository.findByTypeAndTypeId("GAME_HEADER", g.getGameId()).orElse(null).getImagePath()))
                .collect(Collectors.toList());
    }

    @Override
    public List<UserInfoVo> getSearchUserResult(String niddle, int userPageNo)
            throws IOException, ParseException, NotFoundException {
        Pageable UserPageable = PageRequest.of(userPageNo, 5);
        Page<User> userPagedList = UserRepository.findAllByUserNameLikeOrderByUserName("%" + niddle + "%", UserPageable);
        List<User> userList = userPagedList.stream()
                .map(u -> u).collect(Collectors.toList());
        return realTimeUserInfoService.getUserInfoResponseVo(userList);
    }

    @Override
    public List<GameInfoVo> getSearchResultByCondition(SearchCondition condition) {
        List<Game> gameList = searchGameByCondition(condition);
        List<GameInfoVo> gameResults = gameList.stream()
                .map(g -> GameInfoVo.of(
                                g,
                                imageRepository.findByTypeAndTypeId("GAME_HEADER", g.getGameId()).orElse(null).getImagePath(),
                                genreRepository.findAllByGame(g)
                        )
                )
                .collect(Collectors.toList());
        return gameResults;
    }

    @Override
    public List<Game> searchGameByCondition(SearchCondition condition) {
        List<String> genreList = condition.getGenreList();
        String jpql = "select g from Game g " +
                "where upper(g.gameName) like :niddle " +
                "and g.gamePrice <= :price ";
        if (condition.isKorean()) {
            jpql += "and g.isKorean = 1 ";
        }
        for (int i = 0; i < genreList.size(); i++) {
            String sentance = "and :genre" + i + " in (select gen.genreName from Genre gen where gen.game.gameId = g.gameId) ";
            jpql += sentance;
        }
        jpql += "order by g.gameName";
        TypedQuery<Game> query = entityManager.createQuery(jpql, Game.class)
                .setParameter("niddle", "%" + condition.getNiddle().toUpperCase() + "%")
                .setParameter("price", condition.getPrice());
        for (int i = 0; i < genreList.size(); i++) {
            query.setParameter("genre" + i, genreList.get(i));
        }
        query.setFirstResult(condition.getOffset());
        query.setMaxResults(condition.getLimit());
        return query.getResultList();
    }

    @Override
    // max 저장 갯수는 20개로 설정합니다.
    public void insertSearchHistory(SearchHistoryRequestDto searchHistory) {
        Optional<SearchHistory> historyEntity = searchHistoryRedisRepository.findById(String.valueOf(searchHistory.getUserId()));
        Map<String, LocalDateTime> historyContents = historyEntity.get().getContent();
        if (historyEntity.isPresent() && historyContents != null) {
            if (historyContents.size() > 20) {
                List<String> entry = new ArrayList<>(historyContents.keySet());
                Collections.sort(entry, new Comparator<String>() {
                            @Override
                            public int compare(String o1, String o2) {
                                return historyContents.get(o1).compareTo(historyContents.get(o2));
                            }
                        }
                );
                historyContents.remove(entry.get(0)); // 20개가 넘었으면 하나 삭제
            }
            historyContents.put(searchHistory.getContent(), LocalDateTime.now());
            searchHistoryRedisRepository.save(SearchHistory.builder()
                    .idx(String.valueOf(searchHistory.getUserId()))
                    .content(historyContents)
                    .build());
        } else {
            Map<String, LocalDateTime> newContens = new HashMap<>();
            newContens.put(searchHistory.getContent(), LocalDateTime.now());
            searchHistoryRedisRepository.save(SearchHistory.builder()
                    .idx(String.valueOf(searchHistory.getUserId()))
                    .content(newContens)
                    .build());
        }
    }

    @Override
    public List<String> getSearchHistory(long userId) {
        Optional<SearchHistory> historyEntity = searchHistoryRedisRepository.findById(String.valueOf(userId));
        if (historyEntity.isPresent() && historyEntity.get().getContent() != null) {
            List<String> entry = new ArrayList<>(historyEntity.get().getContent().keySet());
            Collections.sort(entry, new Comparator<String>() {
                        @Override
                        public int compare(String o1, String o2) {
                            return historyEntity.get().getContent().get(o2).compareTo(historyEntity.get().getContent().get(o1));
                        }
                    }
            );
            return entry;
        } else return null;
    }

    @Override
    public void deleteAllSearchHistory(long userId) {
        Optional<SearchHistory> historyEntity = searchHistoryRedisRepository.findById(String.valueOf(userId));
        if (historyEntity.isPresent()) {
            searchHistoryRedisRepository.delete(historyEntity.get());
        }
    }

    @Override
    public void deleteSearchHistory(long userId, String content) {
        Optional<SearchHistory> historyEntity = searchHistoryRedisRepository.findById(String.valueOf(userId));
        if (historyEntity.isPresent()) {
            Map<String, LocalDateTime> historyMap = historyEntity.get().getContent();
            historyMap.remove(content);
            searchHistoryRedisRepository.save(historyEntity.get());
        }
    }
}
