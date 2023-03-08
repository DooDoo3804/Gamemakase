package com.gamemakase.domain.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "chatting_room")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChattingRoom {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "chatting_room_id")
  private long chattingRoomId;

  @ManyToOne
  @JoinColumn(name = "game_id")
  private ChattingRoom chattingRoom;

  @Column(name = "chatting_room_name", length = 40)
  private String chattingRoomName;

  @Column(name = "game")
  private int game;

}
