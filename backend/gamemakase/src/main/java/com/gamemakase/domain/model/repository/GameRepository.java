package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {


}
