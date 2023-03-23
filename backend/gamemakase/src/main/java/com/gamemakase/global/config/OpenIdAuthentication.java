package com.gamemakase.global.config;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.openid4java.consumer.ConsumerManager;
import org.openid4java.consumer.VerificationResult;
import org.openid4java.discovery.DiscoveryInformation;
import org.openid4java.message.AuthRequest;
import org.openid4java.message.ParameterList;
import org.springframework.stereotype.Service;

@Service
public class OpenIdAuthentication {
  private final ConsumerManager consumerManager;

  public OpenIdAuthentication(){
    consumerManager = new ConsumerManager();
  }

  public String beginAuthentication(String openIdUrl, HttpServletRequest request) throws Exception {
    String returnToUrl = request.getRequestURL().toString().replace(request.getServletPath(), "") + "/openid";
    List dicoveries = consumerManager.discover(openIdUrl);
    AuthRequest authRequest = consumerManager.authenticate(dicoveries, returnToUrl);
    String redirectUrl = authRequest.getDestinationUrl(true);
    return redirectUrl;
  }

  public String finishAuthentication(HttpServletRequest request) throws Exception {
    ParameterList response = new ParameterList(request.getParameterMap());
    DiscoveryInformation discovered = (DiscoveryInformation) request.getSession().getAttribute("openid-disc");
    VerificationResult verification = consumerManager.verify(request.getParameter("openid.mode"), response, discovered);
    if (verification.getVerifiedId() != null) {
      return verification.getVerifiedId().getIdentifier();
    } else {
      throw new Exception("OpenID authentication failed");
    }
  }

}
