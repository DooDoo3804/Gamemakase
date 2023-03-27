package com.gamemakase.domain.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gamemakase.domain.model.entity.GameHistory;
import com.gamemakase.domain.model.entity.User;

public interface GameHistoryRepository extends JpaRepository<GameHistory, Long>{
	List<GameHistory> findAllByUser(User user);
    boolean existsByGameGameIdAndUserUserId(Long gameId, Long userId);
}
