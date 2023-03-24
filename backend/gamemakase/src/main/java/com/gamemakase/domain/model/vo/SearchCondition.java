package com.gamemakase.domain.model.vo;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class SearchCondition {
    private String niddle;

    private int price;

    private boolean useIsKorean;
    private boolean isKorean;
    private List<String> genreList;
    private int offset;
    private int limit;
}
