package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.GameVideo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameVideoRepository extends JpaRepository<GameVideo, Long> {

    List<GameVideo> findAllByGameGameId (Long gameId);

}
