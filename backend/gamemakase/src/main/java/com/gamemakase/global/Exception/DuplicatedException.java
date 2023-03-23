package com.gamemakase.global.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class DuplicatedException extends RuntimeException {
    public DuplicatedException() {
        super();
    }
    public DuplicatedException(String message, Throwable cause) {
        super(message, cause);
    }
    public DuplicatedException(String message) {
        super(message);
    }
    public DuplicatedException(Throwable cause) {
        super(cause);
    }
}
