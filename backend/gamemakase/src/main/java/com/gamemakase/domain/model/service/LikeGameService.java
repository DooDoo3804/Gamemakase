package com.gamemakase.domain.model.service;

import com.gamemakase.global.Exception.NotFoundException;
import com.gamemakase.global.Exception.TokenValidFailedException;

public interface LikeGameService {
    Long insertLikeGame(Long gameId, String token) throws NotFoundException, TokenValidFailedException;

    Long deleteLikeGame(Long likeId, String token) throws NotFoundException, TokenValidFailedException;
}
