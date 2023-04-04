package com.gamemakase.domain.model.entity;

import javax.persistence.*;

import lombok.*;

@Entity
@Table(name = "like_game")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikeGame {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "like_id")
  private long likeId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "game_id")
  private Game game;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @Column(name = "type", length = 20, nullable = false)
  private String type;
}
