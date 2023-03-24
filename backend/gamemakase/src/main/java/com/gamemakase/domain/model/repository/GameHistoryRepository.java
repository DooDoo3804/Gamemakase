package com.gamemakase.domain.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gamemakase.domain.model.entity.GameHistory;
import com.gamemakase.domain.model.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GameHistoryRepository extends JpaRepository<GameHistory, Long>{
	List<GameHistory> findAllByUser(User user);

    boolean existsByGameGameIdAndUserUserId(Long gameId, Long userId);

    @Query("SELECT gh FROM GameHistory gh JOIN FETCH gh.user u WHERE gh.game.gameId = :gameId ORDER BY gh.totalPlayGame DESC")
    List<GameHistory> findAllByGameGameIdOrderByTotalPlayGameDesc(@Param("gameId") Long gameId);



}
