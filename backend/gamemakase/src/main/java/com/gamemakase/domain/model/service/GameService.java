package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.GameDetailResponseDto;
import com.gamemakase.global.Exception.NotFoundException;

public interface GameService {

    GameDetailResponseDto getByGameId(Long gameId, Long userId) throws NotFoundException;
}
