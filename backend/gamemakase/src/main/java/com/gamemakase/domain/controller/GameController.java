package com.gamemakase.domain.controller;

import com.gamemakase.domain.model.dto.GameDetailResponseDto;
import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.repository.GameRepository;
import com.gamemakase.domain.model.service.GameService;
import com.gamemakase.domain.model.service.YoutubeApiService;
import com.gamemakase.global.Exception.NotFoundException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.List;

import org.json.simple.parser.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;

@Controller
@Api(value = "게임 정보 관련 컨트롤러")
@RequestMapping
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;
    private final YoutubeApiService youtubeApiService;

    @ApiOperation("게임 상세 정보 페이지")
    @GetMapping("/api/game/{gameId}")
    public ResponseEntity<GameDetailResponseDto> getGameDetail(@RequestHeader("userId") Long userId, @PathVariable Long gameId) throws NotFoundException, IOException, ParseException {
        return ResponseEntity.status(HttpStatus.OK).body(gameService.getByGameId(gameId, userId));
    }
    @GetMapping("/api/game/{gameId}/url")
    public ResponseEntity<List<SearchResult>> getGameYoutubeVideo(@RequestHeader("userId") Long userId, @PathVariable Long gameId) throws NotFoundException, IOException, ParseException {
        return ResponseEntity.status(HttpStatus.OK).body(youtubeApiService.getGameYoutubeVideo(gameId));
    }

}
