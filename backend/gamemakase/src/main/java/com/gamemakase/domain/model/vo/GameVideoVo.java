package com.gamemakase.domain.model.vo;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class GameVideoVo {

    private String youtubeId;
    private String youtubeName;
}
