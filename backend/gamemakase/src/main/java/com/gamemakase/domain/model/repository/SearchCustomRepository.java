package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.vo.SearchCondition;

import java.util.List;

public interface SearchCustomRepository {

    List<Game> searchByFilter(SearchCondition condition);
}
