package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.entity.GameHistory;
import com.gamemakase.domain.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GameHistoryRepository extends JpaRepository<GameHistory, Long>{
	List<GameHistory> findAllByUser(User user);
    List<GameHistory> findByUserUserId(long userId);
    boolean existsByGameGameIdAndUserUserId(Long gameId, Long userId);

    Optional<GameHistory> findByUserAndGame(User user, Game game);
    @Query("SELECT gh FROM GameHistory gh JOIN FETCH gh.user u WHERE gh.game.gameId = :gameId ORDER BY gh.totalPlayGame DESC")
    List<GameHistory> findAllByGameGameIdOrderByTotalPlayGameDesc(@Param("gameId") Long gameId);

}
