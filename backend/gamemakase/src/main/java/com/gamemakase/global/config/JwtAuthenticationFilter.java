package com.gamemakase.global.config;

import com.gamemakase.global.util.JwtTokenProvider;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
  private final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
  private final JwtTokenProvider jwtTokenProvider;

  public JwtAuthenticationFilter (JwtTokenProvider jwtTokenProvider) {
    this.jwtTokenProvider =  jwtTokenProvider;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    String token = jwtTokenProvider.resolveToken(request);
    LOGGER.info("[doFilterInternal] token 값 추출 완료. token : {}", token);

    LOGGER.info("[doFilterInternal] token 값 유효성 체크 시작");
    if(token != null && jwtTokenProvider.validateToken(token)){
      Authentication authentication = jwtTokenProvider.getAuthentication(token);
      SecurityContextHolder.getContext().setAuthentication(authentication);
      LOGGER.info("[doFilterInternal] token 값 유효성 체크 완료");
    }

    filterChain.doFilter(request, response);
  }
}
