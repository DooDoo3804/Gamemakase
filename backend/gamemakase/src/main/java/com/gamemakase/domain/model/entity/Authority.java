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

import lombok.*;

@Entity
@Table(name="authority")
@Getter
@Setter
@Builder
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

}
