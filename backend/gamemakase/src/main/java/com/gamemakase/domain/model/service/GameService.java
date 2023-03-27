package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.GameHistoryInsertRequestDto;
import com.gamemakase.domain.model.dto.GameHistoryResponseDto;
import com.gamemakase.global.Exception.TokenValidFailedException;
import java.io.IOException;

import java.util.List;
import org.json.simple.parser.ParseException;

import com.gamemakase.domain.model.dto.GameDetailResponseDto;
import com.gamemakase.global.Exception.NotFoundException;

public interface GameService {

    GameDetailResponseDto getByGameId(Long gameId, Long userId) throws NotFoundException, IOException, ParseException;

    void insertGameHistory(int totalPlayGame, int twoWeekPlayGame, long gameId, String token)
        throws TokenValidFailedException, NotFoundException;

    List<GameHistoryResponseDto> getGameHistory(String token) throws NotFoundException;
}
