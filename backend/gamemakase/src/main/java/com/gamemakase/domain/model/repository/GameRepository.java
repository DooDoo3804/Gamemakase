package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.Game;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {
    Optional<Game> findByGameId(Long gameId);
    
    @Query(value = "select * from game g where upper(g.game_name) like upper(:gameName) order by g.gameName"
    		, nativeQuery = true)
    Page<Game> findAllByGameNameLikeOrderByGameName(String gameName, Pageable pageable);
    
}
