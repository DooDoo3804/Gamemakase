package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
