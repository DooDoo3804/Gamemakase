package com.gamemakase.global.config.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider implements InitializingBean {

    private final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);
    private static final String AUTHORITIES_KEY = "auth";
    private final String secret;
    private final long accessTokenValidityInMilliSeconds;
    private final long refreshTokenValidityInMilliSeconds;
    private Key key;

    public JwtTokenProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.accesstoken-validity-in-seconds}") long accessTokenValidityInMilliSeconds,
            @Value("${jwt.refreshtoken-validity-in-seconds}") long refreshTokenValidityInMilliSeconds) {
        this.secret = secret;
        this.accessTokenValidityInMilliSeconds = accessTokenValidityInMilliSeconds;
        this.refreshTokenValidityInMilliSeconds = refreshTokenValidityInMilliSeconds;
    }

    @Override
    public void afterPropertiesSet() { // secret 값을 decode 하여 key 값에 저장
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // 토큰 생성
    public String createToken(com.gamemakase.domain.model.entity.User user, long times) {
        Date expirationTime = new Date(System.currentTimeMillis() + times); // 만료 일자를 계산한다.
        String authority = user.getAuthority().getAuthorityName().name();
        System.out.println(authority);
        return Jwts.builder()
                .setSubject(String.valueOf(user.getUserId()))
                .claim(AUTHORITIES_KEY, authority)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(expirationTime)
                .compact();
    }

    // 토큰을 입력받아 권한 정보를 리턴한다.
    public Authentication getAuthentication(String token) {
        System.out.println(token);
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        String[] role = {claims.get(AUTHORITIES_KEY).toString()};
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(role)
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        User principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, token, authorities); //
    }

    // 토큰을 받아 유효성 검사를 실행
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            logger.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            logger.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            logger.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            logger.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    public String createAccessToken(com.gamemakase.domain.model.entity.User user) {
        return createToken(user, this.accessTokenValidityInMilliSeconds);
    }

    public String createRefreshToken(com.gamemakase.domain.model.entity.User user) {
        return createToken(user, this.refreshTokenValidityInMilliSeconds);
    }

}
