package com.skilldistillery.languagerater.services;

import java.util.List;

import com.skilldistillery.languagerater.entities.Language;

public interface LanguageService {

	List<Language> index();
	List<Language> indexByKeywords(String keywords);
	List<Language> indexByRatings(double minRating, double minCat1, double minCat2, double minCat3);

	boolean destroy(int id);

	Language update(Language lang, int id);

	Language create(Language language);

	Language show(int id);

}
