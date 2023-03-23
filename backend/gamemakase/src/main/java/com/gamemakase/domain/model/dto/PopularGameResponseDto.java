package com.gamemakase.domain.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PopularGameResponseDto {

    Long gameId;

    String gameName;
    String gameImage;
}
