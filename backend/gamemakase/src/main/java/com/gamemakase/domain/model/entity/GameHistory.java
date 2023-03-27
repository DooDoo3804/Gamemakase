package com.gamemakase.domain.model.entity;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "game_history")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameHistory {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "game_history_id")
  private long gameHistoryId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "game_id")
  private Game game;

  @Column(name = "total_play_game")
  private int totalPlayGame;

  @Column(name = "two_week_play_time")
  private int twoWeekPlayTime;

}
