package com.gamemakase.domain.model.entity;

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
@Table(name = "image")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Image {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "image_id")
  private long imageId;

  @Column(name = "type", length = 10, nullable = false)
  private String type;

  @Column(name = "type_id", nullable = false)
  private long typeId;

  @Column(name = "image_path", length = 100, nullable = false)
  private String imagePath;
}
