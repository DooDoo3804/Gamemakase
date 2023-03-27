package com.gamemakase.domain.model.dto;

import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.entity.GameHistory;
import com.gamemakase.domain.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameHistoryInsertRequestDto {
  private long userId;
  private long gameId;

  private Integer totalPlayGame;
  private Integer twoWeekPlayGame;

  @Builder
  public static GameHistory toEntity(int totalPlayGame, int twoWeekPlayGame, Game game, User user){
    return GameHistory.builder()
        .user(user)
        .game(game)
        .totalPlayGame(totalPlayGame)
        .twoWeekPlayTime(twoWeekPlayGame)
        .build();
  }

}
