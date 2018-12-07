package com.skilldistillery.languagerater.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.languagerater.entities.Language;

public interface LanguageRepository extends JpaRepository<Language, Integer> {
	@Query("SELECT l FROM Language l where l.name LIKE :word "
			+ "OR l.creator LIKE :word "
			+ "OR l.yearCreated LIKE :word "
			+ "OR l.info LIKE :word")
	List<Language> findByKeyword(@Param("word") String word);
	
	@Query("SELECT l FROM Language l" + 
			"WHERE l.rating >= :minRating " +
			"AND l.cat1 > minCat1 " +
			"AND l.cat1 > minCat2 " +
			"AND l.cat1 > minCat3")
	List<Language> findByRatings(@Param("minRating") double minRating,
								 @Param("minCat1") double minCat1,
								 @Param("minCat2") double minCat2,
								 @Param("minCat3") double minCat3);
	
//	@Query("SELECT l from Language l where l.id = :id")
//	Language findByLanguageId(@Param("id") int id); 
//	
}
