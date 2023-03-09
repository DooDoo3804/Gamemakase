package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.ImageSaveRequestDto;
import com.gamemakase.domain.model.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {
  private final ImageRepository imageRepository;

  @Override
  public void saveFile(ImageSaveRequestDto requestDto, String image_path) {
    imageRepository.save(requestDto.toEntity(image_path));
  }
}
