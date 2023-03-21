package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    boolean existsByGameGameIdAndUserUserId(Long gameId, Long userId);

    List<Review> findAllByGameGameId(Long gameId);
}
