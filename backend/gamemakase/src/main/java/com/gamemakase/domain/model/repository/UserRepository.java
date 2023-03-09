package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  User findByUserName(String userName);
  User findByUserId(Long uid);
  User findByUserEmail(String email);
  User findByUserSteamId(long userSteamId);
  User findByUserEmailAndUserPassword(String userEmail, String userPassword);
}
