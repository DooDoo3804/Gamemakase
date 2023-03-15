package com.gamemakase.domain.controller;

import com.gamemakase.domain.model.dto.SteamLoginRequestDto;
import com.gamemakase.global.config.OpenIdAuthentication;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.openid4java.message.ParameterList;
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

    private final OpenIdAuthentication openIdAuthentication;

    public SteamController(){
        openIdAuthentication = new OpenIdAuthentication();
    }

    @GetMapping("/api/login/steam")
    public String steamLogin(HttpServletResponse response) throws IOException {
        String steamLoginUrl = "http://steamcommunity.com/openid/login?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=http://localhost:8080&openid.return_to=http://localhost:8080/login/steam/callback";
        response.sendRedirect("http://steamcommunity.com/openid/login?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=http://localhost:8080&openid.return_to=http://localhost:8080/login/steam/callback");
        return null;
    }

    @GetMapping("/login/steam/callback")
    public String steamLoginCallBack(HttpServletRequest request) throws Exception {
        ParameterList response = new ParameterList(request.getParameterMap());
        System.out.println(response.getParameters());
        System.out.println(request.getUserPrincipal());
        System.out.println(request.getRequestURI());
        System.out.println(request.getHeaderNames());
        System.out.println(request.getAuthType());
        return "ResponseEntity.status(200).build()";
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
