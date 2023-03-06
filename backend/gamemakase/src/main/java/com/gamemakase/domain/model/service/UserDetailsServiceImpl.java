package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.entity.UserDetails;
import com.gamemakase.domain.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService{

  private final Logger LOGGER = LoggerFactory.getLogger(UserDetailsServiceImpl.class);
  private final UserRepository userRepository;
  @Override
  public UserDetails loadUserByUsername(String username) {
    LOGGER.info("[loadUserByUsername] loadUserByUsername 수행. username : {}", username);
    return userRepository.findByUserName(username);
  }
}
