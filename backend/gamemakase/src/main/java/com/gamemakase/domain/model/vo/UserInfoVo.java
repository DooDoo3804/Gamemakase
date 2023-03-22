package com.gamemakase.domain.model.vo;

import com.gamemakase.domain.model.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
public class UserInfoVo {
	private long userId;
	private boolean state;
	private String userImagePath;
	private String userName;
	
	public static UserInfoVo of(User user, String userImgPath) {
		return UserInfoVo.builder()
				.userImagePath(userImgPath)
				.userName(user.getUserName())
				.userId(user.getUserId())
				.build();
	}
}
