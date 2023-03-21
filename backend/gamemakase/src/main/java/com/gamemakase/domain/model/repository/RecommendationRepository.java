package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findAllByGameIdGameIdOrderByRatingDesc(Long gameId);
}
