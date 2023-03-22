package com.gamemakase.domain.controller;

import java.io.IOException;

import org.json.simple.parser.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gamemakase.domain.model.dto.SearchResponseDto;
import com.gamemakase.domain.model.service.SearchService;
import com.gamemakase.global.Exception.NotFoundException;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(value = "검색 관련 컨트롤러")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchRestController {
	
	private final SearchService searchServcie;
	
	@GetMapping
	public ResponseEntity<SearchResponseDto> getSearchResult(
			@RequestParam(required = false) @ApiParam(required = false) String niddle,
			@RequestParam(required = false) @ApiParam(required = false) int gamePageNo,
			@RequestParam(required = false) @ApiParam(required = false) int userPageNo
			) throws IOException, ParseException, NotFoundException {
		SearchResponseDto result = searchServcie.getSearchResult(niddle, gamePageNo, userPageNo);
		return new ResponseEntity<SearchResponseDto>(result, HttpStatus.OK);
	}
}
