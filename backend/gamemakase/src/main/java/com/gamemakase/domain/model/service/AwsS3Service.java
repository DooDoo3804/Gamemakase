package com.gamemakase.domain.model.service;

import org.springframework.web.multipart.MultipartFile;

public interface AwsS3Service {
  void UploadImage(MultipartFile file);
}
