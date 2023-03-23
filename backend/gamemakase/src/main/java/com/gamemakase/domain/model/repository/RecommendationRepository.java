package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.Recommendation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findAllByGameGameIdOrderByRatingDesc(Long gameId);
    Page<Recommendation> findAllByUserUserIdOrderByRatingDesc(Long userId, Pageable pageable);
}
