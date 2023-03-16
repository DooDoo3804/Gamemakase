package com.gamemakase.domain.controller;

import com.gamemakase.domain.model.dto.SteamLoginRequestDto;
import com.gamemakase.global.config.OpenIdAuthentication;
import io.swagger.annotations.Api;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.openid4java.consumer.ConsumerException;
import org.openid4java.consumer.ConsumerManager;
import org.openid4java.consumer.VerificationResult;
import org.openid4java.discovery.DiscoveryException;
import org.openid4java.message.AuthRequest;
import org.openid4java.message.MessageException;
import org.openid4java.message.Parameter;
import org.openid4java.message.ParameterList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.security.Principal;

@RestController
@Api(value = "Steam Controller")
@RequiredArgsConstructor
public class SteamController {

    private ConsumerManager consumerManager = new ConsumerManager();
    private static final Logger logger = LoggerFactory.getLogger(SteamController.class);

    @GetMapping("/api/login/steam") // 스팀 로그인 이미지랑 연동
    public String steamLogin(HttpServletResponse response) throws IOException{
        String steamLoginUrl = "http://steamcommunity.com/openid/login?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=http://localhost:8080&openid.return_to=http://localhost:8080/login/steam/callback";

        response.sendRedirect(steamLoginUrl);
        return null;
    }

    @GetMapping("/login/steam/callback")
    public ResponseEntity<?> steamLoginCallBack(HttpServletRequest request, HttpServletResponse response) throws Exception {
        ParameterList res = new ParameterList(request.getParameterMap());
        Map<String, String> identity = new HashMap<>();

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("http://www.gamemakase.com:3000"));

        String steamId = res.getParameters().get(4).toString().substring(53);

        if(steamId != null || steamId.length() != 0){
            //로그인, 토큰발급
        } else {
            // 회원가입
        }

        identity.put("steamId", steamId);

        logger.info(identity.get("steamId"));
        return new ResponseEntity<>(identity.get("steamId"), headers, HttpStatus.MOVED_PERMANENTLY);
    }

    @GetMapping(value = "/login/social")
    public String index(
            @RequestParam(value = "fail", required = false) String fail,
            Model model, Principal principal
    ) {
        if (principal != null) {
            System.out.println("로그인됨");
        }

        if (fail != null) {
            model.addAttribute("msg", "Failed to login through Steam");
        }

        return "index";
    }
}
