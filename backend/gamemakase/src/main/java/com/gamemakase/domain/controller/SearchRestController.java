package com.gamemakase.domain.controller;

import com.gamemakase.domain.model.dto.SearchResponseDto;
import com.gamemakase.domain.model.service.SearchService;
import com.gamemakase.domain.model.vo.GameInfoVo;
import com.gamemakase.domain.model.vo.SearchCondition;
import com.gamemakase.domain.model.vo.UserInfoVo;
import com.gamemakase.global.Exception.NotFoundException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@Api(value = "검색 관련 컨트롤러")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchRestController {
	
	private final SearchService searchServcie;
	private final Logger logger = LoggerFactory.getLogger(SearchRestController.class);
	
	@ApiOperation(value = "게임, 유저 검색 결과를 반환합니다", notes = "검색 단어에 대한 게임(최대 12), 유저(최대 5)의 결과를 응답합니다.")
	@GetMapping
	public ResponseEntity<SearchResponseDto> getSearchResult(
			@RequestParam(required = false) @ApiParam(required = false) String niddle
			) throws IOException, ParseException, NotFoundException {
		logger.info("getSearchResult : niddle : {}", niddle);
		SearchResponseDto result = searchServcie.getSearchResult(niddle, 0, 0);
		return new ResponseEntity<SearchResponseDto>(result, HttpStatus.OK);
	}

	@ApiOperation(value = "게임 검색 결과를 반환합니다.", notes = "검색 단어에 대한 게임(최대 6)결과를 응답합니다.")
	@GetMapping("/game")
	public ResponseEntity<List<GameInfoVo>> getSearchGameResult(
			@RequestParam(required = false) @ApiParam(required = false) String niddle,
			@RequestParam(required = false) @ApiParam(required = false) int price,
			@RequestParam(required = false) @ApiParam(required = false) boolean isKorean,
			@RequestParam(required = false, value="genreList", defaultValue = "") @ApiParam(required = false) List<String> genreList,
			@RequestParam(required = false) @ApiParam(required = false) int gamePageNo
			) throws IOException, ParseException, NotFoundException {
		logger.info("getSearchGameResult : info : {}", niddle, price, isKorean, genreList, gamePageNo);
		SearchCondition condition = SearchCondition.builder()
				.niddle(niddle)
				.price(price)
				.isKorean(isKorean)
				.genreList(genreList)
				.offset(gamePageNo)
				.limit(12)
				.build();
		List<GameInfoVo> result = searchServcie.getSearchResultByCondition(condition);
		return new ResponseEntity<List<GameInfoVo>>(result, HttpStatus.OK);
	}

	@ApiOperation(value = "게임 검색 결과를 반환합니다.", notes = "검색 단어에 대한 게임(최대 12)결과를 응답합니다.")
	@GetMapping("/user")
	public ResponseEntity<List<UserInfoVo>> getSearchUserResult(
			@RequestParam(required = false) @ApiParam(required = false) String niddle,
			@RequestParam(required = false) @ApiParam(required = false) int userPageNo
			) throws IOException, ParseException, NotFoundException {
		List<UserInfoVo> result = searchServcie.getSearchUserResult(niddle, userPageNo);
		return new ResponseEntity<List<UserInfoVo>>(result, HttpStatus.OK);
	}
}
