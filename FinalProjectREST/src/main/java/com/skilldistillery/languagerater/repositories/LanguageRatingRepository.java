package com.skilldistillery.languagerater.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.languagerater.entities.Comment;
import com.skilldistillery.languagerater.entities.LanguageRating;

public interface LanguageRatingRepository extends JpaRepository<LanguageRating, Integer> {
	
	LanguageRating findByUserIdAndLanguageId(@Param("userId") Integer userId, @Param("languageId") Integer languageId); 

	@Query("SELECT lr FROM LanguageRating lr WHERE lr.user.id = :userId AND lr.language.id = :languageId")
	LanguageRating findByUserIdAndLanguageId2(@Param("userId") Integer userId, @Param("languageId") Integer languageId);
}
