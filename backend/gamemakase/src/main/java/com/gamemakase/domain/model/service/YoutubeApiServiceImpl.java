package com.gamemakase.domain.model.service;
import java.io.IOException;
import java.util.*;

import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.repository.GameRepository;
import com.gamemakase.global.Exception.NotFoundException;
import com.google.api.services.youtube.model.Thumbnail;
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
import com.google.api.services.youtube.model.ResourceId;
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

            search.setKey("AIzaSyDmMcU2QUUUOT1mox_xI4Geg-yNB_pC6fo");
            search.setQ(queryTerm);
            search.setType(Collections.singletonList("video"));
            search.setFields("items(id/kind,id/videoId,snippet/title,snippet/thumbnails/default/url)");
            search.setMaxResults(NUMBER_OF_VIDEOS_RETURNED);
            SearchListResponse searchResponse = search.execute();
            List<SearchResult> searchResultList = searchResponse.getItems();
            System.out.println(searchResultList);

            if (searchResultList != null) {
                for (SearchResult sl : searchResultList){
                    result.add(sl);
                }
                prettyPrint(searchResultList.iterator(), queryTerm);
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

    private static void prettyPrint(Iterator<SearchResult> iteratorSearchResults, String query) {

        System.out.println("\n=============================================================");
        System.out.println(
                "   First " + NUMBER_OF_VIDEOS_RETURNED + " videos for search on \"" + query + "\".");
        System.out.println("=============================================================\n");

        if (!iteratorSearchResults.hasNext()) {
            System.out.println(" There aren't any results for your query.");
        }

        while (iteratorSearchResults.hasNext()) {

            SearchResult singleVideo = iteratorSearchResults.next();
            ResourceId rId = singleVideo.getId();

            // Double checks the kind is video.
            if (rId.getKind().equals("youtube#video")) {
                Thumbnail thumbnail = (Thumbnail) singleVideo.getSnippet().getThumbnails().get("default");

                System.out.println(" Video Id" + rId.getVideoId());
                System.out.println(" Title: " + singleVideo.getSnippet().getTitle());
                System.out.println(" Thumbnail: " + thumbnail.getUrl());
                System.out.println("\n-------------------------------------------------------------\n");
            }
        }
    }
}