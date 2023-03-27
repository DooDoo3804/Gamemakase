package com.gamemakase.domain.model.service;

import com.gamemakase.domain.model.entity.Game;
import com.google.api.services.youtube.model.SearchResult;

import java.util.List;

public interface YoutubeApiService{
    List<SearchResult> getGameYoutubeVideo(long gameId);

}
