package com.gamemakase.domain.model.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gamemakase.domain.model.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
  User findByUserName(String userName);
  User findByUserId(Long uid);
  User findByUserSteamId(long userSteamId);
  boolean existsByUserId(Long userId);
//  User findByUserEmailAndUserPassword(String userEmail, String userPassword);
  Page<User> findAllByUserNameLikeOrderByUserName(String userName, Pageable pageable);
}
