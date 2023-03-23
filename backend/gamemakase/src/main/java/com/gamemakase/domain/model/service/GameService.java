package com.gamemakase.domain.model.service;

import java.io.IOException;

import org.json.simple.parser.ParseException;

import com.gamemakase.domain.model.dto.GameDetailResponseDto;
import com.gamemakase.global.Exception.NotFoundException;

public interface GameService {

    GameDetailResponseDto getByGameId(Long gameId, Long userId) throws NotFoundException, IOException, ParseException;
}
