package com.gamemakase.domain.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "daily_recommendation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DailyRecommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "daily_recommendation_id")
    private Long dailyRecommendationId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
