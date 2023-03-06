package com.gamemakase.domain.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="authority_name")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Authority {
  @Getter
  public enum AuthorityName{
    ROLE_USER, ROLE_ADMIN;
  }
  @Id
  @Enumerated(EnumType.STRING)
  @Column(name = "authority_name")
  private AuthorityName authorityName;

  @OneToOne
  @JoinTable(name = "user_authority_join", joinColumns = @JoinColumn(name = "authority_name"),
              inverseJoinColumns = @JoinColumn(name = "authority_name"))
  private User user;
}
