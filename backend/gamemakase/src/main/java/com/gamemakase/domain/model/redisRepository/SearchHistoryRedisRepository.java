package com.gamemakase.domain.model.redisRepository;

import com.gamemakase.domain.model.entity.SearchHistory;
import org.springframework.data.repository.CrudRepository;

public interface SearchHistoryRedisRepository extends CrudRepository<SearchHistory, String> {
}
