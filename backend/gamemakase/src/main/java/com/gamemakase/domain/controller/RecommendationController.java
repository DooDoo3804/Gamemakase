package com.gamemakase.domain.controller;

import com.gamemakase.domain.model.dto.GameResponseDto;
import com.gamemakase.domain.model.dto.RecommendationResponseDto;
import com.gamemakase.domain.model.service.RecommendationService;
import com.gamemakase.global.Exception.NotFoundException;
import com.gamemakase.global.Exception.TokenValidFailedException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "추천 결과 관련 api")
@RequiredArgsConstructor
@RestController
@Slf4j
public class RecommendationController {

    private final RecommendationService recommendationService;

    @ApiOperation(value = "개인 맞춤 추천", notes = "페이징해서 보내드립니다.")
    @GetMapping("/auth/recommend/games")
    public ResponseEntity<List<RecommendationResponseDto>> getByUserId(
            @RequestHeader("accessToken") @ApiParam(required = true) String token,
            @RequestParam(name = "page", required = false) Integer pageNo,
            @RequestParam(name = "size", required = false) Integer pageSize
    )
            throws NotFoundException, TokenValidFailedException
    {
        return ResponseEntity.status(HttpStatus.OK).body(recommendationService.getByUserId(pageNo, pageSize, token));
    }

    @ApiOperation(value = "개인 맞춤 추천 (token 적용 전 테스트용)", notes = "토큰 대신 유저아이디를 pathvariable로 직접 보내주세요")
    @GetMapping("/api/recommend/games/{userId}")
    public ResponseEntity<List<RecommendationResponseDto>> getByUserId(
            @RequestParam(name = "page", required = false) Integer pageNo,
            @RequestParam(name = "size", required = false) Integer pageSize,
            @PathVariable Long userId
    )
            throws NotFoundException, TokenValidFailedException
    {
        return ResponseEntity.status(HttpStatus.OK).body(recommendationService.getByUserIdTest(pageNo, pageSize, userId));
    }

    @ApiOperation(value = "인기게임 추천", notes = "상위 100개 중에 12개씩 페이징 처리해서 랜덤으로 보냅니다")
    @GetMapping("/api/recommend/popular")
    public ResponseEntity<List<GameResponseDto>> getPopular(
            @RequestParam(name = "size", required = false) Integer pageSize
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(recommendationService.getTopGamesInRandomOrder(pageSize));
    }

    @ApiOperation(value = "랜덤 게임 제공", notes = "점수 95점 이상이거나 추천이 5만개 이상인 게임 중에 페이징해서 랜덤으로 보냅니다")
    @GetMapping("/api/recommend/random")
    public ResponseEntity<List<GameResponseDto>> getRandom(
            @RequestParam(name = "size", required = false) Integer pageSize
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(recommendationService.getGamesInRandomOrder(pageSize));
    }







}
