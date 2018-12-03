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
	
}
