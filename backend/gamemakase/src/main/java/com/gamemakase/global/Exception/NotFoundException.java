package com.gamemakase.global.Exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class NotFoundException extends Exception{
    public NotFoundException(String message) {super(message);}
}
