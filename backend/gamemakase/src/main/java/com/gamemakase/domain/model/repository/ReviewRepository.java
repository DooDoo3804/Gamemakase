package com.gamemakase.domain.model.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gamemakase.domain.model.entity.Review;
import com.gamemakase.domain.model.entity.User;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
	Long countByUser(User user);

    Page<Review> findAllByUser(User user, Pageable pageable);

    boolean existsByGameGameIdAndUserUserId(Long gameId, Long userId);

    List<Review> findAllByGameGameId(Long gameId);

}
