package com.gamemakase.domain.model.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tendency_result")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TendencyResult {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "tendency_result_id")
  private long tendencyResultId;

  @Column(name = "tendency_result", length = 20)
  private String tendencyResult;

  @Column(name = "created_at")
  private LocalDateTime createdAt;

}
