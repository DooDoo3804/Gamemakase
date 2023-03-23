package com.gamemakase.domain.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.entity.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long>{
	List<Genre> findAllByGame(Game game);
    List<Genre> findAllByGameGameId(Long gameId);
}
