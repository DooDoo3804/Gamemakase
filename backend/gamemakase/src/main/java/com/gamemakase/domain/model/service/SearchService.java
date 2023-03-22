package com.gamemakase.domain.model.service;

import java.io.IOException;

import org.json.simple.parser.ParseException;

import com.gamemakase.domain.model.dto.SearchResponseDto;
import com.gamemakase.global.Exception.NotFoundException;

public interface SearchService {
	SearchResponseDto getSearchResult(String niddle, int gamePageNo, int userPageNo) throws IOException, ParseException, NotFoundException;
}
