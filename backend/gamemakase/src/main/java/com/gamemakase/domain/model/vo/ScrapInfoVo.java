package com.gamemakase.domain.model.vo;

import com.gamemakase.domain.model.entity.Game;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ScrapInfoVo {
	private long gameId;
	private String gameName;
	private String imagePath;
	private boolean window;
	private boolean apple;
	private boolean linux;
	private int price;
	
	public static ScrapInfoVo of(Game game, String imagePath) {
		return ScrapInfoVo.builder()
				.gameId(game.getGameId())
				.gameName(game.getGameName())
				.imagePath(imagePath)
				.window(game.isWindows())
				.apple(game.isMac())
				.linux(game.isLinux())
				.price(game.getGamePrice())
				.build();
	}
}
