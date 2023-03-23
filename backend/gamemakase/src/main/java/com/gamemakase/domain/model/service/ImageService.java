package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.ImageSaveRequestDto;

public interface ImageService {
  void saveProfileImage(ImageSaveRequestDto requestDto, String imagePath, long typeId);

  void saveGameImage(ImageSaveRequestDto requestDto, String imagePath, long typeId);
}
