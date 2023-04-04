package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.LikeGame;
import com.gamemakase.domain.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeGameRepository extends JpaRepository<LikeGame, Long> {
	Page<LikeGame> findAllByUserOrderByLikeIdDesc(User user, Pageable page);
    List<LikeGame> findAllByUser(User user);

    boolean existsByGameGameIdAndUserUserId(Long gameId, Long userId);
    Optional<LikeGame> findByGameGameIdAndUserUserId(Long gameId, Long userId);

}
