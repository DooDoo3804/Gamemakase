package com.gamemakase;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
@EnableJpaRepositories(basePackages = {
        "com.gamemakase.domain.model.repository",
})
public class GamemakaseApplication {

    public static void main(String[] args) {
        SpringApplication.run(GamemakaseApplication.class, args);
    }

}
