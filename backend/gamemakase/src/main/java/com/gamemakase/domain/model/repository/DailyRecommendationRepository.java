package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.dto.GameResponseDto;
import com.gamemakase.domain.model.entity.DailyRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DailyRecommendationRepository extends JpaRepository<DailyRecommendation, Long> {

    @Query("SELECT new com.gamemakase.domain.model.dto.GameResponseDto(g.gameId, g.gameName, i.imagePath) " +
            "FROM DailyRecommendation dr " +
            "LEFT JOIN Game g ON dr.game.gameId = g.gameId " +
            "LEFT JOIN Image i ON dr.game.gameId = i.typeId " +
            "WHERE i.type = 'GAME_HEADER'")
    List<GameResponseDto> findAllAsDto();

}
