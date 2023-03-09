package com.gamemakase.domain.model.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
public class User {
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
  private LocalDateTime createdAt;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @OneToOne
  @JoinTable(
          name = "user_authority_join",
          joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
          inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
  private Authority authority;

}
