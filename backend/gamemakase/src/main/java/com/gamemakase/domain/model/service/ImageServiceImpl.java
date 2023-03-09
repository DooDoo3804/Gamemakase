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
  public void saveProfileImage(ImageSaveRequestDto requestDto, String imagePath, long typeId) {
    imageRepository.save(requestDto.toProfile(imagePath, typeId));
  }

  @Override
  public void saveGameImage(ImageSaveRequestDto requestDto, String imagePath, long typeId) {
    imageRepository.save(requestDto.toGame(imagePath, typeId));
  }
}
