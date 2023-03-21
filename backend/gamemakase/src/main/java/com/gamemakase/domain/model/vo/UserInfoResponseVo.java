package com.gamemakase.domain.model.vo;

import com.gamemakase.domain.model.entity.User;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserInfoResponseVo {
	private String userImagePath;
	private String userName;
	private long userId;
	
	public static UserInfoResponseVo of(User user, String userImgPath) {
		return UserInfoResponseVo.builder()
				.userImagePath(userImgPath)
				.userName(user.getUserName())
				.userId(user.getUserId())
				.build();
	}
}
