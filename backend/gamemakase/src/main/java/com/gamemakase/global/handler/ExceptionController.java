package com.gamemakase.global.handler;

import com.gamemakase.global.Exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class ExceptionController {

//    404 Notfound
    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<?> handleNotFoundException(final NotFoundException ex) {
        log.info(ex.getClass().getName());
        log.error("error", ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
