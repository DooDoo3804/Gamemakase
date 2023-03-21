package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.Image;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
  List<Image> findAll();
  Optional<Image> findByImageId(Long imageId);

  List<Image> findAllByTypeAndTypeId(String type, Long typeId);

  Optional<Image> findByTypeAndTypeId(String type, Long typeId);
}
