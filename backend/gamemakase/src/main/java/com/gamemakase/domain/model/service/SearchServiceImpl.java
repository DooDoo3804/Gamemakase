package com.gamemakase.domain.model.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.json.simple.parser.ParseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gamemakase.domain.model.dto.SearchResponseDto;
import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.entity.User;
import com.gamemakase.domain.model.repository.GameRepository;
import com.gamemakase.domain.model.repository.GenreRepository;
import com.gamemakase.domain.model.repository.ImageRepository;
import com.gamemakase.domain.model.repository.UserRepository;
import com.gamemakase.domain.model.vo.GameInfoVo;
import com.gamemakase.domain.model.vo.UserInfoVo;
import com.gamemakase.global.Exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

	private final GameRepository gameRepository;
	private final UserRepository UserRepository;
	private final ImageRepository imageRepository;
	private final GenreRepository genreRepository;
	private final RealTimeUserInfoService realTimeUserInfoService;

	@Override
	public SearchResponseDto getSearchResult(String niddle, int gamePageNo, int userPageNo) throws IOException, ParseException, NotFoundException {
		Pageable GamePageable = PageRequest.of(gamePageNo, 12);
		Page<Game> gameList = gameRepository.findAllByGameNameLikeOrderByGameName("%" + niddle + "%", GamePageable);
		List<GameInfoVo> gameResults = gameList.stream()
				.map(g -> GameInfoVo.of(
						g,
						imageRepository.findByTypeAndTypeId("GAME_HEADER", g.getGameId()).orElse(null).getImagePath(),
						genreRepository.findAllByGame(g)
										)
					)
				.collect(Collectors.toList());

		Pageable UserPageable = PageRequest.of(userPageNo, 5);
		Page<User> userPagedList = UserRepository.findAllByUserNameLikeOrderByUserName("%" + niddle + "%", UserPageable);
		List<User> userList = userPagedList.stream()
				.map(u -> u).collect(Collectors.toList());
		List<UserInfoVo> userResults = realTimeUserInfoService.getUserInfoResponseVo(userList);
		
		return SearchResponseDto.builder()
				.games(gameResults)
				.users(userResults)
				.build();
	}

	@Override
	public List<GameInfoVo> getSearchGameResult(String niddle, int gamePageNo)
			throws IOException, ParseException, NotFoundException {
		Pageable GamePageable = PageRequest.of(gamePageNo, 12);
		Page<Game> gameList = gameRepository.findAllByGameNameLikeOrderByGameName("%" + niddle + "%", GamePageable);
		return gameList.stream()
				.map(g -> GameInfoVo.of(g, imageRepository.findByTypeAndTypeId("GAME_HEADER", g.getGameId()).orElse(null).getImagePath()))
				.collect(Collectors.toList());
	}

	@Override
	public List<UserInfoVo> getSearchUserResult(String niddle, int userPageNo)
			throws IOException, ParseException, NotFoundException {
		Pageable UserPageable = PageRequest.of(userPageNo, 5);
		Page<User> userPagedList = UserRepository.findAllByUserNameLikeOrderByUserName("%" + niddle + "%", UserPageable);
		List<User> userList = userPagedList.stream()
				.map(u -> u).collect(Collectors.toList());
		return realTimeUserInfoService.getUserInfoResponseVo(userList);
	}
	
	

}
