package com.gamemakase.domain.model.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface AwsS3Service {
  void uploadProfileImage(MultipartFile file);

  void uploadGameImage(List<MultipartFile> files);
}
