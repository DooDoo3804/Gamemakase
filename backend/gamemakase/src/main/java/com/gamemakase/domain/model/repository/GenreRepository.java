package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {
}
