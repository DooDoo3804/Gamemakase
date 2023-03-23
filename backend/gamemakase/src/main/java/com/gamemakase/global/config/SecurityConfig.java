package com.gamemakase.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.gamemakase.global.config.jwt.JwtAccessDeniedHandler;
import com.gamemakase.global.config.jwt.JwtAuthenticationEntryPoint;
import com.gamemakase.global.config.jwt.JwtSecurityConfig;
import com.gamemakase.global.config.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final JwtTokenProvider jwtTokenProvider;
  private final CorsFilter corsFilter;
  private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
  private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
    httpSecurity.csrf().disable()
            .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling()
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .accessDeniedHandler(jwtAccessDeniedHandler)

            // iframe 접근 허용
            .and()
            .headers()
            .frameOptions()
            .sameOrigin()

            // 세션을 사용하지 않기 때문에 STATELESS로 설정
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

            .and()
            .authorizeRequests()
            .antMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-resources/**").permitAll()
            .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
            .antMatchers("/auth/**").authenticated()
            .antMatchers("/api/**").permitAll()
            .anyRequest().permitAll()

            .and()
            .cors().configurationSource(corsConfigurationSource())

            .and()
            .apply(new JwtSecurityConfig(jwtTokenProvider));
    return httpSecurity.build();

  }
  @Bean
  public WebSecurityCustomizer webSecurityCustomizer() {
    return (web) ->
            web.ignoring().antMatchers("/h2-console/**" ,"/favicon.ico");
  }
  
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
	  CorsConfiguration config = new CorsConfiguration();
      config.setAllowCredentials(true); // 내 서버가 응답할 때, json을 자바스크립트에서 처리할 수 있게 할지를 설정하는 것
      config.addExposedHeader("accessToken"); // 노출할 헤더 설정
      config.addExposedHeader("refreshToken"); // 노출할 헤더 설정
      config.addAllowedOriginPattern("*"); // 모든 ip의 응답을 허용
      config.addAllowedHeader("*"); // 모든 header의 응답을 허용
      config.addAllowedMethod("*"); // 모든 post, put 등의 메서드에 응답을 허용
      
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", config);    // 모든 경로에 Cors설정
      return source;
  }

}
