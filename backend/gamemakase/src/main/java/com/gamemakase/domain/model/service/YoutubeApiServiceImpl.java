package com.gamemakase.domain.model.service;
import java.io.IOException;
import java.util.*;

import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.repository.GameRepository;
import com.gamemakase.global.Exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;

@Service
@RequiredArgsConstructor

public class YoutubeApiServiceImpl implements YoutubeApiService{
    /** Global instance of the HTTP transport. */
    private static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
    /** Global instance of the JSON factory. */
    private static final JsonFactory JSON_FACTORY = new JacksonFactory();
    /** 50 max videos per page */
    private static final long NUMBER_OF_VIDEOS_RETURNED = 2;
    /** Global instance of Youtube object to make all API requests. */
    private static YouTube youtube;

    final GameRepository gameRepository;

    /** youtube url 가져오기 */
    @Override
    public List<SearchResult> getGameYoutubeVideo(long gameId){
        System.out.println(gameId);
        ArrayList<SearchResult> result = new ArrayList<>();
        try {
            youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, new HttpRequestInitializer() {
                public void initialize(HttpRequest request)
                        throws IOException {
                }})
                    .setApplicationName("youtube-cmdline-search-sample")
                    .build();

            Game game = gameRepository.findByGameId(gameId)
                    .orElseThrow(() -> new NotFoundException("wrong game id"));
            String gameName = game.getGameName();

            System.out.println(gameName);
            String queryTerm = gameName + " walkthrough";
            System.out.println(queryTerm);

            YouTube.Search.List search = youtube.search().list(Collections.singletonList("id,snippet"));

            // api key 추가
            ArrayList<String> apiKeysList = new ArrayList<>(Arrays.asList(
                    "AIzaSyDOJt4eQqom3a7cBYXSupYPpPEkExP1mBc",
                    "AIzaSyD8H8D6hUcFYg8lEvddo3pKF-qEwIwpOiM",
                    "AIzaSyC2g6Xk4Nc0g-GOdeUzpSu7PJeGPjigngg",
                    "AIzaSyD8H8D6hUcFYg8lEvddo3pKF-qEwIwpOiM",
                    "AIzaSyBrBjvk68qe3bKQEl8T7nyX7cBTvz7Ff3o"
            ));

            for (String api : apiKeysList) {
                try {
                    search.setKey(api);
                    search.setQ(queryTerm);
                    search.setType(Collections.singletonList("video"));
                    search.setFields("items(id/kind,id/videoId,snippet/title,snippet/thumbnails/default/url)");
                    search.setMaxResults(NUMBER_OF_VIDEOS_RETURNED);
                    SearchListResponse searchResponse = search.execute();
                    List<SearchResult> searchResultList = searchResponse.getItems();
                    System.out.println(searchResultList);

                    if (searchResultList != null) {
                        for (SearchResult sl : searchResultList) {
                            result.add(sl);
                        }
                        break;
                    }
                }
                catch (Exception e) {
                    System.err.println(e);
                }
            }

        } catch (GoogleJsonResponseException e) {
            System.err.println("There was a service error: " + e.getDetails().getCode() + " : "
                    + e.getDetails().getMessage());
        } catch (IOException e) {
            System.err.println("There was an IO error: " + e.getCause() + " : " + e.getMessage());
        } catch (Throwable t) {
            t.printStackTrace();
        }
        return result;
    }

}