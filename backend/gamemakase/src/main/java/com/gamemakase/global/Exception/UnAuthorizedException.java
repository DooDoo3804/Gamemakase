package com.gamemakase.global.Exception;


public class UnAuthorizedException extends RuntimeException {
	private static final long serialVersionUID = 2238030302650813813L;

	public UnAuthorizedException(String msg) {
		super(msg);
		
	}
}
