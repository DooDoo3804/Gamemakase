package com.gamemakase.domain.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tendency_test")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TendencyTest {
  @Id
  @Column(name = "tendency_quest", length = 100)
  private String tendencyQuest;

  @Column(name = "tendency_comm", length = 20)
  private String tendencyComm;
}
