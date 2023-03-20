package com.gamemakase.domain.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gamemakase.domain.model.entity.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
  Optional<Image> findByTypeAndTypeId(String type, long typeId);
}
