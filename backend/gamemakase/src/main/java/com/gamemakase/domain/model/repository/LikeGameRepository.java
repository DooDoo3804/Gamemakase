package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.LikeGame;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeGameRepository extends JpaRepository<LikeGame, Long> {

    boolean existsByGameGameIdAndUserUserId(Long gameId, Long userId);

}
