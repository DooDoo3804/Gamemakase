package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.User;
import com.gamemakase.domain.model.entity.UserDetails;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  User findByUserName(String userName);
  User findByUserId(Long uid);
  User findByUserSteamId(long userSteamId);
  boolean existsByUserId(Long userId);
//  User findByUserEmailAndUserPassword(String userEmail, String userPassword);
}
