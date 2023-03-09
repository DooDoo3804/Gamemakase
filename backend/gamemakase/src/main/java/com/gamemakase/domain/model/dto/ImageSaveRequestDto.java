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
  private String type;
  private long typeId;
  private String imagePath;

  public ImageSaveRequestDto(String type, long typeId){
    this.type = type;
    this.typeId = typeId;
  }
  public Image toEntity(String imagePath){
    return Image.builder()
        .type(type)
        .typeId(typeId)
        .imagePath(imagePath)
        .build();
  }
}
