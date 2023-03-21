package com.gamemakase.domain.model.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gamemakase.domain.model.entity.LikeGame;
import com.gamemakase.domain.model.entity.User;

public interface LikeGameRepository extends JpaRepository<LikeGame, Long> {
	Page<LikeGame> findAllByUser(User user, Pageable page);

    boolean existsByGameGameIdAndUserUserId(Long gameId, Long userId);

}
