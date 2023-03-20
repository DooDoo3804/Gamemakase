package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.dto.GameDetailResponseDto;
import com.gamemakase.domain.model.repository.*;
import com.gamemakase.global.Exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService{
    private GameRepository gameRepository;
    private ImageRepository imageRepository;
    private GenreRepository genreRepository;
    private ReviewRepository reviewRepository;
    private UserRepository userRepository;

    @Override
    public GameDetailResponseDto getByGameId(Long gameId) throws NotFoundException {
        return null;
    }
}
