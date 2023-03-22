package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.Game;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {
    Optional<Game> findByGameId(Long gameId);
    Page<Game> findAllByGameNameLikeOrderByGameName(String gameName, Pageable pageable);
}
