package com.gamemakase.domain.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "review")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Review {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "review_id")
  private long reviewId;

  @OneToOne
  @JoinColumn(name = "game_id")
  private Game game;

  @OneToOne
  @JoinColumn(name = "user_id")
  private User user;

  @Column(name = "review_title", length = 200, nullable = false)
  private String reviewTitle;

  @Column(name = "review_content", columnDefinition = "TEXT", nullable = false)
  private String reviewContent;

  @Column(name = "review_grade", nullable = false)
  private int reviewGrade;

  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;
}
