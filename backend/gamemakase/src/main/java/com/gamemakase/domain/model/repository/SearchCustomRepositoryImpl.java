package com.gamemakase.domain.model.repository;

import com.gamemakase.domain.model.entity.Game;
import com.gamemakase.domain.model.vo.SearchCondition;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static com.gamemakase.domain.model.entity.QGame.game;
import static org.springframework.util.StringUtils.hasText;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchCustomRepositoryImpl implements SearchCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Game> searchByFilter(SearchCondition condition) {
        if(condition.isUseIsKorean()) {
            // q class in 절
            JPAQuery query = jpaQueryFactory.select(game)
                    .from(game)
                    .where(gameNameContains(condition.getNiddle())
                            .and(gamePriceLessThan(condition.getPrice()))
                            .and(gameIsKoreanEq(condition.isKorean()))
                    );
//            for (String genreStr : condition.getGenreList()) {
//
//            }
        } else {
            jpaQueryFactory.select(game)
                    .from(game)
                    .where(gameNameContains(condition.getNiddle())
                            .and(gamePriceLessThan(condition.getPrice()))
                    )
                    .orderBy(game.gameName.asc());
        }
        return null;
    }
    private BooleanExpression gameNameContains(String keyword) {
        return hasText(keyword) ? game.gameName.toUpperCase().contains(keyword.toUpperCase()) : null;
    }

    private BooleanExpression gamePriceLessThan(int price) {
        return game.gamePrice.lt(price).or(game.gamePrice.eq(price));
    }

    private BooleanExpression gameIsKoreanEq(boolean flag) {
        return game.isKorean.eq(flag);
    }
}
