package com.gamemakase.domain.model.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.*;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Game {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "game_id")
  private long gameId;

  @Column(name = "game_name", length = 40, nullable = false)
  private String gameName;

  @Column(name = "game_price", nullable = false)
  private int gamePrice;

  @Column(name = "release_date")
  private LocalDateTime releaseDate;

  @Column(name = "game_description", length = 200)
  private String gameDescription;

  @Column(name = "score")
  private int score;

  @Column(name = "average_playtime")
  private int averagePlaytime;

  @Column(name = "publisher", length = 100)
  private String publisher;

  @Column(name = "is_korean")
  private boolean isKorean;

  @Column(name = "windows")
  private boolean windows;

  @Column(name = "mac")
  private boolean mac;

  @Column(name = "linux")
  private boolean linux;

  @Column(name = "peak_ccu")
  private Integer peakCcu;

  @Column(name = "average_playtime_2weeks")
  private Integer averagePlaytime2Weeks;

  @Column(name = "recommendations")
  private Integer recommendations;

  @Column(name = "estimated_owners")
  private String estimatedOwners;

  @Column(name = "reviews")
  private String reviews;


}
