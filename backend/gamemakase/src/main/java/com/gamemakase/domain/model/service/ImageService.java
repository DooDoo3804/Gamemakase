package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.ImageSaveRequestDto;

public interface ImageService {
  void saveFile(ImageSaveRequestDto requestDto, String imagePath);
}
