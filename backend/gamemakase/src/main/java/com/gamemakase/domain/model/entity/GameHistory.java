package com.gamemakase.domain.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
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

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @OneToOne
  @JoinColumn(name = "game_id")
  private Game game;

  @Column(name = "total_play_game")
  private int totalPlayGame;

  @Column(name = "two_week_play_time")
  private int twoWeekPlayTime;

}
