package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.GameHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameHistoryRepository extends JpaRepository<GameHistory, Long> {

    boolean existsByGameGameIdAndUserUserId(Long gameId, Long userId);
}
