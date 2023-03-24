package com.gamemakase.domain.model.service;

import java.io.IOException;
import java.util.List;

import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.vo.SearchCondition;
import org.json.simple.parser.ParseException;

import com.gamemakase.domain.model.dto.SearchResponseDto;
import com.gamemakase.domain.model.vo.GameInfoVo;
import com.gamemakase.domain.model.vo.UserInfoVo;
import com.gamemakase.global.Exception.NotFoundException;

public interface SearchService {
	SearchResponseDto getSearchResult(String niddle, int gamePageNo, int userPageNo) throws IOException, ParseException, NotFoundException;
	List<GameInfoVo> getSearchGameResult(String niddle, int gamePageNo) throws IOException, ParseException, NotFoundException;
	List<UserInfoVo> getSearchUserResult(String niddle, int userPageNo) throws IOException, ParseException, NotFoundException;
	List<GameInfoVo> getSearchResultByCondition(SearchCondition condition);
	List<Game> searchGameByCondition(SearchCondition condition);
}
