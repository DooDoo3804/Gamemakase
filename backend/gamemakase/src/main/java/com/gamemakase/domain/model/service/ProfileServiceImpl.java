package com.gamemakase.domain.model.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gamemakase.domain.model.dto.ProfileInfoResponseDto;
import com.gamemakase.domain.model.dto.ProfileReviewsResponseDto;
import com.gamemakase.domain.model.entity.GameHistory;
import com.gamemakase.domain.model.entity.Genre;
import com.gamemakase.domain.model.entity.Image;
import com.gamemakase.domain.model.entity.LikeGame;
import com.gamemakase.domain.model.entity.Review;
import com.gamemakase.domain.model.entity.User;
import com.gamemakase.domain.model.repository.GameHistoryRepository;
import com.gamemakase.domain.model.repository.GenreRepository;
import com.gamemakase.domain.model.repository.ImageRepository;
import com.gamemakase.domain.model.repository.LikeGameRepository;
import com.gamemakase.domain.model.repository.ReviewRepository;
import com.gamemakase.domain.model.repository.UserRepository;
import com.gamemakase.domain.model.vo.GenreScoreVo;
import com.gamemakase.domain.model.vo.PaginationVo;
import com.gamemakase.domain.model.vo.ReviewInfoVo;
import com.gamemakase.domain.model.vo.ScrapInfoVo;
import com.gamemakase.domain.model.vo.UserInfoResponseVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

	private final LikeGameRepository likeGameRepository;
	private final UserRepository userRepository;
	private final ImageRepository imageRepository;
	private final GenreRepository genreRepository;
	private final GameHistoryRepository gamehistoryRepository;
	private final ReviewRepository reviewRepository;

	private static Map<String, Integer> genreScoreResult;

	/***
	 * todo : orElseThrow() 비어있는 부분 Exception 처리 추후 해주어햐 합니다.
	 */

	@Override
	public ProfileInfoResponseDto getProfile(long userId) {
		genreScoreResult = new HashMap<String, Integer>();

		User user = userRepository.findById(userId).orElseThrow(/* here! */);

		// userId 기반 play기록, play기록 기반 장르를 추적하여 각 장르 name을 key값으로 삼아 play time을 value로
		// 축적합니다.
		List<GameHistory> gameHistoryList = gamehistoryRepository.findAllByUser(user);
		for (GameHistory gameHistory : gameHistoryList) {
			List<Genre> genreList = genreRepository.findAllByGame(gameHistory.getGame());
			for (Genre genre : genreList) {
				String genreName = genre.getGenreName();
				if (genreScoreResult.containsKey(genreName)) {
					genreScoreResult.put(genreName, genreScoreResult.get(genreName) + gameHistory.getTotalPlayGame());
				} else {
					genreScoreResult.put(genreName, gameHistory.getTotalPlayGame());
				}
			}
		}

		// value기준 내림차순으로 정렬 후, 상위 5개까지만 return 객체에 담습니다.
		List<Map.Entry<String, Integer>> entryList = new LinkedList<>(genreScoreResult.entrySet());
		entryList.sort(new Comparator<Map.Entry<String, Integer>>() {
			@Override
			public int compare(Entry<String, Integer> o1, Entry<String, Integer> o2) {
				return o2.getValue() - o1.getValue();
			}
		});
		List<GenreScoreVo> scoreList = new ArrayList<GenreScoreVo>();
		for (int i = 0; i < 5 && i < scoreList.size(); i++) {
			scoreList.add(
					GenreScoreVo.builder().genre(entryList.get(i).getKey()).value(entryList.get(i).getValue()).build());
		}

		// userId기반 스크랩한 게임을 조회하여 반환합니다.
		List<LikeGame> likeList = likeGameRepository.findAllByUser(user);
		List<ScrapInfoVo> scrapList = likeList.stream()
				.map(l -> ScrapInfoVo.of(l.getGame(),
						imageRepository.findByTypeAndTypeId("GAME_HEADER", l.getGame().getGameId()).orElseThrow(/* here! */).getImagePath()))
				.collect(Collectors.toList());
		Optional<Image> image = imageRepository.findByTypeAndTypeId("USER_PROFILE", user.getUserId());
		UserInfoResponseVo userInfo = null;
		if(!image.isPresent()) {
			userInfo = UserInfoResponseVo.of(user, "");
		} else {
			userInfo = UserInfoResponseVo.of(user, image.get().getImagePath());
		}
		return ProfileInfoResponseDto.builder()
				.user(userInfo)
				.statistics(scoreList)
				.scrap(scrapList)
				.build();
	}

	@Override
	public ProfileReviewsResponseDto getReviews(long userId, int pageNo) {
		User user = userRepository.findById(userId).orElseThrow(/*here!*/);
		Long totalReviewSize = reviewRepository.countByUser(user);
		Pageable pageable = PageRequest.of(pageNo, 8);
		Page<Review> reviews = reviewRepository.findAllByUser(user, pageable);
		List<ReviewInfoVo> reviewsInfoList = reviews.stream()
				.map(r -> ReviewInfoVo.of(r,
						imageRepository.findByTypeAndTypeId("GAME_HEADER", r.getGame().getGameId()).orElseThrow(/*here!*/).getImagePath()))
				.collect(Collectors.toList());
		
		return ProfileReviewsResponseDto.builder()
				.reviews(reviewsInfoList)
				.page(PaginationVo.builder().pageNum(pageNo).size(totalReviewSize).count(reviewsInfoList.size()).build())
				.build();
	}

}
