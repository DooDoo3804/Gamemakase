package com.gamemakase.global.config;

import com.gamemakase.global.util.CustomAccessDeniedHandler;
import com.gamemakase.global.util.CustomAuthenticationEntryPoint;
import com.gamemakase.global.util.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
  private final JwtTokenProvider jwtTokenProvider;

  @Autowired
  public SecurityConfiguration(JwtTokenProvider jwtTokenProvider) {
    this.jwtTokenProvider = jwtTokenProvider;
  }

  @Override
  protected void configure(HttpSecurity httpSecurity) throws Exception{
    httpSecurity.httpBasic().disable()

        .csrf().disable()

        .sessionManagement()
        .sessionCreationPolicy(
            SessionCreationPolicy.STATELESS)

        .and()
        .authorizeRequests()
        .antMatchers().permitAll()
        .antMatchers(HttpMethod.GET, "").permitAll()
        .antMatchers("**exception**").permitAll()

        .anyRequest().hasRole("ADMIN")

        .and()
        .exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler())
        .and()
        .exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint())

        .and()
        .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
  }

  @Override
  public void configure(WebSecurity webSecurity){
    webSecurity.ignoring().antMatchers();
  }
}
