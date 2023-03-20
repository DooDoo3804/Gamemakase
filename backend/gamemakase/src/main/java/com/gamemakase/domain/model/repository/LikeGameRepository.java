package com.gamemakase.domain.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gamemakase.domain.model.entity.LikeGame;
import com.gamemakase.domain.model.entity.User;

public interface LikeGameRepository extends JpaRepository<LikeGame, Long> {
	List<LikeGame> findAllByUser(User user);
}
