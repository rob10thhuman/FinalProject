package com.skilldistillery.languagerater.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.languagerater.entities.Language;

public interface LanguageRepository extends JpaRepository<Language, Integer> {

}
