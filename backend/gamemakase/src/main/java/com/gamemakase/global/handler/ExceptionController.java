package com.gamemakase.global.handler;

import com.gamemakase.global.Exception.DuplicatedException;
import com.gamemakase.global.Exception.NotFoundException;
import com.gamemakase.global.Exception.TokenValidFailedException;
import com.gamemakase.global.Exception.UnAuthorizedException;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class ExceptionController {

//  404 Notfound
    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<?> handleNotFoundException(final NotFoundException ex) {
        log.info(ex.getClass().getName());
        log.error("error", ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
    
    @ExceptionHandler({TokenValidFailedException.class})
    public ResponseEntity<?> handleTokenValidFailedException(final TokenValidFailedException ex) {
        log.info(ex.getClass().getName());
        log.error("TokenValidFailedException", ex);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }
    
    @ExceptionHandler({UnAuthorizedException.class})
    public ResponseEntity<?> handleUnAuthorizedException(final UnAuthorizedException ex) {
        log.info(ex.getClass().getName());
        log.error("UnAuthorizedException", ex);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler({DuplicatedException.class})
    public ResponseEntity<?> handleUnAuthorizedException(final DuplicatedException ex) {
        log.info(ex.getClass().getName());
        log.error("DuplicatedException", ex);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
    }
}
