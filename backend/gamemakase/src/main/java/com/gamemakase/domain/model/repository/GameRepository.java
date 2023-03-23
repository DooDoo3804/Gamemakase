package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.Game;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {
    Optional<Game> findByGameId(Long gameId);
    
    @Query(value = "select * from game where upper(game_name) like upper(:gameName) order by game_name"
    		, nativeQuery = true)
    Page<Game> findAllByGameNameLikeOrderByGameName(@Param("gameName") String gameName, Pageable pageable);
    
}
