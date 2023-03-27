package com.gamemakase.domain.model.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash // JPA에서의 @Entity역할
@Builder
@Getter
public class SearchHistory {
    @Id
    private String idx;
    private String userId;
    private String content;
}
