package com.gamemakase.domain.model.dto;

import com.gamemakase.domain.model.entity.Genre;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
public class GameHistoryResponseDto {
  private long gameId;
  private long userId;

  private String gameName;
  private int totalPlayTime;
  private int twoWeekPlayTime;
  private List<String> genreName;
}
