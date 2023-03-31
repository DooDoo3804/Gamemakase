package com.gamemakase.domain.model.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "game_video")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameVideo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_video_id")
    private Long gameVideoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    @Column(name = "youtube_id")
    private String youtubeId;

    @Column(name = "youtube_name")
    private String youtubeName;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

}
