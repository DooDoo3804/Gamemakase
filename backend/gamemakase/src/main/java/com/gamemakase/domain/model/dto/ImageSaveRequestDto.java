package com.gamemakase.domain.model.dto;

import com.gamemakase.domain.model.entity.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ImageSaveRequestDto {

  public Image toProfile(String imagePath, long typeId){
    return Image.builder()
        .type("profile")
        .typeId(typeId)
        .imagePath(imagePath)
        .build();
  }

  public Image toGame(String imagePath, long typeId){
    return Image.builder()
        .type("game")
        .typeId(typeId)
        .imagePath(imagePath)
        .build();
  }

}
