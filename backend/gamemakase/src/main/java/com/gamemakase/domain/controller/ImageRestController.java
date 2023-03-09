package com.gamemakase.domain.controller;

import com.gamemakase.domain.model.service.AwsS3Service;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class ImageRestController {
  private final AwsS3Service awsS3Service;

  @PostMapping(value = "/profile/images/new")
  public ResponseEntity<?> profileUploadImage(@RequestParam("file") MultipartFile multipartFile) throws IOException, NoSuchAlgorithmException {
    awsS3Service.uploadProfileImage(multipartFile);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PostMapping(value = "/game/images/new")
  public ResponseEntity<?> gameUploadImage(@RequestPart("files") List<MultipartFile> multipartFiles) {
    awsS3Service.uploadGameImage(multipartFiles);
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
