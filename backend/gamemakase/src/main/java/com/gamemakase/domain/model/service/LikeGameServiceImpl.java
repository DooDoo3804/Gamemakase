package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.entity.LikeGame;
import com.gamemakase.domain.model.entity.User;
import com.gamemakase.domain.model.repository.GameRepository;
import com.gamemakase.domain.model.repository.LikeGameRepository;
import com.gamemakase.domain.model.repository.UserRepository;
import com.gamemakase.global.Exception.NotFoundException;
import com.gamemakase.global.Exception.TokenValidFailedException;
import com.gamemakase.global.Exception.UnAuthorizedException;
import com.gamemakase.global.config.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class LikeGameServiceImpl implements LikeGameService {

    private final Logger logger = LoggerFactory.getLogger(GameServiceImpl.class);
    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final LikeGameRepository likeGameRepository;
    private final JwtTokenProvider jwtTokenProvider;


    @Override
    public Long insertLikeGame(Long gameId, String token) throws NotFoundException, TokenValidFailedException {
        Game game = gameRepository.findByGameId(gameId)
                .orElseThrow(() -> new NotFoundException("wrong game id"));

        //        유저 파싱 및 예외처리
        String userIdStr = jwtTokenProvider.getUserId(token);
        Long userId = Long.parseLong(userIdStr);
        User user;

        try {
            user = userRepository.findById(userId)
                    .orElseThrow(() -> new NotFoundException("wrong userId"));
        } catch (NumberFormatException e) {
            logger.error(e.getMessage());
            throw new TokenValidFailedException("유효하지 않은 토큰값입니다.");
        }

        return likeGameRepository.save(LikeGame.builder()
                .game(game)
                .user(user)
                .type("game")
                .build()).getLikeId();
    }

    @Override
    public Long deleteLikeGame(Long likeId, String token) throws NotFoundException, TokenValidFailedException {

        LikeGame like = likeGameRepository.findById(likeId)
                .orElseThrow(() -> new NotFoundException("wrong like id"));

//                유저 파싱 및 예외처리
        String userIdStr = jwtTokenProvider.getUserId(token);
        Long userId = Long.parseLong(userIdStr);
        User user;

        try {
            user = userRepository.findById(userId)
                    .orElseThrow(() -> new NotFoundException("wrong userId"));
        } catch (NumberFormatException e) {
            logger.error(e.getMessage());
            throw new TokenValidFailedException("유효하지 않은 토큰값입니다.");
        }

//        요청한 유저의 스크랩일 경우에만 삭제 처리
        if (like.getUser().equals(user)) {
            likeGameRepository.delete(like);
            return likeId;
        } else {
            throw new UnAuthorizedException("different user's like");
        }

    }
}
