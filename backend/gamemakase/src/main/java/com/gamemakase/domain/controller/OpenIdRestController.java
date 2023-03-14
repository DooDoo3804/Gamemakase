package com.gamemakase.domain.controller;

import com.gamemakase.global.config.OpenIdAuthentication;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequiredArgsConstructor
public class OpenIdRestController {
  private final OpenIdAuthentication openIdAuthentication;

  public OpenIdRestController(){
    openIdAuthentication = new OpenIdAuthentication();
  }

  @GetMapping(value = "/login")
  public String showLoginForm(){
    return "login";
  }

  @PostMapping(value = "/authenticate")
  public String authenticate(@RequestParam("openid_url") String openIdUrl, HttpServletRequest request, HttpServletResponse response) throws Exception {
    String redirectUrl = openIdAuthentication.beginAuthentication(openIdUrl, request);
    System.out.println("반환URL : " + redirectUrl);
    response.sendRedirect(redirectUrl);
    return null;
  }

  @GetMapping(value = "/openid")
  public String finishAuthentication(HttpServletRequest request, Model model) throws Exception {
    String identifier = openIdAuthentication.finishAuthentication(request);
    System.out.println("신원 : "+ identifier);
    model.addAttribute("identifier", identifier);
    return "home";
  }
}
