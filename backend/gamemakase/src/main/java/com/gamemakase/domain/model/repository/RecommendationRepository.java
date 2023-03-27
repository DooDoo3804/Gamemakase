package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.dto.RecommendationResponseDto;
import com.gamemakase.domain.model.entity.Recommendation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findAllByGameGameIdOrderByRatingDesc(Long gameId);

    Page<Recommendation> findAllByUserUserIdOrderByRatingDesc(Long userId, Pageable pageable);

    @Query("SELECT new com.gamemakase.domain.model.dto.RecommendationResponseDto(r.game.gameId, r.game.gameName, i.imagePath, r.rating) " +
            "FROM Recommendation r " +
            "JOIN  r.game " +
            "LEFT JOIN Image i " +
            "ON r.game.gameId = i.typeId " +
            "WHERE i.type = 'GAME_HEADER' AND r.user.userId = :userId")
    Page<RecommendationResponseDto> findAllWithGameImageByUserId(@Param("userId") Long userId, Pageable pageable);


}
