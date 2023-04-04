package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.vo.GameVideoVo;

import java.util.List;

public interface GameVideoService {
    List<GameVideoVo> getOrUpdateVideoPathByGameId(Long gameId);
}
