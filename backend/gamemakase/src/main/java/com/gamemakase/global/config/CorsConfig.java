package com.gamemakase.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); // 내 서버가 응답할 때, json을 자바스크립트에서 처리할 수 있게 할지를 설정하는 것
        config.addExposedHeader("accessToken"); // 노출할 헤더 설정
        config.addExposedHeader("refreshToken"); // 노출할 헤더 설정
        config.addAllowedOriginPattern("*"); // 모든 ip의 응답을 허용
        config.addAllowedHeader("*"); // 모든 header의 응답을 허용
        config.addAllowedMethod("*"); // 모든 post, put 등의 메서드에 응답을 허용
        source.registerCorsConfiguration("/**", config);    // 모든 경로에 Cors설정
        return new CorsFilter(source);
    }
}