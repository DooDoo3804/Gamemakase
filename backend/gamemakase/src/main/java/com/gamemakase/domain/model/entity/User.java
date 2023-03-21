package com.gamemakase.domain.model.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
public class User implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private long userId;

  @Column(name = "user_email", nullable = false, length = 40)
  private String userEmail;

  @JsonProperty(access = Access.WRITE_ONLY)
  @Column(name = "user_password", nullable = false, length = 40)
  private String userPassword;

  @Column(name = "user_steam_id", nullable = false)
  private long userSteamId;
  @Column(name = "user_name", length = 40, nullable = false)
  private String userName;

  @Column(name = "created_at")
  @CreatedDate
  private LocalDateTime createdAt;

  @Column(name = "updated_at")
  @LastModifiedDate
  private LocalDateTime updatedAt;

  @OneToOne
  @JoinTable(
          name = "user_authority_join",
          joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
          inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
  private Authority authority;

}
