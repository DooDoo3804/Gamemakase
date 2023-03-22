package com.gamemakase.domain.model.vo;

import com.gamemakase.domain.model.entity.Game;

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
	private boolean isLiked;
	private int price;
	
	public static GameInfoVo of(Game game, String imagePath) {
		return GameInfoVo.builder()
				.gameId(game.getGameId())
				.gameName(game.getGameName())
				.imagePath(imagePath)
				.window(game.isWindows())
				.apple(game.isMac())
				.linux(game.isLinux())
				.price(game.getGamePrice())
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
				.isLiked(isLiked)
				.build();
	}
}
