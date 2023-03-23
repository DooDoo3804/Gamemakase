package com.gamemakase.domain.model.vo;

import java.util.List;
import java.util.stream.Collectors;

import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.entity.Genre;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class GameInfoVo {
	private long gameId;
	private String gameName;
	private String imagePath;
	private boolean window;
	private boolean apple;
	private boolean linux;
	private int price;
	private boolean isKorean;
	private boolean isLiked;
	private List<String> GenreList;
	
	public static GameInfoVo of(Game game, String imagePath) {
		return GameInfoVo.builder()
				.gameId(game.getGameId())
				.gameName(game.getGameName())
				.imagePath(imagePath)
				.window(game.isWindows())
				.apple(game.isMac())
				.linux(game.isLinux())
				.price(game.getGamePrice())
				.isKorean(game.isKorean())
				.build();
	}
	
	public static GameInfoVo of(Game game, String imagePath, List<Genre> genreList) {
		return GameInfoVo.builder()
				.gameId(game.getGameId())
				.gameName(game.getGameName())
				.imagePath(imagePath)
				.window(game.isWindows())
				.apple(game.isMac())
				.linux(game.isLinux())
				.price(game.getGamePrice())
				.isKorean(game.isKorean())
				.GenreList(genreList.stream().map(g -> "s").collect(Collectors.toList()))
				.build();
	}
	
	public static GameInfoVo of(Game game, String imagePath, boolean isLiked) {
		return GameInfoVo.builder()
				.gameId(game.getGameId())
				.gameName(game.getGameName())
				.imagePath(imagePath)
				.window(game.isWindows())
				.apple(game.isMac())
				.linux(game.isLinux())
				.price(game.getGamePrice())
				.isKorean(game.isKorean())
				.isLiked(isLiked)
				.build();
	}
}
