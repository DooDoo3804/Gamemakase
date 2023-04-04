package com.gamemakase;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

@SpringBootApplication
@EnableReactiveMongoRepositories(basePackages = {
        "com.gamemakase.domain.model.reactiveMongoRepository",
})
@EnableMongoRepositories(basePackages = {
        "com.gamemakase.domain.model.mongoRepository",
})
@EnableJpaRepositories(basePackages = {
        "com.gamemakase.domain.model.repository",
})
public class GamemakaseApplication {
    public static void main(String[] args) {
        SpringApplication.run(GamemakaseApplication.class, args);
    }

}
