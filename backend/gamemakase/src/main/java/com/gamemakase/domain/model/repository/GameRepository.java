package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {

    Optional<Game> findByGameId(Long gameId);
    List<Game> findTop100ByOrderByPeakCcuDesc();


}
