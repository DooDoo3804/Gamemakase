package com.gamemakase.domain.model.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;

@RedisHash // JPA에서의 @Entity역할
@Builder
@Getter
public class SearchHistory {
    @Id
    private String idx;
    private Map<String, LocalDateTime> content;
}
